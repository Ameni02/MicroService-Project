import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
  evaluations = [
    {
      id: 1,
      title: 'Skill Assessment',
      progress: 75,
      description: 'Track your skill development progress'
    },
    {
      id: 2,
      title: 'Performance Review',
      progress: 60,
      description: 'Monitor your performance metrics'
    },
    {
      id: 3,
      title: 'Learning Progress',
      progress: 85,
      description: 'View your learning achievements'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
} 