import { Component } from '@angular/core';
import { AfterViewInit } from '@angular/core';

declare const $: any;
declare const bootstrap: any;

@Component({
  selector: 'app-customer-review',
  standalone: true,
  imports: [],
  templateUrl: './customer-review.component.html',
  styleUrl: './customer-review.component.css'
})
export class CustomerReviewComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const multipleItemCarousel = document.querySelector("#testimonialCarousel");

    if (window.matchMedia("(min-width:576px)").matches) {
      const carousel = new bootstrap.Carousel(multipleItemCarousel, {
        interval: false
      });

      const carouselWidth = $(".carousel-inner")[0].scrollWidth;
      const cardWidth = $(".carousel-item").width();

      let scrollPosition = 0;

      $(".carousel-control-next").on("click", function () {
        if (scrollPosition < carouselWidth - cardWidth * 3) {
          console.log("next");
          scrollPosition = scrollPosition + cardWidth;
          $(".carousel-inner").animate({ scrollLeft: scrollPosition }, 800);
        }
      });
      $(".carousel-control-prev").on("click", function () {
        if (scrollPosition > 0) {
          scrollPosition = scrollPosition - cardWidth;
          $(".carousel-inner").animate({ scrollLeft: scrollPosition }, 800);
        }
      });
    } else {
      $(multipleItemCarousel).addClass("slide");
    }
  }
}
