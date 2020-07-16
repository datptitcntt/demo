import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ECommerceFakeDb } from 'app/fake-db/e-commerce';
import { Product } from '../product/product.model';

@Injectable()
export class EcommerceProductsService
{

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
    }

    getProducts(): Observable<any>
    {
        return of(ECommerceFakeDb.products)
    }
}
