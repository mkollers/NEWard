import * as admin from 'firebase-admin';
import * as _ from 'lodash';

import { Company } from '../frontend/src/app/shared/data-access/models/company';
import { Product } from '../frontend/src/app/shared/data-access/models/product';
import { initialize } from './initialize';
import { Vote } from './models/vote';

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'Einzelabstimmungen.csv',
    header: [
        { id: 'created', title: 'Zeitpunkt' },
        { id: 'email', title: 'Teilnehmer' },
        { id: 'vote', title: 'Aufsteiger/Produktneuheit' },
        { id: 'points', title: 'Punkte' },
        { id: 'participate', title: 'Teilnahme ' }
    ],
    fieldDelimiter: ';'
});

initialize();
main();

async function main() {
    const votings = await getVotings();
    const companies = await getCompanies();
    const products = await getProducts();

    const data = [];

    for (let token of votings) {
        for (let companyId in token.company_votes) {
            const company = _.find(companies, c => c.id === companyId);
            if (!company) {
                console.warn(`Company with id ${companyId} for ${token.email} not found!`);
                continue;
            }
            data.push({
                created: token.created,
                email: token.email,
                vote: company.legalName,
                points: token.company_votes[companyId],
                participate: token.participate ? 'Ja' : 'Nein'
            });
        }
        for (let productId in token.product_votes) {
            const product = _.find(products, p => p.id === productId);
            if (!product) {
                console.warn(`Product with id ${product} not found!`);
                continue;
            }
            data.push({
                created: token.created,
                email: token.email,
                vote: product.name,
                points: token.product_votes[productId],
                participate: token.participate ? 'Ja' : 'Nein'
            });
        }
    }

    csvWriter
        .writeRecords(data)
        .then(() => console.log('The CSV file was written successfully'));
}

function getCompanies(): Promise<Company[]> {
    return admin.firestore()
        .collection('companies')
        .get()
        .then(result => result.docs)
        .then(companies => companies.map(p => ({ id: p.id, ...p.data() }) as Company));
}

function getVotings(): Promise<Vote[]> {
    return admin.firestore()
        .collection('access_tokens')
        .get()
        .then(result => result.docs)
        .then(votes => votes.map(v => new Vote(v.data())));
}

function getProducts(): Promise<Product[]> {
    return admin.firestore()
        .collection('products')
        .get()
        .then(result => result.docs)
        .then(docs => docs.map(p => ({ id: p.id, ...p.data() }) as Product));
}