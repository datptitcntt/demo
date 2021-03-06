import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IProductState } from '../state/product.state';

const selectProducts = (state: IAppState) => state.products;

export const selectProductList = createSelector(
  selectProducts,
  (state: IProductState) => state.products
);

export const selectedProduct = createSelector(
  selectProducts,
  (state: IProductState) => state.selectedProduct
);
