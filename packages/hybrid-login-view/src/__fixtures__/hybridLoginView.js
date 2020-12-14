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
  heroImageUrlDesktopUrl: 'https://placehold.it/2080x400',
  heroImageUrlMobileUrl: 'https://placehold.it/700x400',
  mainHeading: 'I am a main heading',
  videoSrc: 'https://www.youtube.com/embed/_NDxJucqwiQ1',
  asSeenOnImage: 'https://placehold.it/1080x100',
  mainContent: 'I am main content',
  entity: {
    brand: 'obs',
    navigation_items: {
      user: '',
      tagline: "I'm a tagline",
      signOutPath: 'https://example.com',
      signInPath: 'https://example.com',
      logo: 'obs',
      items: [],
      subHeader: 'Subheader',
    },
    footer_items: {},
    header_items: {
      logo: 'https://somelogo.com',
    },
  },
  stateField: {
    fieldName: 'postcode_suburb',
    validator: 'zipcode',
    errorValue: 'postcode',
  },

  workflowOffer: {
    header: '##### Free Text Heading',
    items: [
      {
        type: 'image',
        src: 'https://placehold.it/1080x450',
        content: 'https://placehold.it/1080x450',
      },
      {
        type: 'video',
        src:
          'https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2F9SaverNews%2Fvideos%2F843213159512326%2F&show_text=0',
        content: 'One Big Switch Vid',
      },
      {
        type: 'markdown',
        content:
          'Lorem ipsum dolor sit amet, consectetur /n/n adipiscing elit.',
      },
    ],
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
    header: '### How it Works',
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
        content:
          "**Lorem ipsum**, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero's De Finibus Bonorum et Malorum for use in a type specimen book.",
      },
    ],
  },

  navLinks: [
    {
      id: 'mainHeading',
      label: 'Heading',
      scrollTo: 'mainHeading',
      navbar: true,
    },
    {
      id: 'mainContent',
      label: 'Content',
      scrollTo: 'mainContent',
      navbar: true,
    },
    {
      id: 'offerContent',
      label: 'See Offer',
      scrollTo: 'offerContent',
      navbar: true,
    },
    {
      id: 'mediaContent',
      label: 'How it works',
      scrollTo: 'mediaContent',
      navbar: true,
    },
  ],
};

export default hybridLoginView;
