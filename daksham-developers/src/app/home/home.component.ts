import { Component, Input, HostListener, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentfulService } from '../service/contentful.service';
import { Entry } from 'contentful';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProjectPageComponent } from '../project-page/project-page.component';
import { AboutUsComponent } from '../about-us/about-us.component';
//import { CarouselComponent } from '../carousel/carousel.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent, ProjectPageComponent, AboutUsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private contentfulService: ContentfulService) { }

  welcomeText: Entry<any> | undefined;
  projects$: Observable<any> | undefined;
  projects: any[] = [];
  isMobileView = false;
  activeDotIndex = 0;
  private intervalId: any;

  ngOnInit(): void {
    const entryId = '4rw7iySqVK641Utmd2Fpck';
    this.contentfulService.getEntryForId(entryId).then((entry) => {
      this.welcomeText = entry;
      console.log('Welcome Text:', this.welcomeText);
    });

    this.projects$ = this.contentfulService.getProjects();
    this.projects$.subscribe((projects) => {
      this.projects = projects;
      console.log('Projects :', this.projects);
    });
    this.checkViewport();
    this.startAutoSlide();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkViewport();
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
