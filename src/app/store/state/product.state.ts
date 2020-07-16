import { Product } from 'app/main/apps/e-commerce/product/product.model';

export interface IProductState {
  products: Product[];
  selectedProduct: Product;
  newProduct: Product;
}

export const initialProductState: IProductState = {
  products: null,
  selectedProduct: null,
  newProduct: null
};
