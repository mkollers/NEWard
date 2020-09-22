import * as functions from 'firebase-functions';
import { connect } from 'node-mailjet';
import * as admin from 'firebase-admin';

import { environment } from '../config/environment';

export const Contact = functions
    .region('europe-west3')
    .https
    .onRequest(async (req, res) => {
        res.set('Access-Control-Allow-Origin', '*');

        switch (req.method) {
            case 'OPTIONS':
                // Send response to OPTIONS requests
                res.set('Access-Control-Allow-Methods', 'GET');
                res.set('Access-Control-Allow-Headers', '*');
                res.set('Access-Control-Max-Age', '3600');
                res.status(204).send();
                break;
            case 'POST':
                try {
                    const message = req.body.message;
                    const email = req.body.email;
                    const givenName = req.body.givenName;
                    const familyName = req.body.familyName;
                    let name = '';
                    if (req.body.productId) {
                        const product = await getProduct(req.body.productId);
                        name = product?.name;
                    } else if (req.body.companyId){
                        const company = await getCompany(req.body.companyId);
                        name = company?.legalName;
                    }

                    await sendMail(message, email, name, givenName, familyName);
                    res.status(204).send();
                } catch (err) {
                    console.error(err);
                    res.status(500).send();
                }
                break;
            default:
                res.status(405).send();
        }
    });

async function getCompany(id: string) {
    const db = admin.firestore();

    const snapshot = await db.doc(`companies/${id}`).get();
    if (snapshot.exists) {
        return snapshot.data();
    }
    return null;
}


async function getProduct(id: string) {
    const db = admin.firestore();

    const snapshot = await db.doc(`products/${id}`).get();
    if (snapshot.exists) {
        return snapshot.data();
    }
    return null;
}

async function sendMail(message: string, email: string, name: string, givenName?: string, familyName?: string) {
    const client = connect(environment.mailjet.apiKey, environment.mailjet.apiSecret)
    await client
        .post('send', { 'version': 'v3.1' })
        .request({
            'Messages': [
                {
                    'From': {
                        'Email': environment.mailjet.from.email,
                        'Name': environment.mailjet.from.name
                    },
                    'To': [
                        {
                            'Email': environment.contact.recipient,
                            'Name': environment.contact.recipient
                        }
                    ],
                    'Subject': `${`${givenName} ${familyName}` || email} möchte gerne weitere Informationen zu ${name} erhalten`,
                    'TemplateID': +environment.mailjet.templates.contact,
                    'TemplateLanguage': true,
                    'Variables': {
                        message,
                        email,
                        name,
                        givenName,
                        familyName
                    }
                }
            ]
        });
    console.log(`Mail successfully sent to ${email}`);
}