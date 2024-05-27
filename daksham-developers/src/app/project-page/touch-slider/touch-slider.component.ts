import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

export interface Slide {
  imgSrc: string;
  imgAlt: string;
}

@Component({
  selector: 'app-touch-slider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './touch-slider.component.html',
  styleUrl: './touch-slider.component.css'
})
export class TouchSliderComponent implements OnInit {


  @Input() projectData$!: Observable<any>;
  projectData!: Observable<any>;
  length: number = 0;
  selectedIndex = 0;

  ngOnInit(): void {
    this.projectData = this.projectData$;
    this.projectData$.subscribe(data => {
      this.length = data.length;
    });
  }

  showPrev(i: number) {
    if (this.selectedIndex > 0) {
      this.selectedIndex = i - 1;
    }
  }
  showNext(i: number) {
    if (this.selectedIndex < (this.length || 0) - 1) {
      this.selectedIndex = i + 1;

    }
  }

}
