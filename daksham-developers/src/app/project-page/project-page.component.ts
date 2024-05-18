import { Component, OnInit } from '@angular/core';
import { ContentfulService } from '../service/contentful.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.css'
})
export class ProjectPageComponent implements OnInit {

  projects: any | undefined;

  constructor(private contentfulService: ContentfulService) { }

  //projects;

  ngOnInit(): void {


  }
}
