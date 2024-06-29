import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { ContentfulService } from '../service/contentful.service';
import { Entry } from 'contentful';
import { RouterLink, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ProjectPageComponent } from '../project-page/project-page.component';
import { AboutUsComponent } from '../about-us/about-us.component';
import { ThemeDirective, CarouselComponent, CarouselIndicatorsComponent, CarouselInnerComponent, CarouselItemComponent, CarouselControlComponent } from '@coreui/angular';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent, ProjectPageComponent, AboutUsComponent, ThemeDirective, CarouselComponent, CarouselIndicatorsComponent, CarouselInnerComponent, NgFor, CarouselItemComponent, CarouselControlComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  project: any;
  projectData: any;
  richTextHtml: any;

  constructor(private contentfulService: ContentfulService) { }

  welcomeText: Entry<any> | undefined;
  projects$: Observable<any> | undefined;
  projects: any[] = [];
  isMobileView = false;
  activeDotIndex = 0;

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

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkViewport();
  }

  checkViewport() {
    this.isMobileView = window.innerWidth < 768; // Assuming 768px is the breakpoint for mobile devices
  }

}
