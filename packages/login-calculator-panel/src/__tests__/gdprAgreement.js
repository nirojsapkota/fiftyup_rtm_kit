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
    content: 'Some agreement text and [Link](https://someagreementlink.com)',
  };

  it(`renders Gdpr content with markdown link`, () => {
    const { getByText, container } = render(<GdprAgreement {...props} />);
    const agreementText = getByText('Some agreement text and');
    const linkNode = container.querySelector(
      "a[href='https://someagreementlink.com']"
    );
    expect(agreementText).toBeInTheDocument();
    expect(linkNode).toBeInTheDocument();
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
