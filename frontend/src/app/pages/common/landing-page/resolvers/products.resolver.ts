import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Product } from '@shared/data-access/models/product';
import { ProductService } from '@shared/data-access/services/product.service';
import { first } from 'rxjs/operators';

@Injectable()
export class ProductsResolver implements Resolve<Promise<Product[] | null>> {

    constructor(private _productService: ProductService) { }

    async resolve() {
        try {
            return await this._productService.getAll().pipe(first()).toPromise();
        } catch (err) {
            console.error(err);
            return null;
        }
    }
}