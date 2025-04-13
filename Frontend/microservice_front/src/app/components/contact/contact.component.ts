import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  contactInfo = [
    {
      icon: 'bi-geo-alt',
      title: 'Location',
      value: '123 Business Street, City, Country'
    },
    {
      icon: 'bi-envelope',
      title: 'Email',
      value: 'info@microserviceplatform.com'
    },
    {
      icon: 'bi-phone',
      title: 'Phone',
      value: '+1 234 567 890'
    }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      // Handle form submission
      console.log(this.contactForm.value);
      this.contactForm.reset();
    }
  }
} 