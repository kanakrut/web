import {Cart} from './Cart';

export class Products {
  id;
  title;
  description;
  img;
  price;
  carts: Cart[] = [];
}
