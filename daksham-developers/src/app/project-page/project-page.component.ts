import { Component, HostListener, OnInit } from '@angular/core';
import { ContentfulService } from '../service/contentful.service';
import { CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Observable } from 'rxjs';
import { ThemeDirective, CarouselComponent, CarouselIndicatorsComponent, CarouselInnerComponent, CarouselItemComponent, CarouselControlComponent } from '@coreui/angular';
import { TouchSliderComponent } from "./touch-slider/touch-slider.component";
import { HammerModule } from '@angular/platform-browser';

@Component({
  selector: 'app-project-page',
  standalone: true,
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css'],
  imports: [CommonModule, NavbarComponent, FooterComponent, ThemeDirective,
    CarouselComponent, CarouselIndicatorsComponent, CarouselInnerComponent,
    NgFor, CarouselItemComponent, CarouselControlComponent, RouterLink,
    TouchSliderComponent, HammerModule]
})
export class ProjectPageComponent implements OnInit {

  projectData$!: Observable<any>;
  richTextHtml: string | undefined;
  isMobileView = false;
  activeDotIndex = 0;
  projectData: any;
  selectedImage: string = '';

  constructor(private route: ActivatedRoute, private contentfulService: ContentfulService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params['id'];
      this.projectData$ = this.contentfulService.getProjectById(projectId);
      this.projectData$.subscribe(projectData => {
        this.projectData = projectData;
        this.initializeSelectedImage();
        if (projectData?.fields.locationAdvantage) {
          this.richTextHtml = documentToHtmlString(projectData.fields.locationAdvantage);
        }
      });
    });

    this.checkViewport();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkViewport();
  }


  checkViewport() {
    this.isMobileView = window.innerWidth < 768; // Assuming 768px is the breakpoint for mobile devices
  }

  updateMainImage(floorPlanImageUrl: string): void {
    this.selectedImage = floorPlanImageUrl;
  }

  initializeSelectedImage(): void {
    if (this.projectData && this.projectData?.fields?.floorPlan && this.projectData.fields.floorPlan.length > 0) {
      this.selectedImage = this.projectData.fields.floorPlan[0].fields.file.url;
    }
  }


}
