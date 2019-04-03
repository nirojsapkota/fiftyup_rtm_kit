export const dummyData = {
    confirmHeaderProps: {
      icon: 'light-bulb-obs',
      confirmationHeader: '<ul><li>Review your plan below</li><li>Accept the terms and conditions</li><li>Click SWITCH NOW</li></ul>',
    
    },
    disclaimerProps: {
      title: 'Explicit Informed Consent of Offer:',
      items: [
        {
          type: 'confirm',
          body:
            'I understand and agree that I am entering into a M…    with the terms and conditions of my contract.',
          label: "Show the confirm",
        },
        {
          type: 'confirm',
          body:
            'I understand and agree that I am entering into a M…    with the terms and conditions of my contract.',
          label: "",
        },
      ],
    },
    planDetailsProps: {
      header: 'You have selected this offer:',
      merchantLogo:
        'https://d235f2imj5gfpf.cloudfront.net/merchants/44/logo/deal.png?1369355035',
      plan: {
        electricity_brief:
          '42% pay on time discount off Click Energy’s electricity usage & supply standing rate',
        gas_brief:
          '18% pay on time discount off Click Energy’s natural gas usage & supply standing rate',
      },
    },
  
    confirmActionProps: {
      agreementItems: [
        {
          type: 'confirm',
          body:
            'I understand and agree that I am entering into a M…    with the terms and conditions of my contract.',
          label: null,
        },
        {
          type: 'confirm',
          body:
            'I understand and agree that I am entering into a M…    with the terms and conditions of my contract.',
          label: null,
        },
      ],
      
    },
  };
  