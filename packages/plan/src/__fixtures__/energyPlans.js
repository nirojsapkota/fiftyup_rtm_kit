import { about } from './about.md.js';
import { faq } from './faq.md.js';
import { tnc } from './tnc.md.js';
import { electricity } from './electricity.md.js';
import { gas } from './gas.md.js';

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
  plan: {
    id: 3227,
    main_header_text: 'first header text',
    sub_header_text: 'second sub header text',
    disclaimer_html:
      '<p><u>One Big Switch Disclaimers</u></p>\r\n\r\n<p>^ This is a One Big Switch analysis. Estimated potential savings figure is the possible saving in the 1st year for an average 4 person household in SA using 5,411kWH /year (sourced from https://www.energymadeeasy.gov.au/) and the state average for Gas (19,000MJ - sourced from Australian Gas Networks) that switches both bills from the average standing Electricity &amp; Gas offers of the 3 biggest energy retailers - Energy Australia, Origin and AGL. All usage assumed to be peak anytime. Last updated July, 2017.</p>\r\n\r\n<p>Offer available for a limited time only. You should check about any exit or cancellation fees from your current provider. One Big Switch earns a fee for each customer that takes up a Group-Discounted offer. These fees are shared with the media partners who provide the people power for the campaign to succeed.</p>\r\n\r\n<p><u>Alinta Energy Product Disclaimers</u></p>\r\n\r\n<p>Pay on Time Discount: 28% off electricity usage charges for each account you pay on time and in full. Rates are based on Alinta Energy&rsquo;s published Standing Tariffs for South Australia which are subject to change in accordance with applicable laws and may change during the 24 month benefit period.</p>\r\n\r\n<p>Pay on Time Discount: 12% off natural gas usage charges for each account you pay on time and in full. Rates are based on Alinta Energy&rsquo;s published Standing Tariffs for South Australia which are subject to change in accordance with applicable laws and may change during the defined benefit period.</p>\r\n\r\n<p>Defined Benefit Period: 24 months from the commencement date.</p>\r\n\r\n<p>Fair Deal 28 is solar compatible.</p>\r\n\r\n<p>This offer is not available to existing SA Alinta Energy customers. &nbsp;This offer is available to new residential customers who sign-up to Alinta Energy through One Big Switch. Offer available for a limited time only.&nbsp;Gas is only available to select areas in SA&nbsp;and only available when bundled with electricity. &nbsp;</p>\r\n',
    campaign_id: 276,
    main_image_file_url:
      'https://obs-development.s3.amazonaws.com/energy_plans/3227/main_image.jpeg?1554889449',
    mobile_image_file_url:
      'https://obs-development.s3.amazonaws.com/energy_plans/3227/main_image.jpeg?1554889449',
    plan_features: [
      {
        icon: null,
        body: 
          '<style type="text/css">.features-container {\r\n  width: 90%;\r\n  margin-left: 5%;\r\n}\r\n\r\n.icon-column {\r\n  width: 15%;\r\n  display: inline;\r\n\r\n}\r\n\r\n.icon-column img {\r\n  vertical-align: middle;\r\n}\r\n\r\n.text-column {\r\n  width: 85%;\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  font-size: 18px;\r\n}\r\n\r\n@media only screen and (max-width: 479px) {\r\n  .text-column { width: 75%; }\r\n}\r\n\r\nhr {\r\n  margin: 5px 0 5px;\r\n}\r\n\r\nstrong {\r\n  font-weight: 900;\r\n}\r\n</style>\r\n<div class="features-container"><img alt="" src="https://s3-ap-southeast-2.amazonaws.com/digital-au/fiftyup/0-web/energy/201807-offers/SA-50up_Energy-JULY18.jpg" style="width: 100%;" />\r\n<div class="icon-column"><img alt="" src="https://s3-ap-southeast-2.amazonaws.com/digital-au/fiftyup/0-web/energy/icons/icon-lighbulb.png" style="width: 65px; height: 65px;" /></div>\r\n\r\n<div class="text-column"><span style="font-size:24px;"><strong>28% off your electricity usage charges</strong></span> based on Alinta Energy&#39;s published standing tariffs when you pay on time and in full</div>\r\n\r\n<hr />\r\n<div class="icon-column"><img alt="" src="https://s3-ap-southeast-2.amazonaws.com/digital-au/fiftyup/0-web/energy/icons/icon-paperpen.png" style="width: 65px; height: 65px;" /></div>\r\n\r\n<div class="text-column">NO exit fees, no lock in contracts</div>\r\n\r\n<div class="icon-column">&nbsp;</div>\r\n\r\n<hr />\r\n<div class="icon-column"><img alt="" src="https://s3-ap-southeast-2.amazonaws.com/digital-au/fiftyup/0-web/energy/icons/icon-dollararrow.png" style="width: 65px; height: 65px;" /></div>\r\n\r\n<div class="text-column">Flexible payment options</div>\r\n\r\n<hr />\r\n<div class="icon-column"><img alt="" src="https://s3-ap-southeast-2.amazonaws.com/digital-au/fiftyup/0-web/energy/icons/icon-phone.png" style="width: 65px; height: 65px;" /></div>\r\n\r\n<div class="text-column">More info? Click below for provider info and rates, or call <strong>08 8115 9493</strong></div>\r\n</div>\r\n',
      },
    ],
    accordion: [
      {
        name: 'lAbout This Provider',
        content: about
      },
      {
        name: 'Terms & Conditions',
        content: tnc
      },
      {
        name: 'FAQs',
        content: faq
      },
      {
        name: 'Electricity Rates Tables',
        content: electricity
      },
      {
        name: 'Gas Rates Tables',
        content: gas
      },
    ],
    merchant: {
      logoUrl:
        'https://obs-development.s3.amazonaws.com/merchants/655/logo/original.png?1369354263',
      full_name: 'Alinta Energy',
    },
    tweet_text: 'tweet tweet tweet tweet tweet',
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
