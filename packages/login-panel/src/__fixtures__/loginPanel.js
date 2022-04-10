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
  buttonText: 'See the offers',
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
      [Privacy Policy](https://staging.onebigswitch.com.au/privacy-policy) \
      \n \
      <div class="trustpilot-widget" data-businessunit-id="5fc0711c5c55e80001f365ce" data-locale="en-AU" data-style-height="40px" data-style-width="100%" data-template-id="5419b6ffb0d04a076446a9af" data-theme="light"><a href="https://au.trustpilot.com/review/onebigswitch.com.au" rel="noopener" target="_blank">Trustpilot</a></div>',
  },
  buttonIcon: 'view-forward',
  stateField: {
    fieldName: 'postcode_suburb',
    validator: 'postcode',
    errorValue: 'postcode',
  },
  // showFullNameField: true,
  // showPhoneNumberField: true,
};

export default loginPanel;
