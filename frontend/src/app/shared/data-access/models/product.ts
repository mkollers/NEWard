import { Company } from './company';

export interface Product {
    id: string;
    documents: string[];
    images: string[];
    logo: string;
    manufacturer: Company;
    name: string;
    promotion: {
        description: string;
        usp: string;
        why: string;
    };
    releaseDate: string;
    url: string;
    videos: string[];
}