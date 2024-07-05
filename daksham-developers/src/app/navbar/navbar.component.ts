import { Component, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollService } from '../service/scroll.service';
import { EnquiryFormComponent } from '../enquiry-form/enquiry-form.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,EnquiryFormComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  @ViewChild(EnquiryFormComponent) enquiryModal!: EnquiryFormComponent;
  
  constructor(private cdr: ChangeDetectorRef,private scrollService: ScrollService) {}

  ngAfterViewInit() {
    // Ensure that change detection runs after the view has been initialized
    this.cdr.detectChanges();
  }

  openEnquiryModal() {
    this.enquiryModal.open();
  }

  scrollToFooter() {
    this.scrollService.scroll();
  }

}
