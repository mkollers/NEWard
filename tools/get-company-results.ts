import * as admin from 'firebase-admin';
import * as _ from 'lodash';

import { Company } from '../frontend/src/app/shared/data-access/models/company';
import { initialize } from './initialize';
import { Vote } from './models/vote';

const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'Aufsteiger-des-Jahres-Summen.csv',
    header: [
        { id: 'company', title: 'Unternehmen' },
        { id: 'points', title: 'Punkte' },
        { id: 'noFraudPoints', title: 'Bereinigte Punkte' }
    ],
    fieldDelimiter: ';'
});

initialize();
main();

async function main() {
    const votings = await getVotings();
    const companies = await getCompanies();

    const data = [];

    for (let company of companies) {
        data.push({
            company: company.legalName,
            points: _.sum(votings.map(v => v.company_votes[company.id])) || 0,
            noFraudPoints: _.sum(votings.filter(v => !v.email.includes('htp.cloud')).map(v => v.company_votes[company.id])) || 0
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

function getCompanies(): Promise<Company[]> {
    return admin.firestore()
        .collection('companies')
        .get()
        .then(result => result.docs)
        .then(companies => companies.map(p => ({ id: p.id, ...p.data() }) as Company));
}