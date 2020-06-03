import * as faker from 'faker';

import { Gender } from './gender';
import { Person } from './person';

export class PersonMock implements Person {
    additionalName = faker.name.firstName();
    email = faker.internet.email();
    familyName = faker.name.lastName();
    gender = faker.random.arrayElement([Gender.Male, Gender.Female]);
    givenName = faker.name.firstName();
    honorificPrefix = faker.name.prefix();
    honorificSuffix = faker.name.suffix();
    jobTitle = faker.name.jobTitle();
    telephone = faker.phone.phoneNumber();
}