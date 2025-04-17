import { Component } from '@angular/core';
import IContact from '../../vms/Icontact.vm';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contactModel: IContact = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  submissionStatus:string = "";
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log('Form submitted', this.contactModel);
    this.submissionStatus = "Form submitted successfully!";
    setTimeout(() => {
      this.submissionStatus = "";
    }, 2000);

    this.contactModel = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
  }
}
