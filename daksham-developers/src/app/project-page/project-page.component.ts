import { Component, HostListener, OnInit } from '@angular/core';
import { ContentfulService } from '../service/contentful.service';
import { CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { Observable } from 'rxjs';
import { ThemeDirective, CarouselComponent, CarouselIndicatorsComponent, CarouselInnerComponent, CarouselItemComponent, CarouselControlComponent } from '@coreui/angular';
import { HammerModule } from '@angular/platform-browser';
import { GoogleMapsModule } from "@angular/google-maps";
import { CustomerReviewComponent } from '../customer-review/customer-review.component';

@Component({
  selector: 'app-project-page',
  standalone: true,
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
  imports: [CommonModule, NavbarComponent, FooterComponent, ThemeDirective,
    CarouselComponent, CarouselIndicatorsComponent, CarouselInnerComponent,
    NgFor, CarouselItemComponent, CarouselControlComponent, RouterLink, HammerModule, GoogleMapsModule, CustomerReviewComponent]
})
export class ProjectPageComponent implements OnInit {

  projectData$!: Observable<any>;
  projectData: any;
  isMobileView = false;
  richTextHtml: string | undefined;
  selectedImage: string = '';
  customerReview$: Observable<any> | undefined;
  customerReviews: any[] = [];
  options: google.maps.MapOptions = {
    mapId: "7c712ea74729a6ea",
    center: { lat: 0, lng: 0 },  // Default center
    zoom: 10,
  };
  mapheight : string = "450px";
  mapWidth : string = "500px";

  items : any[] = [];
  selectedIndex = 0;

  constructor(private route: ActivatedRoute, private contentfulService: ContentfulService) { 
    this.setMapDimensions();
  }

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
        this.items = this.projectData?.fields?.amenityImages;
        if (projectData?.fields?.latitudeCoordinate && projectData?.fields?.longitudeCoordinate) { 
          this.options = {
            center: { lat: this.projectData?.fields?.latitudeCoordinate, lng: this.projectData?.fields?.longitudeCoordinate }
          };
        }
      });
      this.customerReview$ = this.contentfulService.getAllCustomerReviews();
      this.customerReview$.subscribe((customerReview) => {
        this.customerReviews = customerReview;
        console.log('Customer Reviews :', this.customerReviews);
      });
    });

    this.checkViewport();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkViewport();
  }

  setMapDimensions(){
    if(window.innerWidth>1024)
      {
        this.mapWidth = "500px";
        this.mapheight = "450px";
      }
      else if(window.innerWidth<=1024 && window.innerWidth>768){
        this.mapWidth = "700px";
        this.mapheight = "325px";
      }
      else if(window.innerWidth<500){
        this.mapWidth = "350px";
      }
      
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

  showPrev(i: number) {
    if (this.selectedIndex > 0) {
      this.selectedIndex = i - 1;
    }
  }
  showNext(i: number) {
    if (this.selectedIndex < this.items?.length - 1) {
      this.selectedIndex = i + 1;

    }
  }


}
