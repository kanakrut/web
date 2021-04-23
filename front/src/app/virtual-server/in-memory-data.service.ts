import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb = () => {
    const products = [
      { id: 1, title: 'Iphone 12', description: 'New1', price: 800000, img: 'https://www.technodom.kz/media/catalog/product/0/9/09201c881b4fd278b7ff7cac0cbc81f127e52539_228600_1.jpg' },
      { id: 2, title: 'Iphone 12 Pro', description: 'New2', price: 900000, img: 'https://www.technodom.kz/media/catalog/product/1/8/187875354c2529ba39c9eb6a57710e634effcd80_228623_1.jpg' },
      { id: 3, title: 'Iphone 12 Pro Max', description: 'New3', price: 1000000, img: 'https://activ.kz/shop/media/products/iPhone-12-Pro-Max-Silver_0002_WWRU_iPhone12ProMax_Q121_Silver_PDP-Image-1B.jpg' },
      { id: 4, title: 'MacBook Air', description: 'New4', price: 1100000, img: 'https://object.pscloud.io/cms/cms/Photo/img_0_62_1818_0.jpg' },
      { id: 5, title: 'MacBook Pro 13', description: 'New5', price: 1200000, img: 'https://gadgetstore.kz/wa-data/public/shop/products/31/03/331/images/1282/1282.970.jpg' },
      { id: 6, title: 'MacBook Pro 16', description: 'New6', price: 1200000, img: 'https://images.satu.kz/136877404_w600_h600_136877404.jpg' },
    ];
    const carts = [
      {
        id: 1,
        user: 1,
        products: [
          { id: 1, title: 'Iphone 12', description: 'New1', price: 800000, img: 'https://www.technodom.kz/media/catalog/product/0/9/09201c881b4fd278b7ff7cac0cbc81f127e52539_228600_1.jpg' },
        ]
      }
    ];
    const users = [{
      id: 1,
      username: 'user',
      password: 'qwerty'
    }];
    return {products, carts, users};
  }
}
