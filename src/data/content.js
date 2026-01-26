// Portfolio Content Data - All content is centralized here for easy updates

export const profile = {
  name: "Parth Dhawan",
  tagline: "Designer based in Singapore 🇸🇬, driven by curiosity and a knack for building cool stuff. Designing isn't just my job—it's a lens through which I view everything.",
  rotatingText: "WORKING ON COOL STUFF | PRODUCT DESIGNER |",
  photo: "/assets/images/profile.jpg",
  resumeUrl: "https://drive.google.com/file/d/1AeOOZF99hU5Jc9nHtGxep4Mas_K_Ca41/view?usp=share_link"
};

export const experience = [
  {
    title: "Team Lead",
    company: "Grab",
    period: "2024 - Present"
  },
  {
    title: "Lead Designer",
    company: "Grab",
    period: "2022 - 2024"
  },
  {
    title: "Senior Designer",
    company: "Agoda",
    period: "2019 - 2022"
  },
  {
    title: "Product Designer",
    company: "Flipkart",
    period: "2016 – 2019"
  },
  {
    title: "UX/UI Designer",
    company: "PepperTap",
    period: "2015 – 2016"
  }
];

export const caseStudies = [
  {
    id: "offerandmore",
    title: "Offers & More",
    company: "Grab",
    description: "A dedicated landing page for all offers, budget meals, free delivery and more.",
    thumbnail: "/assets/images/offers-thumbnail.png",
    slug: "/work/offerandmore",
    fullPresentationSlug: "/work/offers-and-more-details",
    role: "Lead Product Designer",
    year: "2024",
    context: "After the pandemic, as inflation rose, consumers in SEA prioritized affordability. Our NPS surveys consistently showed that despite our competitive pricing, GrabFood was perceived as 'not affordable.' This project was the first major step our team took toward making Grab more affordable by creating a solution that addresses various user intents and helps them find the right restaurant.",
    insights: {
      eater: [
        "Promos are not visible and accessible.",
        "Lowest promo discoverability compared to competitors.",
        "The definition of \"affordability\" varies based on age, income and culture."
      ],
      merchant: [
        "The promotions are barely affecting sales.",
        "As a result, fewer merchants are inclined to offer discounts.",
        "Merchants providing higher discounts don't receive special placement."
      ]
    },
    launch: {
      description: "By Q2 2024, we launched our first experiment of the new affordability-focused landing page with features like visual filters and the new Merchant listing. We observed the following results:",
      results: [
        "Tile CTR: 12.3%",
        "The majority of sessions (58%) involved clicking into a merchant, with ~15% of these clickthrough sessions leading to conversion.",
        "Both savings-conscious and price-conscious users showed higher conversion rates.",
        "Visual filters were selected 31.12% of the time."
      ]
    }
  },
  {
    id: "grouporders",
    title: "Group Orders Tiered Promos",
    company: "Grab",
    description: "A new, convenient way for big groups to order together and unlock bigger savings.",
    thumbnail: "/assets/images/grouporders-thumbnail.png",
    slug: "/work/grouporders",
    fullPresentationSlug: "/work/group-orders-tiered-promos",
    role: "Lead Product Designer",
    year: "2024",
    background: "Our affordability team was working on a project called Group Orders to make it easier for large groups to order food together and save money. During a critical development phase, the lead designer had to go on maternity leave. Recognising the project's extensive cross-functional dependencies and its impact, the team turned to me to steer this towards the finish line.",
    problem: [
      "One person has to take all the ownership.",
      "Pass their phone.",
      "Ask everyone for their preference.",
      "Pay for everyone and split the bill afterwards."
    ],
    solution: [
      "No more phone passing.",
      "No need to chase.",
      "Include automatic bill-splitting."
    ],
    results: {
      conversionRate: "~35%",
      orderPercentage: "1%",
      marginComparison: "6.4% vs 10.8%"
    }
  },
  {
    id: "trip-planning",
    title: "Cart & Trip Planning",
    company: "Agoda",
    description: "Building a one-stop-shop trip planning and booking experience on Agoda",
    thumbnail: "/assets/images/tripplanning-thumbnail.png",
    slug: "/work/trip-planning",
    fullPresentationSlug: "/Cart",
    role: "Senior Product Designer",
    year: "2021",
    overview: "Agoda is a Southeast Asian online travel marketplace owned by the Booking Holdings group. As of June 2021, Agoda lists 2.5 million properties worldwide. After 15 years of listing and selling hotels, the company expanded into other areas, such as flights, vacation rentals, and activities.",
    businessReasons: [
      "Retain customers by providing everything on a single platform",
      "Allow for more significant discounts for repeat customers",
      "Offer pre-made travel packages"
    ],
    approach: "I favored the second approach (research-led, long-term vision) for the reasons: As Agoda has majorly been a hotel listing platform, we never really researched how people plan their overall trip. Not forming any long-term vision can lead to unanticipated scalability problems.",
    learnings: [
      "Taking a long-term perspective really helped in aligning all stakeholders on a common direction.",
      "Research was extremely helpful in understanding the travelers' pain points.",
      "Moving quickly and involving developers early in the design process allowed us to gain early insights."
    ]
  }
];

export const services = [
  {
    title: "Mobile/Web Designs",
    description: "Crafting intuitive and engaging designs for both mobile and web platforms."
  },
  {
    title: "Design Consultation",
    description: "Providing expert advice to enhance your product's design and user experience."
  },
  {
    title: "Mentorship",
    description: "Guiding aspiring designers to develop their skills and reach their full potential."
  }
];

export const socialLinks = [
  {
    platform: "twitter",
    handle: "@wwheisenbergeth",
    url: "https://x.com/wwheisenbergeth",
    icon: "twitter"
  },
  {
    platform: "instagram",
    handle: "@parth_dhawan",
    url: "https://www.instagram.com/parth_dhawan/",
    icon: "instagram"
  },
  {
    platform: "email",
    handle: "parthdhawan28",
    url: "mailto:parthdhawan28@gmail.com",
    icon: "email"
  }
];

export const additionalLinks = [
  {
    title: "Talk to my AI assistant",
    url: "/chat",
    icon: "ai"
  },
  {
    title: "FREE | Icon set",
    url: "https://www.figma.com/community/file/1275092859040896934/free-editable-icon-set-with-animations",
    icon: "figma"
  }
];

export const readingList = {
  title: "Reading list",
  url: "/Readinglist",
  featuredBook: {
    title: "The Fabric of Reality",
    author: "David Deutsch",
    cover: "/assets/images/fabric-of-reality.jpg"
  }
};
