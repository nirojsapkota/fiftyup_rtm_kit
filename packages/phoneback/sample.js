export default {
  form: {
    id: 'callback',
    onSubmit: async values => values,
    onSuccess: values => values,
    fields: [
      {
        label: 'First Name:',
        name: 'first_name',
        type: 'text',
        config: {
          validator: 'required',
        },
      },
      {
        label: 'Last Name:',
        name: 'last_name',
        type: 'text',
        config: {
          validator: 'required',
        },
      },
      {
        label: 'Phone Number:',
        hint: '# Enter 10 digit phone number without spaces',
        name: 'phone',
        type: 'tel',
        config: {
          mask: 'phoneAU',
          validator: 'mask',
          validatorArgs: ['phoneAU', 'Phone Number'],
        },
      },
    ],
  },
  talkToUsText: 'Talk to a People Power Loans home loan expert',
  businessPhone: '1300 679 767',
  businessHours: 'Mon-Fri: 8.30am-5.30pm (AEST)',
  requestButtonText: 'Request a callback',
  requestButtonIcon: 'view-forward',
  header:
    'To talk to People Power Loans home loan expert request an obligation free call back:',
  extraMessage: 'Or Speak to a Health Insurance expert on 1800 444 423',
  submitText: 'Call me back',
  disclaimer:
    'By clicking &quot;Call Me Back&quot; you agree to our [Confirmation of Consent](/confirmation-of-consent), [Terms and Conditions](/terms-and-conditions) and [Privacy Policy](/privacy-policy)',
  scrollToForm: 'Or click here to calculate how much you could save',
  thankYouProps: {
    header: 'Thank you for requesting a call back.',
    message:
      'To see current offers and campaigns in your area visit your One Big Switch Dashboard',
    link: '/',
    buttonText: 'Visit Dashboard',
  },
};
