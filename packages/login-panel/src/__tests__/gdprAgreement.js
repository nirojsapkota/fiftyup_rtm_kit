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
    enableCheckBox: true,
    isRequire: 'required',
    isChecked: false,
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

  it(`renders Gdpr link confirmation`, () => {
    const { getByText, container } = render(<GdprAgreement {...props} />);
    const elConfirmationOfconsent = getByText(props.confirmationOfConsent.text);
    const elTermsCondition = getByText(props.termsAndConditions.text);
    const elPrivacyPolicy = getByText(props.privacyPolicy.text);

    expect(elConfirmationOfconsent).toBeInTheDocument();
    expect(elTermsCondition).toBeInTheDocument();
    expect(elPrivacyPolicy).toBeInTheDocument();
    // expect(container).toMatchSnapshot();
  });

  it('renders checkbox event tracking', () => {
    const { getByTestId } = render(<GdprAgreement {...props} />);
    const chkbAgreement = getByTestId('ckAgreement');

    fireEvent.click(chkbAgreement);
    expect(chkbAgreement.checked).toBe(true);
  });

  it('get expected output with getCheckBoxValue func prop', async () => {
    const handleCheck = jest.fn();
    const defaultProps = {
      isChecked: false,
      isRequire: 'required',
      enableCheckBox: true,
      getCheckBoxValue: handleCheck,
    };
    const { getByTestId } = render(<GdprAgreement {...defaultProps} />);
    const chkbAgreement = getByTestId('ckAgreement');

    fireEvent.click(chkbAgreement);

    expect(handleCheck).toHaveBeenCalledTimes(1);
    expect(chkbAgreement.checked).toBe(true);
  });

  it('Agreement checkbox should NOT be show', () => {
    const props = {
      isChecked: false,
      enableCheckBox: false,
      isRequire: 'required',
    };
    const { queryAllByTestId } = render(<GdprAgreement {...props} />);
    const chkbAgreement = queryAllByTestId('ckAgreement');

    expect(chkbAgreement).toEqual([]);
  });

  it('Agreement checkbox should be show', () => {
    const props = {
      enableCheckBox: true,
      isChecked: false,
      isRequire: 'required',
    };
    const { getByTestId } = render(<GdprAgreement {...props} />);
    const chkbAgreement = getByTestId('ckAgreement');

    expect(chkbAgreement).toBeInTheDocument();
  });
});
