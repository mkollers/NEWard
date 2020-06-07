import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Product } from '@shared/data-access/models/product';
import { first } from 'rxjs/operators';
import { ProductService } from 'src/app/shared/data-access/services/product.service';

@Injectable()
export class ProductResolver implements Resolve<Promise<Product | null>> {

    constructor(private _productService: ProductService) { }

    async resolve(route: ActivatedRouteSnapshot) {
        try {
            const id = route.parent?.params.id;
            if (!id) { return null; }
            return await this._productService.getById(id).pipe(first()).toPromise();
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}