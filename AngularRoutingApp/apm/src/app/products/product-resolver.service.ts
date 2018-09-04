import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { ProductService } from './product.service';
import { IProduct } from './product';

@Injectable()
export class ProductResolver implements Resolve<IProduct> {

    constructor(
        private productService: ProductService,
        private router: Router
    ) {

    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<IProduct> {
        let id = +route.params['id'];

        if (isNaN(id)) {
            this.router.navigate(['/products']);
            return Observable.of(null);
        }

        return this.productService.getProduct(id)
            .map(product => {
                if (product) {
                    return product;
                }

                this.router.navigate(['/products']);
                return null;
            }).catch(error => {
                this.router.navigate(['/products']);
                return Observable.of(null);
            });
    }
}