import { Action } from '@ngrx/store';
import { Product } from 'app/main/apps/e-commerce/product/product.model';


export enum EProductActions {
  GetProducts = '[Product] Get Products',
  GetProductsSuccess = '[Product] Get Products Success',
  GetProduct = '[Product] Get Product',
  GetProductSuccess = '[Product] Get Product Success',
  CreateNewProduct = '[Product] Create Product',
  CreateNewProductSuccess = '[Product] Create Product Success'
}

export class GetProducts implements Action {
  public readonly type = EProductActions.GetProducts;
}

export class GetProductsSuccess implements Action {
  public readonly type = EProductActions.GetProductsSuccess;
  constructor(public payload: Product[]) {}
}

export class GetProduct implements Action {
  public readonly type = EProductActions.GetProduct;
  constructor(public payload: string) {}
}

export class GetProductSuccess implements Action {
  public readonly type = EProductActions.GetProductSuccess;
  constructor(public payload: Product) {}
}

export type ProductActions = GetProducts | GetProductsSuccess | GetProduct | GetProductSuccess;
