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
    header: 'Get in touch!',
    footer: '<p>Open 9:30am - 6pm, Mon - Fri</p>\r\n',
    link: '08 8115 9415',
  },
  back: {
    actionType: 'back',
    cta: 'Prev',
    link: '#screen-1',
  },
  request_call_back: {
    header: 'Sample header text',
    message: 'Or call Woolworths Insurance',
    cta: 'Request a Callback',
    track: 'request_call_back',
    link: 'http://localhost:3000/phonebacks',
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
    main_header_text: 'Main Header Text',
    sub_header_text: 'Sub Header Text',
    disclaimer_html:
      '<p><u>One Big Switch Disclaimers</u></p>\r\n\r\n<p>^ This is a One Big Switch analysis. Estimated potential savings figure is the possible saving in the 1st year for an average 4 person household in SA using 5,411kWH /year (sourced from https://www.energymadeeasy.gov.au/) and the state average for Gas (19,000MJ - sourced from Australian Gas Networks) that switches both bills from the average standing Electricity &amp; Gas offers of the 3 biggest energy retailers - Energy Australia, Origin and AGL. All usage assumed to be peak anytime. Last updated July, 2017.</p>\r\n\r\n<p>Offer available for a limited time only. You should check about any exit or cancellation fees from your current provider. One Big Switch earns a fee for each customer that takes up a Group-Discounted offer. These fees are shared with the media partners who provide the people power for the campaign to succeed.</p>\r\n\r\n<p><u>Alinta Energy Product Disclaimers</u></p>\r\n\r\n<p>Pay on Time Discount: 28% off electricity usage charges for each account you pay on time and in full. Rates are based on Alinta Energy&rsquo;s published Standing Tariffs for South Australia which are subject to change in accordance with applicable laws and may change during the 24 month benefit period.</p>\r\n\r\n<p>Pay on Time Discount: 12% off natural gas usage charges for each account you pay on time and in full. Rates are based on Alinta Energy&rsquo;s published Standing Tariffs for South Australia which are subject to change in accordance with applicable laws and may change during the defined benefit period.</p>\r\n\r\n<p>Defined Benefit Period: 24 months from the commencement date.</p>\r\n\r\n<p>Fair Deal 28 is solar compatible.</p>\r\n\r\n<p>This offer is not available to existing SA Alinta Energy customers. &nbsp;This offer is available to new residential customers who sign-up to Alinta Energy through One Big Switch. Offer available for a limited time only.&nbsp;Gas is only available to select areas in SA&nbsp;and only available when bundled with electricity. &nbsp;</p>\r\n',
    campaign_id: 276,
    main_image_file_url: 'https://placehold.it/950x400',
    mobile_image_file_url: 'https://placehold.it/300x400',
    multi_image_data: [
      {
        desktop_img: 'https://placeimg.com/600/500/any',
        mobile_img: 'https://placeimg.com/400/300/any'
      },
       {
        desktop_img: 'https://placeimg.com/600/500/any',
        mobile_img: 'https://placeimg.com/400/300/any'
      }
    ],
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
      logoUrl: 'https://placehold.it/300x200',
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
