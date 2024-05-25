import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { ContentfulService } from '../service/contentful.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit, OnDestroy {

  projects: any | undefined;
  projectData$!: Observable<any>;
  richTextHtml: string | undefined;
  isMobileView = false;
  activeDotIndex = 0;
  private intervalId: any;

  constructor(private route: ActivatedRoute, private contentfulService: ContentfulService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params['id'];
      this.projectData$ = this.contentfulService.getProjectById(projectId);
      this.projectData$.subscribe(projectData => {
        if (projectData?.fields.locationAdvantage) {
          this.richTextHtml = documentToHtmlString(projectData.fields.locationAdvantage);
        }
      });
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
    this.projectData$.subscribe(projectData => {
      if (projectData?.fields.sliderImages) {
        this.activeDotIndex = (this.activeDotIndex + 1) % projectData.fields.sliderImages.length;
      }
    });
  }

  prevSlide() {
    this.projectData$.subscribe(projectData => {
      if (projectData?.fields.sliderImages) {
        this.activeDotIndex = (this.activeDotIndex - 1 + projectData.fields.sliderImages.length) % projectData.fields.sliderImages.length;
      }
    });
  }

  goToSlide(index: number) {
    this.activeDotIndex = index;
    this.stopAutoSlide();
    this.startAutoSlide(); // Reset the interval when manually changing slides
  }
}
