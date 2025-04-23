
// Testimonial data structure
export interface TestimonialItem {
  content: string;
  author: string;
  role: string;
  rating: number;
  imageSrc: string;
}

// List of testimonials
export const testimonialsList: TestimonialItem[] = [
  {
    content: "I honestly thought it was too good to be true, this is worth hundreds, if not thousands, for just $50 I got my first sale within 3 days. The store came with everything I needed design, product, supplier, strategy insane stuff.",
    author: "Kieran Flanagan",
    role: "CMO at Zapier",
    rating: 5,
    imageSrc: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
  },
  {
    content: "As a first-time founder with just an idea, Visionary Plans helped me validate my concept in less than a day. Their market analysis showed me exactly where to focus, and now my startup has gained its first 100 customers!",
    author: "Sarah Johnson",
    role: "Founder, TaskMaster",
    rating: 5,
    imageSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
  },
  {
    content: "I had zero business experience when I started. The consulting team guided me through market research and helped identify a niche that competitors overlooked. One month in, and I've already acquired my first paying customers!",
    author: "Michael Chen",
    role: "Founder, NutriTech",
    rating: 5,
    imageSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
  },
  {
    content: "Their business model validation saved my startup before we even launched. As a solo founder with limited resources, their pricing strategy recommendations helped me achieve profitability within the first six weeks!",
    author: "Emma Rodriguez",
    role: "Founder, StyleConnect",
    rating: 5,
    imageSrc: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
  },
  {
    content: "Starting with no industry connections, their competitor analysis revealed an underserved market segment perfect for my skills. Three months later, I've gone from idea to launching my MVP with 50 beta users!",
    author: "Olivia Thompson",
    role: "Founder, FitJourney",
    rating: 5,
    imageSrc: "https://images.unsplash.com/photo-1619895862022-09114b41f16f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
  },
  {
    content: "In just 48 hours, I went from a side-hustle idea to a solid business plan. Their consultants helped me identify my target audience and develop a marketing strategy that brought in my first 10 clients within weeks!",
    author: "James Wilson",
    role: "Founder, GreenLogistics",
    rating: 5,
    imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90oy1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80"
  }
];
