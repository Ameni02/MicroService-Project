import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// @ts-ignore
declare var AOS: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Icon Boxes in Hero Section
  iconBoxes = [
    {
      icon: 'bi-mortarboard',
      title: 'Training Management',
      route: '/trainings'
    },
    {
      icon: 'bi-chat-dots',
      title: 'Feedback System',
      route: '/feedbacks'
    },
    {
      icon: 'bi-clipboard-check',
      title: 'Evaluation Tools',
      route: '/evaluation'
    },
    {
      icon: 'bi-calendar-event',
      title: 'Event Planning',
      route: '/events'
    }
  ];

  // Features Section
  features = [
    {
      title: 'Centralized Training Management'
    },
    {
      title: 'Comprehensive Feedback System'
    },
    {
      title: 'Detailed Evaluation Tools'
    },
    {
      title: 'Secure Document Management'
    },
    {
      title: 'Integrated Payment Processing'
    },
    {
      title: 'Interactive Discussion Forums'
    }
  ];

  // Services Section - Microservices
  services = [
    {
      icon: 'bi-mortarboard',
      title: 'Training Service',
      description: 'Manage and organize training programs with comprehensive course catalogs, instructor management, and participant tracking.',
      delay: 100,
      route: '/trainings'
    },
    {
      icon: 'bi-chat-dots',
      title: 'Feedback Service',
      description: 'Collect, analyze, and respond to user feedback with our advanced feedback management system featuring categorization and analytics.',
      delay: 200,
      route: '/feedbacks'
    },
    {
      icon: 'bi-clipboard-check',
      title: 'Evaluation Service',
      description: 'Create customized evaluation forms, conduct assessments, and generate detailed reports to measure training effectiveness.',
      delay: 300,
      route: '/evaluation'
    },
    {
      icon: 'bi-credit-card',
      title: 'Payment Service',
      description: 'Process payments securely with our integrated payment gateway supporting multiple payment methods and subscription management.',
      delay: 400,
      route: '/payment'
    },
    {
      icon: 'bi-file-earmark-text',
      title: 'Documents Service',
      description: 'Store, manage, and share training materials, certificates, and other important documents with advanced access controls.',
      delay: 500,
      route: '/documents'
    },
    {
      icon: 'bi-calendar-check',
      title: 'Planification Service',
      description: 'Schedule and organize training sessions, manage resources, and send automated notifications to participants.',
      delay: 600,
      route: '/planification'
    }
  ];

  // Pricing Plans
  pricingPlans = [
    {
      name: 'Basic Plan',
      price: '0',
      color: '#20c997',
      icon: 'bi-box',
      featured: false,
      features: [
        { text: 'Training Management', included: true },
        { text: 'Basic Feedback System', included: true },
        { text: 'Simple Evaluation Tools', included: true },
        { text: 'Document Storage (Limited)', included: false },
        { text: 'Premium Support', included: false }
      ]
    },
    {
      name: 'Professional Plan',
      price: '29',
      color: '#0dcaf0',
      icon: 'bi-send',
      featured: true,
      features: [
        { text: 'Training Management', included: true },
        { text: 'Advanced Feedback System', included: true },
        { text: 'Comprehensive Evaluation', included: true },
        { text: 'Document Storage (10GB)', included: true },
        { text: 'Premium Support', included: false }
      ]
    },
    {
      name: 'Enterprise Plan',
      price: '49',
      color: '#fd7e14',
      icon: 'bi-building',
      featured: false,
      features: [
        { text: 'Training Management', included: true },
        { text: 'Advanced Feedback System', included: true },
        { text: 'Comprehensive Evaluation', included: true },
        { text: 'Document Storage (50GB)', included: true },
        { text: 'Premium Support', included: true }
      ]
    },
    {
      name: 'Custom Plan',
      price: 'Custom',
      color: '#0d6efd',
      icon: 'bi-rocket',
      featured: false,
      features: [
        { text: 'Training Management', included: true },
        { text: 'Advanced Feedback System', included: true },
        { text: 'Comprehensive Evaluation', included: true },
        { text: 'Unlimited Document Storage', included: true },
        { text: 'Dedicated Support Team', included: true }
      ]
    }
  ];

  // Testimonials Section
  testimonials = [
    {
      name: 'Ahmed Ben Ali',
      position: 'Training Manager',
      company: 'Tech Solutions',
      image: '/assets/img/about-company-1.jpg',
      quote: 'The Online-Trainings Platform has revolutionized how we manage our training programs. The feedback system is particularly impressive with its multilingual capabilities.'
    },
    {
      name: 'Sophia Mansour',
      position: 'HR Director',
      company: 'Global Innovations',
      image: '/assets/img/about-company-2.jpg',
      quote: 'We\'ve seen a 40% increase in training effectiveness since implementing this platform. The evaluation tools provide invaluable insights for continuous improvement.'
    },
    {
      name: 'Karim Hatem',
      position: 'CEO',
      company: 'EdTech Startup',
      image: '/assets/img/about-company-3.jpg',
      quote: 'The microservices architecture made it incredibly easy to integrate with our existing systems. The support team has been exceptional throughout the implementation process.'
    }
  ];

  // FAQ Section
  faqs = [
    {
      question: 'What is the Online-Trainings Platform?',
      answer: 'Our Online-Trainings Platform is a comprehensive microservices-based solution designed to manage all aspects of training programs, including course management, feedback collection, evaluation, document management, and more.'
    },
    {
      question: 'How does the Feedback System work?',
      answer: 'Our Feedback System allows users to submit feedback on training programs, which can be categorized, analyzed, and responded to by administrators. It supports anonymous feedback and includes translation capabilities for international users.'
    },
    {
      question: 'Can I integrate the platform with my existing systems?',
      answer: 'Yes, our platform is built using a microservices architecture, which makes it highly flexible and easy to integrate with existing systems through our well-documented APIs.'
    },
    {
      question: 'What payment methods are supported?',
      answer: 'Our Payment Service supports major credit cards, PayPal, and bank transfers. Custom payment integrations can be implemented for Enterprise and Custom plan subscribers.'
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'Currently, our platform is optimized for web browsers on both desktop and mobile devices. A dedicated mobile app is on our roadmap for future development.'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Initialize AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }

    // Initialize FAQ toggle functionality
    setTimeout(() => {
      this.initFaqToggle();
    }, 100);
  }

  // Navigate to service route
  navigateToService(route: string): void {
    this.router.navigate([route]);
  }

  // Handle FAQ toggle functionality
  initFaqToggle(): void {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
      const toggleIcon = item.querySelector('.faq-toggle');
      if (toggleIcon) {
        toggleIcon.addEventListener('click', () => {
          item.classList.toggle('faq-active');
        });
      }

      const question = item.querySelector('h3');
      if (question) {
        question.addEventListener('click', () => {
          item.classList.toggle('faq-active');
        });
      }
    });
  }
}