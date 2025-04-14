import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.css']
})
export class TrainingsComponent implements OnInit {
  trainings = [
    {
      id: 1,
      title: 'Professional Development',
      description: 'Enhance your skills with our comprehensive training programs.',
      icon: 'bi bi-book',
      link: '#'
    },
    {
      id: 2,
      title: 'Technical Training',
      description: 'Master the latest technologies and tools in your field.',
      icon: 'bi bi-code-slash',
      link: '#'
    },
    {
      id: 3,
      title: 'Soft Skills',
      description: 'Develop essential interpersonal and communication skills.',
      icon: 'bi bi-people',
      link: '#'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
} 