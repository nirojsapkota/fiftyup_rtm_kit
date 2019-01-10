import React from 'react';
// eslint-disable-next-line import/named
import {
  render,
  // eslint-disable-next-line import/named
  fireEvent,
  // eslint-disable-next-line import/named
  cleanup,
} from '../../../bootstrap/setup/testSetup';

import GdprAgreement from '../GdprAgreement';

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe(`<GdprAgreement/>`, () => {
  const props = {
    isChecked: false,
    required: 'required',
    confirmationOfConsent: {
      url: '/link/to/confirmation-of-consent',
      text: 'Confirmation of consent',
    },
    termsAndConditions: {
      url: '/link/to/term-and-conditions',
      text: 'Terms and Conditions',
    },
    privacyPolicy: {
      url: '/link/to/privacy-policy',
      text: 'Privacy Policy',
    },
  };

  it(`renders Gdpr Link confirmation`, () => {
    const { getByText } = render(<GdprAgreement {...props} />);
    const elConfirmationOfconcent = getByText(`Confirmation of consent,`);
    const elTermsCondition = getByText(`Terms and Conditions`);
    const elPrivacyPolicy = getByText(`Privacy Policy`);

    expect(elConfirmationOfconcent).toBeInTheDocument();
    expect(elConfirmationOfconcent.getAttribute(`href`)).toEqual(
      `/link/to/confirmation-of-consent`
    );
    expect(elTermsCondition).toBeInTheDocument();
    expect(elTermsCondition.getAttribute(`href`)).toEqual(
      `/link/to/term-and-conditions`
    );
    expect(elPrivacyPolicy).toBeInTheDocument();
    expect(elPrivacyPolicy.getAttribute(`href`)).toEqual(
      `/link/to/privacy-policy`
    );
  });

  it(`renders checkbox event tracking`, () => {
    const { container } = render(<GdprAgreement {...props} />);
    const chkbAgreement = container.querySelector(`[id="ckb_agreement"]`);

    fireEvent.click(chkbAgreement);
    expect(chkbAgreement.checked).toBe(true);
  });
});
