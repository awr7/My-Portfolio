import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import emailjs, { init } from 'emailjs-com';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactForm: FormGroup;
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;

  constructor() {
    emailjs.init("EoajKBrXJbuP671Ij");
    
    this.contactForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'message': new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    const templateParams = {
      to_name: 'Angel',
      from_name: this.contactForm.value.name,
      from_email: this.contactForm.value.email,
      message: this.contactForm.value.message,
    };
  
    // Send the email
    emailjs.send("service_u5jqczl", "template_2ks5v6k", templateParams)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        this.showSuccessMessage = true;
      }, (error) => {
        console.log('FAILED...', error);
        this.showErrorMessage = true;
      });
  }  

  closeMessage() {
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
  }

}