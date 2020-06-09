import * as faker from 'faker';

import { CompanyMock } from './company.mock';
import { Product } from './product';

export class ProductMock implements Product {
    id = faker.random.uuid();
    documents = [{ name: faker.lorem.word(), url: faker.internet.url() }];
    images = this.generateUrls();
    logo = faker.internet.url();
    manufacturer = new CompanyMock();
    name = faker.commerce.productName();
    promotion = {
        description: faker.lorem.paragraph(10),
        usp: faker.lorem.paragraph(10),
        why: faker.lorem.paragraph(10)
    };
    releaseDate = faker.date.past().toISOString();
    url = faker.internet.url();
    videos = this.generateUrls();

    generateUrls(count = faker.random.number(10)) {
        const urls = [];
        for (let i = 0; i < count; i++) {
            urls.push(faker.internet.url());
        }
        return urls;
    }
}