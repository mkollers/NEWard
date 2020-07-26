import * as functions from 'firebase-functions';
import * as _ from 'lodash';
import { connect } from 'node-mailjet';

import { environment } from '../config/environment';
import { Token } from '../models/token';

export const OnAccessTokenWrite = functions
    .region('europe-west3')
    .firestore
    .document('access_tokens/{token}')
    .onWrite(async (event: functions.Change<any>, context) => {
        try {
            const token: string = context.params.token;
            const before: Token = event.before.data();
            const after: Token = event.after.data();
            if (!after) {
                console.warn(`Empty data for ${token}. Skipping function execution`);
                return;
            }

            const votesBefore = []; [..._.toArray(before?.company_votes), ..._.toArray(before?.product_votes)];
            const votesAfter = [..._.toArray(after.company_votes), ..._.toArray(after.product_votes)];

            if (votesBefore.length === 0 && votesAfter.length === 1) {
                await sendMail(before.email)
            } else {
                console.log(`Skip execution because it is not the first vote. Before: ${votesBefore.length} - After: ${votesAfter.length}`);
            }
        } catch (err) {
            console.error(err)
        }
    });

async function sendMail(email: string) {
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
                            'Email': email,
                            'Name': email
                        }
                    ],
                    'TemplateID': +environment.mailjet.templates.thanks,
                    'TemplateLanguage': true,
                    'Variables': {
                    }
                }
            ]
        });
    console.log(`Mail successfully sent to ${email}`);
}