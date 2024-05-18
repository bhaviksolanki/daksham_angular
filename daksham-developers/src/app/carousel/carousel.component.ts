import { Component, Input, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  @Input() projects: any[] = [];
  isMobileView = false;
  activeDotIndex = 0;
  private intervalId: any;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkViewport();
  }

  ngOnInit() {
    this.checkViewport();
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  checkViewport() {
    this.isMobileView = window.innerWidth < 768; // Assuming 768px is the breakpoint for mobile devices
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  stopAutoSlide() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  nextSlide() {
    this.activeDotIndex = (this.activeDotIndex + 1) % this.projects.length;
  }

  prevSlide() {
    this.activeDotIndex = (this.activeDotIndex - 1 + this.projects.length) % this.projects.length;
  }

  goToSlide(index: number) {
    this.activeDotIndex = index;
    this.stopAutoSlide();
    this.startAutoSlide(); // Reset the interval when manually changing slides
  }
}


