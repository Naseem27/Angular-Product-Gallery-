import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductStateService {
  products: any[] = [];
  skip = 0;
  search = '';
  total = 0;

  save(state: Partial<ProductStateService>) {
    Object.assign(this, state);
  }

  clear() {
    this.products = [];
    this.skip = 0;
    this.search = '';
    this.total = 0;
  }
}
