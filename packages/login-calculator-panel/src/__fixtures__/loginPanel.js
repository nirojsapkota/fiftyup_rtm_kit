/* istanbul ignore file */

const loginPanel = {
  title:
    'Join One Big Switch today for FREE and instantly unlock your special offers!',
  authenticityToken:
    'I7t3w13syZv9gWaz0kbQA3fL6NqrhwiZlfIt9HixtbKNZIy5nsB36XE8eQHC+AtA5lT2p7Kt182TIrUDgSZ+gw==',
  hiddenFields: {
    registering_campaign_id: 276,
    jump_path: '/campaigns/OBS_BES_2017_Offers',
  },
  loginUrl: '/guest_sessions',
  autocompletePostcodeUrl: '/suburbs/autocomplete_postcode',
  buttonText: 'Get quote',
  gdprProps: {
    enableCheckBox: false,
    isRequire: 'required',
    isChecked: false,
    getCheckBoxValue: null,
    content:
      'By ticking this box, you agree to our [Confirmation of Consent](https://staging.onebigswitch.com.au/confirmation-of-consent),\
      [Terms and Conditions](https://staging.onebigswitch.com.au/terms-and-conditions) and \
      [Privacy Policy](https://staging.onebigswitch.com.au/privacy-policy)',
  },
  buttonIcon: 'view-forward',
  stateField: {
    fieldName: 'postcode_suburb',
    validator: 'postcode',
    errorValue: 'postcode',
  },
  calculatorProps: {
    showQuoteCalculator: true,
    quoteTitle:
      'Join One Big Switch today for FREE and instantly unlock your special offers!',
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
    campaignId: 1,
    callbackUrl: '/temp_REPLACE_ME',
    formSubmitButtonText: 'Get Quote',
    thankyouHeader: '# Thank you',
    thankyouBody: 'See below for more offers',
  },
  // REMOVE_BEFORE_PRODUCTION_IS_SUBMITTED: true,
  mainHeading: 'Hello',
  //isDevelopment: true,
  buttons: [
    { text: 'Morning', value: '800' },
    { text: 'Afternoon', value: '1200' },
    { text: 'Evening', value: '1800' },
  ],
};

export default loginPanel;
