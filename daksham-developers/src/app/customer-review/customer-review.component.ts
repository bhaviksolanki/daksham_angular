import { Component, OnInit, HostListener, Input } from '@angular/core';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-review',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './customer-review.component.html',
  styleUrls: ['./customer-review.component.css']
})
export class CustomerReviewComponent implements OnInit {

  @Input() customerReviews: any[] = [];
  currentIndex = 0;
  itemsPerPage = 3;

  ngOnInit(): void {
    this.updateItemsPerPage(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateItemsPerPage(event.target.innerWidth);
  }

  updateItemsPerPage(width: number): void {
    if (width >= 1024) {
      this.itemsPerPage = 3;
    } else if (width >= 768) {
      this.itemsPerPage = 2;
    } else {
      this.itemsPerPage = 1;
    }
  }

  next(): void {
    if (this.currentIndex < this.customerReviews.length - this.itemsPerPage) {
      this.currentIndex += 1;
    } else {
      this.currentIndex = 0;
    }
  }

  prev(): void {
    if (this.currentIndex >= 1) {
      this.currentIndex -= 1;
    } else {
      this.currentIndex = 0;
    }
  }

}
