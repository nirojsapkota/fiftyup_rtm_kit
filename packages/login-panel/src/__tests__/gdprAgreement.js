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
    isShowCheckBox: true,
    checkBoxValue: false,
    isRequire: 'required',

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

  it('renders checkbox event tracking', () => {
    const { container } = render(<GdprAgreement {...props} />);
    const chkbAgreement = container.querySelector(`[id="ckb_agreement"]`);

    fireEvent.click(chkbAgreement);
    expect(chkbAgreement.checked).toBe(true);
  });

  it('get expected output with getCheckBoxValue func prop', async () => {
    const handleCheck = jest.fn();
    const defaultProps = {
      isShowCheckBox: true,
      checkBoxValue: false,
      isRequire: 'required',
      getCheckBoxValue: handleCheck,
    };
    const { container } = render(<GdprAgreement {...defaultProps} />);
    const chkbAgreement = container.querySelector(`[id="ckb_agreement"]`);

    fireEvent.click(chkbAgreement);
    expect(handleCheck).toHaveBeenCalledTimes(1);
    expect(chkbAgreement.checked).toBe(true);
  });

  it('Agreement checkbox should NOT be show', () => {
    const props = {
      isShowCheckBox: false,
      checkBoxValue: false,
      isRequire: 'required',
    };

    const { container } = render(<GdprAgreement {...props} />);
    const chkbAgreement = container.querySelector(`[id="ckb_agreement"]`);
    expect(chkbAgreement).not.toBeInTheDocument();
  });

  it('Agreement checkbox should be show', () => {
    const props = {
        isShowCheckBox: true,
        checkBoxValue: false,
        isRequire: 'required'
    };

    const { container } = render(<GdprAgreement {...props} />);
    const chkbAgreement = container.querySelector(`[id="ckb_agreement"]`);
    expect(chkbAgreement).toBeInTheDocument();
  });
});
