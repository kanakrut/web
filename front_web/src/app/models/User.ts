import {Cart} from './Cart';

export class User {
  id;
  username = '';
  password = '';
  email = '';
  cart: Cart = new Cart();
}
