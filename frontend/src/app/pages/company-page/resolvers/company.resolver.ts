import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Company } from '@shared/data-access/models/company';
import { CompanyService } from '@shared/data-access/services/company.service';
import { first } from 'rxjs/operators';

@Injectable()
export class CompanyResolver implements Resolve<Promise<Company | null>> {

    constructor(private _companyService: CompanyService) { }

    async resolve(route: ActivatedRouteSnapshot) {
        try {
            const id = route.parent?.params.id;
            if (!id) { return null; }
            return await this._companyService.getById(id).pipe(first()).toPromise();
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}