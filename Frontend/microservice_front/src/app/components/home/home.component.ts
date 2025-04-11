import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // Icon Boxes in Hero Section
  iconBoxes = [
    {
      icon: 'bi-easel',
      title: 'Lorem Ipsum'
    },
    {
      icon: 'bi-gem',
      title: 'Sed ut perspiciatis'
    },
    {
      icon: 'bi-geo-alt',
      title: 'Magni Dolores'
    },
    {
      icon: 'bi-command',
      title: 'Nemo Enim'
    }
  ];

  // Features Section
  features = [
    {
      title: 'Eos aspernatur rem'
    },
    {
      title: 'Facilis neque ipsa'
    },
    {
      title: 'Volup amet volupt'
    },
    {
      title: 'Rerum omnis sint'
    },
    {
      title: 'Alias possimus'
    },
    {
      title: 'Repellendus molli'
    }
  ];

  // Services Section
  services = [
    {
      icon: 'bi-activity',
      title: 'Nesciunt Mete',
      description: 'Provident nihil minus qui consequatur non omnis maiores. Eos accusantium minus dolores iure perferendis tempore et consequatur.',
      delay: 100
    },
    {
      icon: 'bi-broadcast',
      title: 'Eosle Commodi',
      description: 'Ut autem aut autem non a. Sint sint sit facilis nam iusto sint. Libero corrupti neque eum hic non ut nesciunt dolorem.',
      delay: 200
    },
    {
      icon: 'bi-easel',
      title: 'Ledo Markt',
      description: 'Ut excepturi voluptatem nisi sed. Quidem fuga consequatur. Minus ea aut. Vel qui id voluptas adipisci eos earum corrupti.',
      delay: 300
    },
    {
      icon: 'bi-bounding-box-circles',
      title: 'Asperiores Commodit',
      description: 'Non et temporibus minus omnis sed dolor esse consequatur. Cupiditate sed error ea fuga sit provident adipisci neque.',
      delay: 400
    },
    {
      icon: 'bi-calendar4-week',
      title: 'Velit Doloremque',
      description: 'Cumque et suscipit saepe. Est maiores autem enim facilis ut aut ipsam corporis aut. Sed animi at autem alias eius labore.',
      delay: 500
    },
    {
      icon: 'bi-chat-square-text',
      title: 'Dolori Architecto',
      description: 'Hic molestias ea quibusdam eos. Fugiat enim doloremque aut neque non et debitis iure. Corrupti recusandae ducimus enim.',
      delay: 600
    }
  ];

  // Pricing Plans
  pricingPlans = [
    {
      name: 'Free Plan',
      price: '0',
      color: '#20c997',
      icon: 'bi-box',
      featured: false,
      features: [
        { text: 'Aida dere', included: true },
        { text: 'Nec feugiat nisl', included: true },
        { text: 'Nulla at volutpat dola', included: true },
        { text: 'Pharetra massa', included: false },
        { text: 'Massa ultricies mi', included: false }
      ]
    },
    {
      name: 'Starter Plan',
      price: '19',
      color: '#0dcaf0',
      icon: 'bi-send',
      featured: true,
      features: [
        { text: 'Aida dere', included: true },
        { text: 'Nec feugiat nisl', included: true },
        { text: 'Nulla at volutpat dola', included: true },
        { text: 'Pharetra massa', included: true },
        { text: 'Massa ultricies mi', included: false }
      ]
    },
    {
      name: 'Business Plan',
      price: '29',
      color: '#fd7e14',
      icon: 'bi-airplane',
      featured: false,
      features: [
        { text: 'Aida dere', included: true },
        { text: 'Nec feugiat nisl', included: true },
        { text: 'Nulla at volutpat dola', included: true },
        { text: 'Pharetra massa', included: true },
        { text: 'Massa ultricies mi', included: true }
      ]
    },
    {
      name: 'Ultimate Plan',
      price: '49',
      color: '#0d6efd',
      icon: 'bi-rocket',
      featured: false,
      features: [
        { text: 'Aida dere', included: true },
        { text: 'Nec feugiat nisl', included: true },
        { text: 'Nulla at volutpat dola', included: true },
        { text: 'Pharetra massa', included: true },
        { text: 'Massa ultricies mi', included: true }
      ]
    }
  ];

  // FAQ Section
  faqs = [
    {
      question: 'Non consectetur a erat nam at lectus urna duis?',
      answer: 'Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non.'
    },
    {
      question: 'Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque?',
      answer: 'Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.'
    },
    {
      question: 'Dolor sit amet consectetur adipiscing elit pellentesque?',
      answer: 'Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl suscipit. Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis convallis tellus. Urna molestie at elementum eu facilisis sed odio morbi quis'
    },
    {
      question: 'Ac odio tempor orci dapibus. Aliquam eleifend mi in nulla?',
      answer: 'Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.'
    },
    {
      question: 'Tempus quam pellentesque nec nam aliquam sem et tortor consequat?',
      answer: 'Molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim suspendisse in est ante in. Nunc vel risus commodo viverra maecenas accumsan. Sit amet nisl suscipit adipiscing bibendum est. Purus gravida quis blandit turpis cursus in'
    }
  ];

  constructor() { }

  ngOnInit(): void {
    // Initialize FAQ toggle functionality
    setTimeout(() => {
      this.initFaqToggle();
    }, 100);
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