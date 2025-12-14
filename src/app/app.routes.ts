import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list';
import { ProductDetailsComponent } from './product-details/product-details';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailsComponent }
];
