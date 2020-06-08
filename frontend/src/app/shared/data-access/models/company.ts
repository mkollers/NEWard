import { Address } from './address';
import { Person } from './person';

export interface Company {
    id: string;
    address: Address;
    documents: string[];
    email: string;
    foundingDate: string;
    images: string[];
    legalName: string;
    logo: string;
    person: Person;
    promotion: {
        achieved: string;
        description: string;
        usp: string;
        why: string;
    };
    telephone: string;
    url: string;
    videos: string[];
}
