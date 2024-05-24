import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../service/contentful.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.css'
})
export class ProjectPageComponent implements OnInit {

  projects: any | undefined;

  constructor(private route: ActivatedRoute) { }

  //projects;

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        const id = params['id'];
      }
    );
  }
}
