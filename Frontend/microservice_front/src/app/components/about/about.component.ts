import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  stats = [
    {
      number: '1000+',
      label: 'Active Users'
    },
    {
      number: '50+',
      label: 'Training Programs'
    },
    {
      number: '100+',
      label: 'Events'
    },
    {
      number: '95%',
      label: 'Satisfaction Rate'
    }
  ];

  team = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      image: 'assets/img/team/team-1.jpg'
    },
    {
      name: 'Sarah Johnson',
      role: 'Training Director',
      image: 'assets/img/team/team-2.jpg'
    },
    {
      name: 'Michael Brown',
      role: 'Technical Lead',
      image: 'assets/img/team/team-3.jpg'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
} 