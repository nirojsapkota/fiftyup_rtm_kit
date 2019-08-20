import React from 'react';
// eslint-disable-next-line import/named
import { render } from '../../../bootstrap/setup/testSetup';
import planProps, { actions } from '../__fixtures__/plans';
import { Plan } from '../index';

describe('<Plan />', () => {
  describe('with markdown as the feature renderer', () => {
    it('gets parsed in to valid html', () => {
      const props = {
        ...planProps,
        isEnabledMarkdown: true,
        plan: {
          ...planProps.plan,
          plan_features: [{ body: '### Hello World!' }],
        },
      };
      const { getByText } = render(
        <Plan {...props} actions={[actions.get_started]} />
      );

      expect(getByText('Hello World!')).toBeInTheDocument();
    });
  });
  describe('actions', () => {
    describe('with the get_started option', () => {
      it('renders the get_started cta', async () => {
        const { getByText } = render(
          <Plan {...planProps} actions={[actions.get_started]} />
        );
        expect(getByText(actions.get_started.cta)).toBeInTheDocument();
      });
    });
    describe('with the callback option', () => {
      it('renders the phoneback cta', async () => {
        const { getByText } = render(
          <Plan {...planProps} actions={[actions.request_call_back]} />
        );

        expect(getByText(actions.request_call_back.cta)).toBeInTheDocument();
      });
    });
  });
});
