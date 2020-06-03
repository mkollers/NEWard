import * as faker from 'faker';

import { Address } from './address';

export class AddressMock implements Address {
    addressCountry = faker.address.country();
    addressLocality = faker.address.city();
    addressRegion = faker.address.state();
    postalCode = faker.address.zipCode();
    streetAddress = faker.address.streetAddress();
}