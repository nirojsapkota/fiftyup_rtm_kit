const hybridLoginView = {
  title: 'Login panel title',
  authenticityToken:
    'I7t3w13syZv9gWaz0kbQA3fL6NqrhwiZlfIt9HixtbKNZIy5nsB36XE8eQHC+AtA5lT2p7Kt182TIrUDgSZ+gw==',
  hiddenFields: {
    registering_campaign_id: 276,
    jump_path: '/campaigns/OBS_BES_2017_Offers',
  },
  loginUrl: '/guest_sessions',
  autocompletePostcodeUrl: '/suburbs/autocomplete_postcode',
  heroImageUrl: 'https://placehold.it/1080x454',
  mainHeading: 'I am a main heading',
  videoSrc: 'https://www.youtube.com/embed/_NDxJucqwiQ1',
  asSeenOnImage: 'https://placehold.it/1080x250',
  mainContent: "I am main content",
  entity: {
    brand: 'obs',
    navigation_items: {
      user: '',
      tagline: "I'm a tagline",
      signOutPath: "https://example.com",
      signInPath: "https://example.com",
      logo: "obs",
      items: [],
      subHeader: 'Subheader'
    },
    footer_items: {},
    header_items: {
      logo: "https://somelogo.com"
    },
  },
  stateField: {
    fieldName: 'postcode_suburb',
    validator: 'zipcode',
    errorValue: 'postcode',
  },

  rightSideMarkDownContent: {
    header: '##### Free Text Heading',
    body: `
Lorem ipsum dolor sit amet, consectetur /n/n adipiscing elit.

Ut id efficitur enim. Phasellus vitae risus a urna dignissim pellentesque pulvinar quis arcu. Vivamus ac metus ultrices, consequat magna nec, malesuada lectus. Aenean quis nibh diam. Vivamus et erat mauris. Vivamus eget fermentum justo, in sollicitudin mauris. Proin suscipit lacus id elementum finibus`,
  },

  accordion: [
    {
      id: 69,
      name: 'Accordion Header 1',
      content: 'Accordion content 1',
      sort_order: null,
      created_at: '2016-11-21T17:26:43.000+11:00',
      updated_at: '2017-06-29T14:37:01.000+10:00',
    },
    {
      id: 70,
      name: 'Accordion Header 2',
      content: 'Accordion content 2',
      sort_order: null,
      created_at: '2016-11-21T17:26:43.000+11:00',
      updated_at: '2017-06-29T14:37:01.000+10:00',
    },
  ],

  workflow: {
    header: "### How it Works",
    items: [
      {
        type: 'image',
        src: 'https://placehold.it/1080x250',
        content: 'https://placehold.it/1080x250',
      },
      {
        type: 'video',
        src: 'https://www.youtube.com/embed/_NDxJucqwiQ',
        content: 'One Big Switch Vid',
      },
      {
        type: 'markdown',
        content: '**Lorem ipsum**, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero\'s De Finibus Bonorum et Malorum for use in a type specimen book.',
      }
    ]
  },

  navLinks: [
    {
      id: 'mainHeading',
      label: "Heading",
      scrollTo: 'mainHeading',
      navbar: true,
    },
    {
      id: 'mainContent',
      label: "Content",
      scrollTo: 'mainContent',
      navbar: true,
    },
    {
      id: 'offerContent',
      label: "See Offer",
      scrollTo: 'offerContent',
      navbar: true,
    },
    {
      id: 'mediaContent',
      label: "How it works",
      scrollTo: 'mediaContent',
      navbar: true,
    }
  ]
};

export default hybridLoginView;
