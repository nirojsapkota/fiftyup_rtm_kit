import { about } from './about.md.js';
import { faq } from './faq.md.js';
import { tnc } from './tnc.md.js';
import { electricity } from './electricity.md.js';

export const actions = {
  get_started: {
    header: 'Get started',
    cta: 'Get Started',
    track: 'get_started',
    link: 'http://localhost/get_started_action',
  },
  click_to_call: {
    track: 'click_to_call',
    header: '',
    footer: '<p>Open 9:30am - 6pm, Mon - Fri</p>\r\n',
    link: '08 8115 9415',
  },
  back: {
    actionType: 'back',
    cta: 'Prev',
    link: '#screen-1',
  },
};

const planInput = {
  entity: { name: 'One Big Switch' },
  reference: {
    gas_distributor: 'Jemena Gas Networks',
    state: 'NSW',
  },
  plan: {
    id: 3227,
    main_header_text: 'first header text',
    sub_header_text: 'second sub header text',
    disclaimer_html: '## Here are some disclaimers',
    campaign_id: 276,
    main_image_file_url:
      'https://obs-development.s3.amazonaws.com/energy_plans/3227/main_image.jpeg?1554889449',
    mobile_image_file_url:
      'https://obs-development.s3.amazonaws.com/energy_plans/3227/main_image.jpeg?1554889449',
    plan_features: [
      {
        icon: null,
        body: '### This is some markdown! \n And here is some more',
      },
    ],
    accordion: [
      {
        name: 'About This Provider',
        content: about,
      },
      {
        name: 'Terms & Conditions',
        content: tnc,
      },
      {
        name: 'FAQs',
        content: faq,
      },
      {
        name: 'Electricity Rates Tables',
        content: electricity,
      },
      {
        name: 'Gas Rates Tables',
        content:
          'Basic Plan Information Documents are information sheets that contain all the key details about a plan and are available here.  \r\n\r\n**{{gas_distributor}} Distribution Zone in {{state}}**  \r\n\r\nBasic Plan Document - [click here]({{gas_bpid}})\r\n',
      },
    ],
    merchant: {
      logoUrl: 'https://placehold.it/750x400',
      full_name: 'Alinta Energy',
    },
    tweet_text: 'tweet tweet tweet tweet tweet',
    disclaimers: [
      {
        body:
          '^Approximate quarterly gas costs for a medium household in the {{gas_distributor}} distribution area with a 35,000MJ peak/off-peak average usage over a 365 day period. Actual costs may differ.',
        kind: 'gas',
      },
      {
        body:
          'Residential customers only. Not available for all areas or property types. Terms and conditions apply.  \r\n\r\nAvailable for a limited time only.  You should check about any exit fees from your current retailer.  \r\n\r\nFiftyUp Club earns a fee for each customer that takes up the offer.\r\n\r\n',
        kind: 'general',
      },
    ],
    callbackFormProps: {
      agreementProps: {
        showAgreementCheckBox: false,
        agreementText: 'By clicking "Call Me Back" you agree to our&nbsp;',
        separator: ',&nbsp;',
        separatorLast: '&nbsp;and&nbsp;',
        agreements: [
          { link: '/about-us', text: 'Confirmation of Consent' },
          { link: '/terms-and-conditions', text: 'Terms and Conditions' },
          { link: '/privacy-policy', text: 'Privacy Policy' },
        ],
      },
    },
  },
  switch_facts: [],
  product_tips: [],
  testimonials: [
    {
      selfie:
        'https://obs-development.s3.amazonaws.com/testimonials/selfies/56.png?1451975050',
      body:
        'One Big Switch woke up the electricity suppliers who were complacent about customers... Thanks for giving the consumer a fair go on something so necessary!',
      author: 'Tina',
      align: 'right',
      bio: '',
    },
    {
      selfie:
        'https://obs-development.s3.amazonaws.com/testimonials/selfies/57.png?1451975050',
      body:
        "Can't believe I just went from a 3% saving to 22% WITH SAME PROVIDER!!!!",
      author: 'Rebekkah',
      align: 'right',
      bio: '',
    },
    {
      selfie:
        'https://obs-development.s3.amazonaws.com/testimonials/selfies/67.jpg?1498785414',
      body:
        'I moved my health insurance, mobile, home and motor insurance, and negotiated better power and gas. I estimate the savings at $280/mth or $3590 p.a.!',
      author: 'Leanne',
      align: 'right',
      bio: '',
    },
  ],
  actions: [actions.get_started, actions.click_to_call, actions.back],
  tracking_meta: {
    merchant_code: 'alinta',
    tracking_id: 3227,
    state: 'SA',
    plan_type: 'EG',
    is_solar: false,
    business_residential: 'residential',
    internal_external: 'internal',
  },
};

export default planInput;
