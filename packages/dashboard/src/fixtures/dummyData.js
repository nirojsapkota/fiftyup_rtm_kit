export const dummyData = {
  dashboardBanner: {
    content: 'This is a text only',
    link: '',
  },
  news: [],
  survey: {
    url: 'https://api.staging.fiftyupclub.com/survey',
    title: '',
    description: "##### What type of offers are you most interested in?\r\n(select all that apply)",
    "cta_label": "See the offers",
    "skip_label": "Skip this step",
    "email": "user24@email.com",
    "productSelection": {
      "label": "",
      "name": "products",
      "type": "checkbox",
      "component": "panelCheck",
      "options": [
        {
          "label": "ENERGY",
          "value": "energy",
          "icon": "energy"
        },
        {
          "label": "HEALTH INSURANCE",
          "value": "health insurance",
          "icon": "health"
        },
        {
          "label": "LIFE INSURANCE",
          "value": "life insurance",
          "icon": "life"
        },
        {
          "label": "HOME",
          "value": "energy1",
          "icon": "home-2"
        },
        {
          "label": "INTERNET",
          "value": "energy2",
          "icon": "internet"
        },
        {
          "label": "CAR INSURANCE",
          "value": "car insurance",
          "icon": "car"
        }
      ]
    }
  },
  campaigns: [
    {
      id: 1,
      image: 'https://placehold.it/720x380',
      headerText: 'HEADER',
      descriptionText: 'Description text one',
      flagText: 'Flag Text',
      isFeatured: true,
      joined: true,
      ctaText: 'See Offer',
      canJoinMultipleTimes: false,
      ctaLink: 'https://google.com',
      titleText: 'Title Text',
    },
    {
      id: 2,
      image: 'https://placehold.it/720x380',
      headerText: 'HEADER',
      descriptionText: 'Description text two',
      flagText: 'Flag Text',
      isFeatured: false,
      joined: true,
      ctaText: 'See Offer',
      canJoinMultipleTimes: false,
      ctaLink: 'https://google.com',
      titleText: 'Title Text',
    },
    {
      id: 3,
      image: 'https://placehold.it/720x380',
      headerText: 'HEADER',
      descriptionText: 'Description text three',
      flagText: 'Flag Text',
      isFeatured: false,
      joined: false,
      ctaText: 'See Offer',
      canJoinMultipleTimes: false,
      ctaLink: 'https://google.com',
      titleText: 'Title Text',
    },
    {
      id: 4,
      image: 'https://placehold.it/720x380',
      headerText: 'HEADER',
      descriptionText: 'Description text four',
      flagText: 'Flag Text',
      isFeatured: false,
      joined: false,
      ctaText: 'See Offer',
      canJoinMultipleTimes: false,
      ctaLink: 'https://google.com',
      titleText: 'Title Text',
    },
    {
      id: 5,
      image: 'https://placehold.it/720x380',
      headerText: 'HEADER',
      descriptionText: 'Description text five',
      flagText: 'Flag Text',
      isFeatured: false,
      joined: false,
      ctaText: 'See Offer',
      canJoinMultipleTimes: false,
      ctaLink: 'https://google.com',
      titleText: 'Title Text',
    },
  ],
};
