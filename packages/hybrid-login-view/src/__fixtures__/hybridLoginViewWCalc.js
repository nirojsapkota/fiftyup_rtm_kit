const hybridLoginViewWCalc = {
  title: 'Get a Quick Quote now!',
  authenticityToken:
    'I7t3w13syZv9gWaz0kbQA3fL6NqrhwiZlfIt9HixtbKNZIy5nsB36XE8eQHC+AtA5lT2p7Kt182TIrUDgSZ+gw==',
  hiddenFields: {
    registering_campaign_id: 276,
    jump_path: '/campaigns/OBS_BES_2017_Offers',
  },
  loginUrl: '/guest_sessions',
  autocompletePostcodeUrl: '/suburbs/autocomplete_postcode',
  heroImageUrlDesktopUrl: 'https://placehold.it/2080x400',
  heroImageUrlTabletUrl: 'https://placehold.it/990x400',
  heroImageUrlMobileUrl: 'https://placehold.it/700x400',
  mainHeading: 'I am a main heading',
  videoSrc: 'https://www.youtube.com/embed/_NDxJucqwiQ1',
  asSeenOnImage: 'https://placehold.it/1080x100',
  mainContent: 'I am main content',
  entity: {
    brand: 'obs',
    facebook_pixel_id: '2222222',
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

  lifeInsuranceCalcProps: {
    quoteTitle:
      'Join One Big Switch today for FREE and instantly unlock your special offers!',

    showQuoteCalculator: true,
    quoteText:
      'An insurance team member will call you back in a day or so. You can change the details below if you wish to explore other quotes or levels of cover.',
    getQuoteDisclaimerTextHtml:
      'By clicking on Get Quote you confirm you have read our <a target="_blank" href="https://onebigswitch.com.au/privacy-policy">Privacy Policy</a> and that you would like to be contacted by NobleOak regarding Life Insurance. Your information entered here will also be provided to NobleOak so please read their privacy policy <a target="_blank" href="https://www.nobleoak.com.au/privacy-policy/">here</a>.',
    percentDiscount: 0,
    discountText: 'Or Call:',
    phoneNumber: '1800-978-000',
    quoteHeaderText: 'Your Quote from NobleOak Life Insurance⁶',
    paymentCycleText: 'a month',
    timeToCallBackText: 'Best time to call you back?',
    seeMoreOfferText: 'See more offers',
    campaignId: 0,
    callbackUrl: '/temp_REPLACE_ME',
    thankyouHeader: '# Thank you',
    thankyouBody: 'See below for more offers',
  },
  gdprProps: {
    enableCheckBox: true,
    isRequire: 'required',
    isChecked: false,
    getCheckBoxValue: function(e) {
      console.log('checkbox: ', e);
    },
    content:
      'By ticking this box, you agree to our [Confirmation of Consent](https://staging.onebigswitch.com.au/confirmation-of-consent),\
      [Terms and Conditions](https://staging.onebigswitch.com.au/terms-and-conditions) and \
      [Privacy Policy](https://staging.onebigswitch.com.au/privacy-policy)',
  },
  isDevelopment: true,
  buttonText: 'Get Quote',
};

export default hybridLoginViewWCalc;
