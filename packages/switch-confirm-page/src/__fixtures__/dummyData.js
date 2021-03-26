export const dummyData = {
  completeUrl: '#',
  editUrl: '#',
  switchButtonText: 'Switch Now',
  switchButtonId: 'btn-submit',
  switchBackButtonText: 'Back',
  confirmationHeaderIcon: 'light-bulb-obs',
  authenticityToken: '252n2h5fosfsnlr9252h9s0a8fv8',
  switchId: 1234,
  switchType: 'energy',
  uploadUrl: 'https://dh64wdls9d.execute-api.ap-southeast-2.amazonaws.com/prod/uploadImag',
  entity: {
    brand: 'obs',
    footer_items: {},
    header_items: {},
  },
  accordion: {
    footNote: {
      type: 'text',
      value: 'Footnote for every accordion',
    },
    items: [
      {
        name: 'Confirm and agreements',
        content:
          'Kwh: {{avg_kwh}} came from the references. Content for confirm and agreements Lorem ipsum dolor sit amet, [link](https://example.com) consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      },
      {
        name: 'Terms',
        content:
          '::: scale:1.5, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      },
      {
        name: 'Pricing',
        content:
          'Offer id: {{offer_id}} came from the references. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      },
    ],
  },
  reviewDetail: {
    header: 'Your Plan Details',
    body: [
      { title: 'Contact Name', value: 'Department ' },
      { title: 'Phone No', value: '0909887778' },
      { title: 'First Name', value: 'Anh Quoc' },
      { title: 'Last Name', value: 'Tong' },
      { title: 'Age', value: '13' },
      { title: 'Merchant name', value: 'Alinta' },
    ],
  },

  merchant: {
    logoUrl:
      'https://obs-development.s3.amazonaws.com/merchants/655/logo/original.png?1369354263',
    name: 'Simply Energy',
  },

  confirmationHeader:
    '<ul><li>Review your plan below</li><li>Accept the terms and conditions</li><li>Click SWITCH NOW</li></ul>',

  disclaimers: [
    {
      type: 'confirm',
      body: 'I understand and agree that I am entering.',
      label: null,
      name: 'first'
    },
    {
      type: 'confirm',
      body: 'Welcome to react. this is a content of disclaimer box Yes, I agree lorem Welcome to react. this is a content of this is a content of disclaimer this is a content of this is a content of disclaimer this is a content of this is a content of disclaimer this is a content of this is a content of disclaimer this is a content of this is a content of disclaimer box and Welcome to react. this is a content of disclaimer box Yes, I agree lorem Welcome to react. this is a content of this is a content of disclaimer box and Welcome to react. this is a content of disclaimer box Yes, I agree lorem Welcome to react. this is a content of this is a content of disclaimer box and Welcome to react. this is a content of disclaimer box Yes, I agree lorem Welcome to react. this is a content of this is a content of disclaimer box and Welcome to react. this is a content of disclaimer box',
      label: 'Yes, I agree lorem Welcome to react.',
      optional: false,
      name: 'second'
    },
    {
      type: 'confirm',
      body: 'I understand and agree that I am entering.',
      label: 'Yes, I agree',
      optional: true,
      name: 'third'
    },
  ],
  planDetails: {
    header: '##### Plan detail header',
    plan: {
      electricity_brief:
        '42% pay on time discount off Click Energy’s electricity usage & supply standing rate',
      gas_brief:
        '18% pay on time discount off Click Energy’s natural gas usage & supply standing rate',
    },
  },
  references: {
    offer_id: 11111,
    avg_kwh: '3900',
  },
};
