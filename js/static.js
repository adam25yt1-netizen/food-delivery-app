// ── static.js ── All static pages rendered via JavaScript DOM
// Page content defined as data objects — JS builds the DOM from them

const staticPages = {
  'about.html': {
    title: 'About Crave',
    sections: [
      { type: 'p', text: 'At Crave, we believe that great food brings people together. Founded in 2024, our mission is to connect local communities with the incredible culinary talent in their area.' },
      { type: 'h2', text: 'Team Members' },
      { type: 'list', items: ['Manav — Roll No: 2511981148 | Contact: 9999999999', 'Harsh — Roll No: 2511981096 | Contact: 1111111111'] },
      { type: 'h2', text: 'Contact Us' },
      { type: 'p', text: 'Email us at: crave@gmail.com' },
    ]
  },
  'blog.html': {
    title: 'Crave Blog',
    sections: [
      { type: 'card', heading: 'The Top 10 Sushi Spots', text: 'Discover the freshest fish and most creative rolls in your city...' },
      { type: 'card', heading: 'How We Deliver Faster', text: 'A look into the technology that powers our 20-minute delivery guarantee...' },
      { type: 'card', heading: 'Best Burgers in Town', text: 'We ranked 50 local burger joints so you don\'t have to...' },
    ]
  },
  'offers.html': {
    title: 'Special Offers',
    sections: [
      { type: 'offerBanner', heading: '50% Off Your First Order!', text: 'Use code CRAVE50 at checkout. New users only.' },
      { type: 'card', heading: 'Free Delivery Fridays', text: 'Every Friday, enjoy free delivery on all orders over $15.' },
      { type: 'card', heading: 'Happy Hour 3–6 PM', text: 'Get 20% off selected restaurants during happy hour.' },
      { type: 'card', heading: 'Refer a Friend', text: 'Earn $10 credit for every friend you refer to Crave.' },
    ]
  },
  'help.html': {
    title: 'Help Center',
    sections: [
      { type: 'card', heading: 'Where is my order?', text: 'Track your order in real-time by checking your tracking page, or look in your email for the tracking link.' },
      { type: 'card', heading: 'How do I cancel my order?', text: 'Orders can only be cancelled before the restaurant begins preparing. Please contact support immediately.' },
      { type: 'card', heading: 'What if my food arrives cold?', text: 'We\'re sorry! Please contact support within 30 minutes and we\'ll make it right.' },
    ]
  },
  'terms.html': {
    title: 'Terms of Service',
    sections: [
      { type: 'p', text: 'Last updated: October 2024' },
      { type: 'h2', text: '1. Acceptance of Terms' },
      { type: 'p', text: 'By accessing and using Crave, you agree to be bound by these Terms of Service.' },
      { type: 'h2', text: '2. User Accounts' },
      { type: 'p', text: 'You must maintain the security of your account and promptly notify us if you discover any security breaches.' },
    ]
  },
  'privacy.html': {
    title: 'Privacy Policy',
    sections: [
      { type: 'p', text: 'Last updated: October 2024' },
      { type: 'h2', text: '1. Information We Collect' },
      { type: 'p', text: 'We collect information you provide directly to us, such as your name, email address, delivery address, and payment information.' },
      { type: 'h2', text: '2. How We Use Your Information' },
      { type: 'p', text: 'We use the information we collect to deliver your food, process payments, and improve our services.' },
    ]
  },
  'careers.html': {
    title: 'Careers at Crave',
    sections: [
      { type: 'p', text: 'Join our team of passionate foodies, engineers, and operators to build the future of food delivery.' },
      { type: 'card', heading: 'Senior Frontend Engineer', text: 'Remote · Full-time' },
      { type: 'card', heading: 'Delivery Partner', text: 'Flexible hours · All cities' },
      { type: 'card', heading: 'Restaurant Relations Manager', text: 'On-site · Multiple locations' },
    ]
  },
};

function initStaticPage() {
  const main     = document.getElementById('main-content');
  const filename = window.location.pathname.split('/').pop() || 'index.html';
  const pageData = staticPages[filename];

  if (!pageData) return;

  // Set page title
  document.title = pageData.title + ' | Crave';

  const container = document.createElement('div');
  container.className = 'staticPage';

  // Page heading — set via JavaScript textContent
  const h1 = document.createElement('h1');
  h1.textContent = pageData.title;
  container.appendChild(h1);

  // Build content from sections array using DOM
  pageData.sections.forEach(section => {
    if (section.type === 'p') {
      const p = document.createElement('p');
      p.textContent = section.text;
      container.appendChild(p);

    } else if (section.type === 'h2') {
      const h2 = document.createElement('h2');
      h2.textContent = section.text;
      container.appendChild(h2);

    } else if (section.type === 'list') {
      const ul = document.createElement('ul');
      section.items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ul.appendChild(li);
      });
      container.appendChild(ul);

    } else if (section.type === 'card') {
      const card = document.createElement('div');
      card.className = 'glassCard';
      const h3 = document.createElement('h3');
      h3.textContent = section.heading;
      const p = document.createElement('p');
      p.textContent = section.text;
      card.appendChild(h3);
      card.appendChild(p);
      container.appendChild(card);

    } else if (section.type === 'offerBanner') {
      const banner = document.createElement('div');
      banner.className = 'offersBanner';
      const h2 = document.createElement('h2');
      h2.textContent = section.heading;
      const p = document.createElement('p');
      p.textContent = section.text;
      banner.appendChild(h2);
      banner.appendChild(p);
      container.appendChild(banner);
    }
  });

  main.appendChild(container);
}

document.addEventListener('DOMContentLoaded', initStaticPage);
