export interface Token {
    key: string;
    created: string;
    updated?: string;
    modifyDates: string[];
    email: string;
    company_votes: { [company: string]: number };
    product_votes: { [product: string]: number };
    participate: boolean | undefined;
}