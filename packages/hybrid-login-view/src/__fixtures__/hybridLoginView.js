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
  entity: {
    brand: 'obs',
    footer_items: {},
    header_items: {},
  },
  stateField: {
    fieldName: 'postcode_suburb',
    validator: 'zipcode',
    errorValue: 'postcode',
  },
  howItWorksProps: {
    header:
      '##### One Big Switch takes the stress out of getting value on your household bills by doing the negotiating for you!',
    items: [
      {
        glyph: 'user-help',
        title: 'You join the movement for free',
      },
      {
        glyph: 'balance',
        title: 'We negotiate Group Discounts',
      },
      {
        glyph: 'hands-shake-2',
        title: 'You decide what’s right for you',
      },
    ],
  },
  whyJoinheader: '##### Why Join One Big Switch ? ',
  children: [
    {
      icon: 'build',
      size: 70,
      strokePrimary: 'primary',
      strokeSecondary: 'accent',
      fill: 'none',
      body: '1.06 miilion Australians have joined the movement since 2011',
    },
    {
      icon: 'bright-idea',
      size: 70,
      strokePrimary: 'primary',
      strokeSecondary: 'accent',
      fill: 'none',
      body:
        ' We have helped more than 300,000 households switch their Energy plan',
    },
    {
      icon: 'free-to-join',
      size: 70,
      strokePrimary: 'primary',
      strokeSecondary: 'accent',
      fill: 'none',
      body: 'Its free to join and its obligation-free',
    },
  ],
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
};

export default hybridLoginView;
