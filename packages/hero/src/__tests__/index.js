import React from 'react';
import { Header, Paragraph } from '@rtm-ui/typography';
import { render } from '../../../bootstrap/setup/testSetup';
import Hero from '../index';

describe(`<Hero />`, () => {
  it(`should render its content`, () => {
    const { getByText } = render(
      <Hero title="You have successfully signed up!" icon="thumbs-up">
        <Header my={3} tag="h6" font="serif">
          What happens next?
        </Header>
        <Paragraph>We have sent you an email for your records</Paragraph>
      </Hero>
    );

    expect(getByText('You have successfully signed up!')).toBeInTheDocument();
    expect(getByText('What happens next?')).toBeInTheDocument();
    expect(
      getByText('We have sent you an email for your records')
    ).toBeInTheDocument();
  });
});
