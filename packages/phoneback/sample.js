export default {
  form: {
    id: 'callback',
    onSubmit: async values => values,
    fields: [
      {
        label: 'My Email:',
        name: 'email',
        type: 'text',
        config: {
          validator: 'email',
        },
      },
      {
        label: 'Phone Number:',
        hint: 'AU numbers only',
        name: 'phone_number',
        type: 'tel',
        config: {
          mask: 'phoneAU',
          validator: 'mask',
          validatorArgs: ['phoneAU', 'Phone Number'],
        },
      },
    ],
  },
  text: {
    talkToUsText: 'Talk to a People Power Loans home loan expert',
    businessPhone: '1300 679 767',
    businessHours: 'Mon-Fri: 8.30am-5.30pm (AEST)',
    requestButtonText: 'Request a callback',
    requestButtonIcon: 'view-forward',
    header:
      'To talk to People Power Loans home loan expert request an obligation free call back:',
    thankYou: 'Thank you for requesting a call back.',
    message:
      'To see current offers and campaigns in your area visit your One Big Switch Dashboard',
    thankYouLink: '/',
    thankYouButtonText: 'Visit Dashboard',
    submitText: 'Call me back',
    disclaimer:
      'By clicking &quot;Call Me Back&quot; you agree to our <a href=&quot;/confirmation-of-consent&quot;>Confirmation of Consent</a>, <a href=&quot;/terms-and-conditions&quot;>Terms and Conditions</a> and <a href=&quot;/privacy-policy&quot;>Privacy Policy</a>',
    scrollToForm: 'Or click here to calculate how much you could save',
  },
};
