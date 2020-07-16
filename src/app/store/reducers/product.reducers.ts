import { initialProductState, IProductState } from '../state/product.state';
import { ProductActions, EProductActions } from '../actions/product.actions';
import { state } from '@angular/animations';

export const productReducers = (
  state = initialProductState,
  action: ProductActions
): IProductState => {
  switch (action.type) {
    case EProductActions.GetProductsSuccess: {
      return {
        ...state,
        products: action.payload
      };
    }
    case EProductActions.GetProductSuccess: {
      return {
        ...state,
        selectedProduct: action.payload
      };
    }

    default:
      return state;
  }
};
