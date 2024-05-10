import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentfulService } from '../service/contentful.service';
import { Entry } from 'contentful';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private contentfulService: ContentfulService) { }

  welcomeText: Entry<any> | undefined;

  ngOnInit(): void {
    const entryId = '4rw7iySqVK641Utmd2Fpck';
    this.contentfulService.getEntryForId(entryId).then((entry) => {
      this.welcomeText = entry;
      console.log(entry);
    });

  }

}
