import { aboutProvider } from './about.md.js';

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
        name: 'About This Provider',
        content: aboutProvider
      },
      {
        name: 'Terms & Conditions',
        content:
          '<p><strong>Terms and Conditions</strong></p>\r\n\r\n<ol>\r\n\t<li>Alinta Energy&#39;s&nbsp;contract terms and the price and product information statement applicable to your supply will be provided to you shortly after the receipt of your application for supply. You should read this information carefully as it contains important details about your energy contract and Alinta Energy&#39;s&nbsp;respective rights and obligations.</li>\r\n\t<li>You have a right to cancel your energy contract within 10 business days from and including the first business day after you receive your energy contract and energy price fact sheet. Information about how to exercise this right will be provided with your energy contract.</li>\r\n\t<li>The discount stated in your plan only applies to the usage component of your bill and not the supply or other charges.</li>\r\n\t<li>This offer is solar compatible.</li>\r\n\t<li>Offer available to residential customers with supply premises in South Australia only. Eligibility criteria applies.</li>\r\n\t<li>You may be liable for additional charges such as connection, disconnection or special meter reading charges.</li>\r\n\t<li>You must pay your account in full by the due date indicated on the bill to be eligible for the discount stated in your chosen plan. If you do not pay a bill in full by the due date, the discount off usage charges will not apply for that bill period.</li>\r\n\t<li>Before the end of the 24 month benefit period Alinta Energy may offer you new benefits for an additional benefit period. You don&rsquo;t need to do anything to accept any offer of a new benefit. If you choose to reject Alinta Energy&#39;s&nbsp;offer by contacting us, or we choose not to offer you a new benefit, you will be required to pay Alinta Energy&#39;s&nbsp;published Standing Tariffs with no discount commencing from the expiry of the current benefit period.</li>\r\n\t<li>Energy Price Fact sheets can also be viewed at <a href="http://www.energymadeeasy.gov.au/" target="_blank">energymadeeasy.gov.au</a></li>\r\n</ol>\r\n\r\n<p><strong>Downloads</strong></p>\r\n\r\n<p>-&nbsp;<a href="https://customer.alintaenergy.com.au/AlintaCustomer/media/EnergyPlans/ALN_resiSME_national_MarketContractTC_20150520.pdf?ext=.pdf" target="_blank">National Energy Offer Booklet</a></p>\r\n\r\n<p>&nbsp;</p>\r\n',
      },
      {
        name: 'FAQs',
        content:
          '<p dir="ltr"><strong>I want more details on this offer, who can I speak to?</strong><br />\r\nFor more details of the offer, or to switch over the phone please call Alinta Energy on <strong>02 8448 0315</strong>.</p>\r\n\r\n<p><strong>Are Alinta Energy&rsquo;s plans solar compatible?</strong><br />\r\nYes, all Alinta Energy&rsquo;s plans are solar compatible.<br />\r\n<br />\r\n<strong>What are Alinta Energy&rsquo;s solar feed-in tariffs?</strong><br />\r\nUnlike other retailers, who bill you quarterly, Click charges you a minimum amount of $100 per month to smooth out the cost of your electricity. They then read your meter every three months and charge you a bit more or a bit less depending on whether you have used more or less than $100 of electricity per month.<br />\r\n<br />\r\n<strong>Will I continue to receive my government concession?</strong><br />\r\nAny Government concessions you are currently receiving can be transferred to Alinta Energy. Once you have received your first account from Alinta Energy, simply phone the Department of Communities and Social Inclusion (DCSI) Hotline Number 1800 307 758 (free call). Advise them of your electricity reference number and the billing period for your first Alinta Energy electricity bill. The concession for your first electricity account will be applied to your next account as a backdated concession.<br />\r\n<br />\r\n<strong>How does the Pay on Time discount work?</strong><br />\r\nTo eligible you must pay your Alinta Energy account in full by the due date indicated on the bill. It you do not pay the bill in full by the due day the discount will not be applied for that bill period and you will pay Alinta Energy&rsquo;s Standing Tariffs your applicable state.<br />\r\n<br />\r\n<strong>Is this offer available to renters?</strong><br />\r\nYes, this offer is available to renters as Alinta Energy&rsquo;s plans offer no lock-in contracts.<br />\r\n<br />\r\n<strong>How often do I receive my Alinta Energy bill?</strong><br />\r\nGenerally we&#39;ll send your Alinta Energy electricity bill approximately once every three months and your natural gas once every two months.<br />\r\n<br />\r\n<strong>What is the supply charge for?</strong><br />\r\nThe daily supply charge covers some of the fixed costs of supplying gas to your home or business, including the cost of installation and maintenance of pipelines, gas mains and gas meters.<br />\r\n<br />\r\n<strong>Can I get this offer for my business?</strong><br />\r\nNo, this Alinta Energy product is for residential consumers only.<br />\r\n<br />\r\n<strong>How long will it take for my energy supply with Alinta Energy to start?</strong><br />\r\nUpon sign-up you have a 10-business day cooling offer period during which time you can cancel your plan. The cooling-off period commences the first business day after you receive your Welcome Pack from Alinta Energy. Post the cooling offer period, the average numbers of days to transfer to Alinta Energy is approximately 38 days or at your next meter read. The benefits of your Alinta Energy plan will commence when you start being billed by Alinta Energy.<br />\r\n<br />\r\n<strong>Who do I contact if I have a problem with my supply or a power outage?</strong><br />\r\nCall Alinta Energy on <strong>133 702</strong> and select option 1 (24 hours, 7 days) or call the phone number listed on your electricity or gas account. It is important to note that nothing will change your local energy distributor will take care of any faults and emergencies. Your local energy distributor will remain responsible for repairs and maintenance of electricity lines and gas pipes and they will also continue to read your meter.<br />\r\n<br />\r\n<strong>What rates will the discounts are deducted from?</strong><br />\r\nRates are based on Alinta Energy&rsquo;s published Standing Tariffs for your state which are subject to change in accordance with applicable laws and may change during the defined benefit period.<br />\r\n<br />\r\n<strong>What if I have a complaint?</strong><br />\r\nAlinta Energy has a dispute resolution process in place. The process contains information on how Alinta Energy deals with any complaint and your rights, including referring any complaint to an ombudsman. Alinta Energy complies with the energy industry&rsquo;s marketing codes of conduct.<br />\r\n<br />\r\n<strong>What is Alinta Energy&rsquo;s Privacy Policy?</strong><br />\r\nAlinta Energy&rsquo;s Privacy Policy can be found on their site <a href="https://www.alintaenergy.com.au/about-us/policies/privacy-policy">www.alintaenergy.com.au/about-us/policies/privacy-policy</a></p>\r\n',
      },
      {
        name: 'Electricity Rates Tables',
        content:
          '<div><h3>Electricity Rates</h3><br /><p>These rates do not include the discount.</p>\r\n\r\n<p style="font-weight: bold;">The pricing applicable to your property is based upon the information you have provided to One Big Switch and assumptions about your distribution region, meter type and meter configuration.</p>\r\n\r\n<p>Please refer to your current energy bill if you are unsure about your meter set up. Alinta Energy does its best to ensure that this information is correct and complete. Alinta Energy will fully disclose your rates and other details of your energy plan in your offer booklet if you proceed to sign-up.</p>\r\n<br /><h3>Network Area: Adelaide STTM Hub</h3><p><a target="_blank" href="https://www.onebigswitch.com.au/rates_sheets/alinta/SA-GAS-PDS-FDG12-JUL2017.pdf">Rates, Alinta Energy - Adelaide STTM Hub - Electricity</a></p></div>',
      },
      {
        name: 'Gas Rates Tables',
        content:
          '<div><h3>Gas Rates</h3><br /><p>These rates do not include the discount.</p>\r\n\r\n<p style="font-weight: bold;">The pricing applicable to your property is based upon the information you have provided to One Big Switch and assumptions about your distribution region, meter type and meter configuration.</p>\r\n\r\n<p>Please refer to your current energy bill if you are unsure about your meter set up. Alinta Energy does its best to ensure that this information is correct and complete. Alinta Energy will fully disclose your rates and other details of your energy plan in your offer booklet if you proceed to sign-up.</p>\r\n<br /><h3>Network Area: Adelaide STTM Hub</h3><p><a target="_blank" href="https://www.onebigswitch.com.au/rates_sheets/alinta/SA-GAS-PDS-FDG12-JUL2017.pdf">Rates, Alinta Energy - Adelaide STTM Hub - Gas</a></p></div>',
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
