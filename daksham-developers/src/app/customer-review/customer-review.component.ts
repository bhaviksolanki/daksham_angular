import { Component, AfterViewInit } from '@angular/core';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JavaScript

declare const bootstrap: any; // Declare bootstrap to avoid TypeScript errors

@Component({
  selector: 'app-customer-review',
  standalone: true,
  templateUrl: './customer-review.component.html',
  styleUrls: ['./customer-review.component.css']
})
export class CustomerReviewComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const multipleItemCarousel = document.querySelector("#testimonialCarousel");

    if (multipleItemCarousel && window.matchMedia("(min-width:576px)").matches) {
      const carousel = new bootstrap.Carousel(multipleItemCarousel, {
        interval: false
      });

      const carouselInner = multipleItemCarousel.querySelector('.carousel-inner') as HTMLElement;
      const carouselItems = multipleItemCarousel.querySelectorAll('.carousel-item');
      const cardWidth = carouselItems[0].clientWidth;

      let scrollPosition = 0;

      multipleItemCarousel.querySelector('.carousel-control-next')?.addEventListener('click', () => {
        if (scrollPosition < carouselInner.scrollWidth - cardWidth * 3) {
          scrollPosition += cardWidth;
          carouselInner.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        }
      });

      multipleItemCarousel.querySelector('.carousel-control-prev')?.addEventListener('click', () => {
        if (scrollPosition > 0) {
          scrollPosition -= cardWidth;
          carouselInner.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        }
      });
    } else if (multipleItemCarousel) {
      multipleItemCarousel.classList.add("slide");
    }
  }
}
