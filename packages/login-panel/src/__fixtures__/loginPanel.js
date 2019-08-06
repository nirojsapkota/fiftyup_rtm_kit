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
    confirmationOfConsent: {
      url: '/confirmation-of-consent',
      text: 'Confirmation of Consent',
    },
    termsAndConditions: {
      url: '/terms-and-conditions',
      text: 'Terms and Conditions',
    },
    privacyPolicy: {
      url: '/privacy-policy',
      text: 'Privacy Policy',
    },
  },
  buttonIcon: 'view-forward',
  stateField: {
    fieldName: 'postcode_suburb',
    validator: 'postcode',
    errorValue: 'postcode',
  },
};

export default loginPanel;
