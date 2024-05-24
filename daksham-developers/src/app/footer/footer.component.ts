import { Component, ElementRef } from '@angular/core';
import { ScrollService } from '../service/scroll.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(private scrollService: ScrollService, private el: ElementRef) { }

  ngOnInit() {
    this.scrollService.getScrollObservable().subscribe(() => {
      this.scrollToFooter();
    });
  }

  scrollToFooter() {
    const footer = this.el.nativeElement.querySelector('#footer');
    footer.scrollIntoView({ behavior: 'smooth' });
  }


}
