import * as faker from 'faker';

import { AddressMock } from './address.mock';
import { Company } from './company';
import { PersonMock } from './person.mock';

export class CompanyMock implements Company {
    address = new AddressMock();
    documents = [{ name: faker.lorem.word(), url: faker.internet.url() }];
    email = faker.internet.email();
    telephone = faker.phone.phoneNumber();
    foundingDate = faker.date.past().toISOString();
    id = faker.random.uuid();
    images = this.generateUrls();
    legalName = faker.company.companyName();
    logo = faker.internet.url();
    person = new PersonMock();
    promotion = {
        achieved: faker.lorem.paragraph(10),
        description: faker.lorem.paragraph(10),
        usp: faker.lorem.paragraph(10),
        why: faker.lorem.paragraph(10)
    };
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