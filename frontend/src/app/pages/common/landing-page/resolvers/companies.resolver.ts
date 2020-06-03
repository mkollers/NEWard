import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Company } from '@shared/data-access/models/company';
import { CompanyService } from '@shared/data-access/services/company.service';
import { first } from 'rxjs/operators';

@Injectable()
export class CompaniesResolver implements Resolve<Promise<Company[] | null>> {

    constructor(private _companyService: CompanyService) { }

    async resolve() {
        try {
            return await this._companyService.getAll().pipe(first()).toPromise();
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}