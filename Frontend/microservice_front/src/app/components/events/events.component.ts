import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events = [
    {
      id: 1,
      title: 'Workshop: Advanced Programming',
      date: '2024-04-15',
      time: '10:00 AM',
      location: 'Virtual',
      description: 'Learn advanced programming concepts and best practices'
    },
    {
      id: 2,
      title: 'Team Building Session',
      date: '2024-04-20',
      time: '02:00 PM',
      location: 'Conference Room A',
      description: 'Enhance team collaboration and communication skills'
    },
    {
      id: 3,
      title: 'Leadership Training',
      date: '2024-04-25',
      time: '09:00 AM',
      location: 'Training Center',
      description: 'Develop essential leadership skills and strategies'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  getDay(date: string): number {
    return new Date(date).getDate();
  }

  getMonth(date: string): string {
    return new Date(date).toLocaleString('default', { month: 'short' });
  }
} 