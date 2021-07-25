import { DocumentData } from '@google-cloud/firestore';
import * as admin from 'firebase-admin';
import * as _ from 'lodash';

import { Company } from '../frontend/src/app/shared/data-access/models/company';
import { Product } from '../frontend/src/app/shared/data-access/models/product';
import { initialize } from './initialize';

initialize();
main();

async function main() {
    const year = +process.argv[2] || (new Date().getFullYear() - 1);

    const companies = await getCompanies();
    for (let company of companies) {
        await createCompany(year, company);
        await deleteCompany(company.id);
    }

    const products = await getProducts();
    for (let product of products) {
        await createProduct(year, product);
        await deleteProduct(product.id);
    }

    const tokens = await getAccessTokens();
    for (let token of tokens) {
        await createAccessToken(year, token);
        await deleteAccessToken(token.id);
    }
}

function getCompanies(): Promise<Company[]> {
    return admin.firestore()
        .collection('companies')
        .get()
        .then(result => result.docs)
        .then(companies => companies.map(p => ({ id: p.id, ...p.data() }) as Company));
}

function createCompany(year: number, company: Company): Promise<any> {
    const data = { ...company };
    delete data.id;

    return admin.firestore()
        .doc(`companies_${year}/${company.id}`)
        .set(data);
}

function deleteCompany(id: string): Promise<any> {
    return admin.firestore()
        .doc(`companies/${id}`)
        .delete();
}

function getProducts(): Promise<Product[]> {
    return admin.firestore()
        .collection('products')
        .get()
        .then(result => result.docs)
        .then(products => products.map(p => ({ id: p.id, ...p.data() }) as Product));
}

function createProduct(year: number, product: Product): Promise<any> {
    const data = { ...product };
    delete data.id;

    return admin.firestore()
        .doc(`products_${year}/${product.id}`)
        .set(data);
}

function deleteProduct(id: string): Promise<any> {
    return admin.firestore()
        .doc(`products/${id}`)
        .delete();
}

function getAccessTokens(): Promise<FirebaseFirestore.QueryDocumentSnapshot<DocumentData>[]> {
    return admin.firestore()
        .collection('access_tokens')
        .get()
        .then(data => data.docs);
}

function createAccessToken(year: number, data: FirebaseFirestore.QueryDocumentSnapshot<DocumentData>): Promise<any> {
    return admin.firestore()
        .doc(`access_tokens_${year}/${data.id}`)
        .set(data.data());
}

function deleteAccessToken(id: string): Promise<any> {
    return admin.firestore()
        .doc(`access_tokens/${id}`)
        .delete();
}