import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollService } from '../service/scroll.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private scrollService: ScrollService) { }

  scrollToFooter() {
    this.scrollService.scroll();
  }

}
