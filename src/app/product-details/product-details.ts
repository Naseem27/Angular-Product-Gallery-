import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RatingStarComponent } from '../rating-star/rating-star';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RatingStarComponent],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: any = null;
  loading = true;

  showMagnifier = false;
  magnifierPos = { x: 0, y: 0 };

  @ViewChild('imgRef', { static: false })
  imgRef!: ElementRef<HTMLImageElement>;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.http.get(`https://dummyjson.com/products/${id}`).subscribe({
      next: (data) => {
        this.product = data;
        this.loading = false;
      },
      error: () => {
        console.error('Error loading product');
        this.loading = false;
      },
    });
  }

  handleMouseMove(event: MouseEvent): void {
    const rect = this.imgRef.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      this.showMagnifier = false;
      return;
    }

    this.magnifierPos = { x, y };
  }

  handleBack(): void {
    this.router.navigate(['/']);
  }
}
