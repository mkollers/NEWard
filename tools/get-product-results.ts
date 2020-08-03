import * as admin from 'firebase-admin';
import * as _ from 'lodash';

import { Product } from '../frontend/src/app/shared/data-access/models/product';
import { initialize } from './initialize';
import { Vote } from './models/vote';

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'Produktneuheit-des-Jahres-Summen.csv',
    header: [
        { id: 'product', title: 'Produkt' },
        { id: 'company', title: 'Unternehmen' },
        { id: 'points', title: 'Punkte' }
    ],
    fieldDelimiter: ';'
});

initialize();
main();

async function main() {
    const votings = await getVotings();
    const products = await getProducts();

    const data = [];

    for (let product of products) {
        data.push({
            product: product.name,
            company: product.manufacturer.legalName,
            points: _.sum(votings.map(v => v.product_votes[product.id])) || 0
        });
    }

    csvWriter
        .writeRecords(data)
        .then(() => console.log('The CSV file was written successfully'));
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
        .then(products => products.map(p => ({ id: p.id, ...p.data() }) as Product));
}