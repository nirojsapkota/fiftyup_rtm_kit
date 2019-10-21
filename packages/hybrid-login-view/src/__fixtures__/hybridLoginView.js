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

  rightSideMarkDownContent: {
    header: '##### Free Text Heading',
    body: `
Lorem ipsum dolor sit amet, consectetur /n/n adipiscing elit.

Ut id efficitur enim. Phasellus vitae risus a urna dignissim pellentesque pulvinar quis arcu. Vivamus ac metus ultrices, consequat magna nec, malesuada lectus. Aenean quis nibh diam. Vivamus et erat mauris. Vivamus eget fermentum justo, in sollicitudin mauris. Proin suscipit lacus id elementum finibus`
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
};

export default hybridLoginView;
