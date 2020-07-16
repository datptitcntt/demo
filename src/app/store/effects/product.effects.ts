import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store, select } from '@ngrx/store';
import { of } from 'rxjs';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';

import { IAppState } from '../state/app.state';
import {
  GetProductsSuccess,
  EProductActions,
  GetProductSuccess,
  GetProduct,
  GetProducts
} from '../actions/product.actions';
import { selectProductList } from '../selectors/product.selector';
import { Product } from 'app/main/apps/e-commerce/product/product.model';
import { EcommerceProductsService } from 'app/main/apps/e-commerce/products/products.service';

@Injectable()
export class ProductEffects {
  @Effect()
  getProduct$ = this._actions$.pipe(
    ofType<GetProduct>(EProductActions.GetProduct),
    map(action => action.payload),
    withLatestFrom(this._store.pipe(select(selectProductList))),
    switchMap(([id, products]) => {
      const selectedProduct = products.filter(product => product.id == id)[0];
      return of(new GetProductSuccess(selectedProduct));
    })
  );

  @Effect()
  getProducts$ = this._actions$.pipe(
    ofType<GetProducts>(EProductActions.GetProducts),
    switchMap(() => this._productsService.getProducts()),
    switchMap((products: Product[]) => of(new GetProductsSuccess(products)))
  );

  constructor(
    private _productsService: EcommerceProductsService,
    private _actions$: Actions,
    private _store: Store<IAppState>
  ) {}
}
