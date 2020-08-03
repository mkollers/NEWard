export class Vote {
    company_votes: { [companyId: string]: number };
    product_votes: { [productId: string]: number };
    email: string;
    created: string;
    updated: string[];

    constructor(data: any) {
        this.email = data.email;
        this.created = data.created;
        this.company_votes = data.company_votes || {};
        this.product_votes = data.product_votes || {};
        this.updated = data.updated || [];
    }
}