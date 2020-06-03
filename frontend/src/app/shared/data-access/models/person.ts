import { Gender } from './gender';

export interface Person {
    additionalName?: string;
    email: string;
    familyName: string;
    gender: Gender;
    givenName: string;
    honorificPrefix?: string;
    honorificSuffix?: string;
    jobTitle?: string;
    telephone: string;
}