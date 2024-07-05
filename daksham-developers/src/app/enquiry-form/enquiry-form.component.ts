import { CommonModule } from '@angular/common';
import { Component, } from '@angular/core';
import { FormControl, FormsModule,Validators } from '@angular/forms';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-enquiry-form',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './enquiry-form.component.html',
  styleUrl: './enquiry-form.component.css'
})
export class EnquiryFormComponent {
  emailjs_public_key = '2aq585Dr9YouhfG8j';
  show = false;
  to_name = "Daksham Developers";
  to_email = 'dakshamreaaltyllp@gmail.com';
  from_name = '';
  from_email = '';
  from_contact = '';
  message ='';

  open() {
    this.show = true;
  }

  close() {
    this.show = false;
  }

  async onSubmit() {
    emailjs.init(this.emailjs_public_key);
    let response = await emailjs.send("service_upjyr9m","template_mq5oktl",{
      to_name: this.to_name,
      reply_to: "dakshamreaaltyllp@gmail.com",
      from_name: this.from_name,
      from_email: this.from_email,
      from_contact: this.from_contact,
      message : this.message
      });
    console.log('Email Send Successfully with Details :', { name: this.from_name, email: this.from_email, contact: this.from_contact, message:this.message });
    this.close();
  }

}
