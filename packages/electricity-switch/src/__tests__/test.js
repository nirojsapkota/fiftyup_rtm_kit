import React from 'react';
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import {
  ConfirmHeader,
  Disclaimer,
  PlanDetails,
  ConfirmSwitch,
} from '../index';
import { dummyData } from '../__fixtures__/dummyData';

describe('<ConfirmHeader />', () => {
  it('Matches content expected output', () => {
    const icon = dummyData.confirmHeaderProps.icon;
    const header = dummyData.confirmHeaderProps.confirmationHeader;
    const { getByText } = render(
      <ConfirmHeader icon={icon} confirmationHeader={header} />
    );
    expect(getByText('Review your plan below')).toBeInTheDocument();
  });
  it('should render content match the props', () => {
    const { getByText } = render(
      <ConfirmHeader
        icon="light-bulb-obs"
        confirmationHeader="<ul><li>Accept the terms and conditions</li></ul>"
        orientation="vertical"
      />
    );
    expect(getByText('Accept the terms and conditions')).toBeInTheDocument();
  });
});

describe('<Disclairmer />', () => {
  const items = [
    {
      type: 'confirm',
      body: 'Welcome to react',
      label: null,
    },
  ];

  it('Matches expected output', () => {
    const { getByText } = render(<Disclaimer />);
    expect(getByText('Explicit Informed Consent of Offer')).toBeInTheDocument();
  });

  it('should render content match the props', () => {
    const { getByText } = render(
      <Disclaimer title="Hello react" items={items} />
    );

    expect(getByText('Hello react')).toBeInTheDocument();
    expect(getByText('Welcome to react')).toBeInTheDocument();
  });
});

describe('<PlanDetails />', () => {
  const planProps = {
    header: 'You have selected this offer:',
    merchantLogo: 'https://placehold.it/100x100',
    plan: {
      electricity_brief: '42% pay on time discount off Click Energy',
      gas_brief: '18% pay on time discount off Click Energy',
    },
  };
  it('Matches expected content output', () => {
    const { header, merchantLogo, plan } = planProps;
    const { getByText } = render(
      <PlanDetails
        {...header}
        {...merchantLogo}
        orientation="vertical"
        plan={plan}
      />
    );
    expect(getByText('You have selected this offer:')).toBeInTheDocument();
  });

  it('should render content match the props', () => {
    const { getByText } = render(<PlanDetails {...planProps} />);

    expect(getByText('You have selected this offer:')).toBeInTheDocument();
    expect(
      getByText('42% pay on time discount off Click Energy')
    ).toBeInTheDocument();
    expect(
      getByText('18% pay on time discount off Click Energy')
    ).toBeInTheDocument();
  });
});

describe('<ConfirmSwitch/>', () => {
  const props = {
    authenticityToken: 'd2VsY29tZQ==',
    agreementItems: [
      {
        type: 'confirm',
        body: 'Welcome to react',
        label: 'heading 1',
      },
      {
        type: 'confirm',
        body: 'Welcome to rtmkit',
        label: 'heading 2',
      },
    ],
    completeUrl: 'http://completed',
    editUrl: 'http://edit',
  };
  it('renders match output of confirm switch', () => {
    const { getByText } = render(<ConfirmSwitch {...props} />);
    expect(getByText('heading 1')).toBeInTheDocument();
    expect(getByText('heading 2')).toBeInTheDocument();
  });

  it('Form should submit to server', async () => {
    const handleSubmit = jest.fn();

    const { getByText } = render(
      <ConfirmSwitch {...props} handleSubmit={handleSubmit} />
    );
    const ckHeading1 = getByText('heading 1');
    const ckHeading2 = getByText('heading 2');
    const submit = getByText('Switch Now').closest('button');
    fireEvent.click(ckHeading1);
    fireEvent.click(ckHeading2);
    fireEvent.click(submit);

    await wait(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  it('Form does not submit when invalid', () => {
    const { getByText } = render(<ConfirmSwitch {...props} />);
    const ckHeading1 = getByText('heading 1');
    const submit = getByText('Switch Now');
    fireEvent.click(ckHeading1);
    fireEvent.click(submit);
    wait(() => {
      expect(getByText('Please select an option')).toBeInTheDocument();
    });
  });
});
