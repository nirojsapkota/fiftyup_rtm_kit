import React from 'react';
import { render, wait, cleanup } from '../../../bootstrap/setup/testSetup';
import { DynamicSvg } from '../index';

jest.mock('axios', () => {
  return {
    get: async () => {
      return {
        data: `
          <svg width="581" height="359" viewBox="0 0 581 359" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="581" height="359" fill="#C4C4C4"/>
            <text fill="black" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="32" letter-spacing="0em"><tspan x="128" y="120.938">{{header}}</tspan></text>
            <text fill="black" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="32" letter-spacing="0em"><tspan x="128" y="189.938">{{body}}</tspan></text>
            <text fill="black" xml:space="preserve" style="white-space: pre" font-family="Roboto" font-size="32" letter-spacing="0em"><tspan x="128" y="262.938">{{footer}}</tspan></text>
          </svg>
        `,
      };
    },
  };
});

describe('<DynamicSvg />', () => {
  it('dispays the reference object text', async () => {
    const { getByText } = await render(
      <DynamicSvg
        src="https://some-mocked-url.svg"
        referenceObject={{
          header: 'Estimated Price*',
          body: '$1,999',
          footer: 'per year',
        }}
      />
    );

    await wait(async () => {
      await expect(getByText('per year')).toBeInTheDocument();
    }, 5000);
  });
});
