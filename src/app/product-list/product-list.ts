import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationExtras } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductStateService } from '../services/product-state';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.css'],
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  skip = 0;
  loading = true;
  search = '';
  total = 0;

  limit = 5;
  restored = false;
  Math = Math;

  constructor(
    private http: HttpClient,
    private router: Router,
    private productState: ProductStateService
  ) {}

  ngOnInit(): void {
    if (this.productState.products.length > 0) {
      // restore state
      this.products = this.productState.products;
      this.skip = this.productState.skip;
      this.search = this.productState.search;
      this.total = this.productState.total;
      this.loading = false;
    } else {
      this.fetchProducts(this.skip, this.search);
    }
  }

  fetchProducts(skipValue = 0, searchTerm = ''): void {
    this.loading = true;

    let url = `https://dummyjson.com/products?limit=${this.limit}&skip=${skipValue}`;
    if (searchTerm) {
      url = `https://dummyjson.com/products/search?q=${searchTerm}&limit=${this.limit}&skip=${skipValue}`;
    }

    this.http.get<any>(url).subscribe({
      next: (data) => {
        this.products = data.products || [];
        this.total = data.total || 30;

        this.productState.save({
          products: this.products,
          skip: this.skip,
          search: this.search,
          total: this.total,
        });

        this.loading = false;
      },
      error: () => (this.loading = false),
    });
  }

  handleSearch(): void {
    this.skip = 0;
    this.fetchProducts(0, this.search);
  }

  handleClear(): void {
    this.search = '';
    this.fetchProducts(this.skip, '');
  }

  nextPage(): void {
    if (this.skip + this.limit < this.total) {
      this.skip += this.limit;
      this.fetchProducts(this.skip, this.search);
    }
  }

  prevPage(): void {
    if (this.skip > 0) {
      this.skip -= this.limit;
      this.fetchProducts(this.skip, this.search);
    }
  }

  viewDetails(productId: number): void {
    this.productState.save({
      products: this.products,
      skip: this.skip,
      search: this.search,
      total: this.total,
    });

    this.router.navigate([`/product/${productId}`]);
  }
}
