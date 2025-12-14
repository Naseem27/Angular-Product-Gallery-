import { Component, Input, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

type StarType = 'full' | 'half' | 'empty';

@Component({
  selector: 'app-rating-star',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating-star.html',
  styleUrls: ['./rating-star.css'],
})
export class RatingStarComponent implements OnChanges {
  @Input() rating = 0;
  @Input() size = 18;
  @Input() color = '#f6c945';
  @Input() emptyColor = '#ddd';

  stars: StarType[] = [];
  r = 0;
  uid = '';

  ngOnChanges(): void {
    // clamp rating to 0–5
    this.r = Math.max(0, Math.min(5, Number(this.rating) || 0));

    const full = Math.floor(this.r);
    const remainder = this.r - full;
    const half = remainder >= 0.25 && remainder < 0.75;
    const extraFull = remainder >= 0.75 ? 1 : 0;
    const totalFull = full + extraFull;

    this.stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < totalFull) this.stars.push('full');
      else if (i === totalFull && half) this.stars.push('half');
      else this.stars.push('empty');
    }

    // unique id per component instance (for SVG clipPath)
    this.uid = Math.random().toString(36).slice(2, 9);
  }
}
