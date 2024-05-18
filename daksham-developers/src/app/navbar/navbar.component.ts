import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  openEnquiryForm() {
    // Implement logic for opening the enquiry form
  }

  myFunction() {
    // Implement logic for toggling the navigation menu
  }

}
