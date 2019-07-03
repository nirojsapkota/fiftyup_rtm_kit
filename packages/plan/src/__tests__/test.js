import React from 'react';
import { getColor, getWeight, obs } from '@rtm-ui/theme';
// eslint-disable-next-line import/named
import {
  render,
  // eslint-disable-next-line import/named
  fireEvent,
  // eslint-disable-next-line import/named
  wait,
  // eslint-disable-next-line import/named
  cleanup,
} from '../../../bootstrap/setup/testSetup';
import { actions as planActions } from '../__fixtures__/plans';
import { default as planProps } from '../__fixtures__/plans';
import { actions as energyPlanActions } from '../__fixtures__/energyPlans';
import { default as energyPlanProps } from '../__fixtures__/energyPlans';
import Action, { ClickToCall, Share } from '../Action';
import Cta from '../Cta';
import Sidebar from '../Sidebar';
import Summary from '../Summary';
import { Plan } from '../index';

const mockTrackEvent = jest.fn();
jest.mock('@rtm-ui/tracker', () => {
  const original = require.requireActual('@rtm-ui/tracker');
  return {
    ...original,
    Tracker: props => props.render(mockTrackEvent),
  };
});

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe('<Plan />', () => {
  describe('Action', () => {
    it(`default action`, async () => {
      const data = planActions.get_started;

      const { getByText } = render(<Action {...data} />);

      const message = getByText(data.message);
      expect(message).toBeInTheDocument();
      
      const button = getByText(data.cta).closest('a');

      expect(button).toBeInTheDocument();
      expect(button.href).toEqual(data.link);
    });

    it(`ClickToCall action`, async () => {
      const data = planActions.click_to_call;

      const { getByText } = render(<ClickToCall {...data} />);

      const header = getByText(data.header);
      expect(header).toBeInTheDocument();
      expect(header).toHaveStyleRule('text-align', 'center');
      expect(header).toHaveStyleRule('color', getColor('secondary', obs));

      const link = getByText(data.link);
      expect(link).toBeInTheDocument();
      expect(link.tagName).toEqual('H3');
      expect(link).toHaveStyleRule('text-align', 'center');

      const linkParent = link.closest('a');
      expect(linkParent.href).toEqual(`tel:${data.link}`);
      expect(linkParent.querySelector('svg')).toBeInTheDocument();

      const footer = getByText(data.footer);
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveStyleRule('text-align', 'center');
      expect(footer).toHaveStyleRule('color', getColor('secondary', obs));
    });

    it(`Share action`, async () => {
      const data = planActions.request_call_back;

      const { getByText, getByTestId } = render(<Share {...data} />);

      const message = getByText(data.message);
      expect(message).toBeInTheDocument();

      const fb = getByTestId('share_facebook');
      expect(fb).toBeInTheDocument();
      expect(fb.tagName).toEqual('A');
      expect(fb.href).toEqual(
        'http://www.facebook.com/sharer/sharer.php?u=http://localhost/'
      );

      await fireEvent.click(fb);
      expect(mockTrackEvent).toHaveBeenCalledWith('share_facebook', undefined);
      mockTrackEvent.mockReset();

      const twitter = getByTestId('share_twitter');
      expect(twitter).toBeInTheDocument();
      expect(twitter.tagName).toEqual('A');
      expect(twitter.href).toEqual(
        'https://twitter.com/share?url=http://localhost/'
      );

      await fireEvent.click(twitter);
      expect(mockTrackEvent).toHaveBeenCalledWith('share_twitter', undefined);
      mockTrackEvent.mockReset();
    });
  });

  describe('Cta', () => {
    it('matches expected output', async () => {
      const ctaText = 'click to start';
      const { getByText } = render(<Cta>{ctaText}</Cta>);

      const cta = getByText(ctaText);
      expect(cta).toBeInTheDocument();
    });
  });

  describe('Sidebar', () => {
    it('matches expected output', async () => {
      const text = 'sidebar text';
      const { getByText } = render(<Sidebar>{text}</Sidebar>);

      const sidebar = getByText(text);
      expect(sidebar).toBeInTheDocument();
      expect(sidebar).toHaveStyleRule('position', 'sticky');
      expect(sidebar).toHaveStyleRule('align-self', 'flex-start');
    });
  });

  describe('Summary', () => {
    const plan = planProps.plan;
    const entity = planProps.entity;
    const authenticityToken = planProps.authenticity_token;
    const planCta = 'click to start';

    it('matches expected output', async () => {
      const props = energyPlanProps;
      const accordion = [
        {
          name: 'About This Provider',
          content: 'Provider content',
        },
        {
          name: 'FAQs',
          content: 'FAQs content',
        },
      ];
      const actions = [planActions.request_call_back];
      const { getByText } = render(
        <Summary
          {...props.plan}
          campaignId={props.plan.campaign_id}
          entity={entity}
          actions={props.actions}
          authenticityToken={authenticityToken}
          tweet_text="tweet"
          accordion={accordion}
          actions={actions}
        >
          {planCta}
        </Summary>
      );

      const mainHeader = getByText(props.plan.main_header_text);
      expect(mainHeader).toBeInTheDocument();
      expect(mainHeader.tagName).toEqual('H1');
      expect(mainHeader).toHaveStyleRule('color', getColor('primary', obs));

      const subHeader = getByText(props.plan.sub_header_text);
      expect(subHeader).toBeInTheDocument();
      expect(subHeader.tagName).toEqual('H3');
      expect(subHeader).toHaveStyleRule('font-weight', getWeight('normal'));

      accordion.map(async item => {
        const nameEl = getByText(item.name);
        expect(nameEl).toBeInTheDocument();
        expect(nameEl.tagName).toEqual('H5');
        fireEvent.click(nameEl);

        await wait(async () => {
          const contentEl = getByText(item.content);
          expect(contentEl).toBeInTheDocument();
          expect(actionMainImage.tagName).toEqual('IMG');
          expect(actionMainImage.src).toEqual(plan.main_image_file_url);
        });
      });

      const tweet = getByText('tweet');
      expect(tweet).toBeInTheDocument();
    });

    it('get started action', async () => {
      const actions = [planActions.get_started, planActions.request_call_back];
      const { getByText, getByAltText } = render(
        <Summary
          {...plan}
          campaignId={plan.campaign_id}
          entity={entity}
          actions={actions}
          authenticityToken={authenticityToken}
        >
          {planCta}
        </Summary>
      );

      const actionMainImage = getByAltText(plan.main_header_text);
      expect(actionMainImage).toBeInTheDocument();
      expect(actionMainImage.tagName).toEqual('IMG');
      expect(actionMainImage.src).toEqual(plan.main_image_file_url);

      const button = getByText(planActions.get_started.cta).closest('a');
      expect(button).toBeInTheDocument();
      expect(button.href).toEqual(planActions.get_started.link);

      await fireEvent.click(button);
      expect(mockTrackEvent).toHaveBeenCalledWith('get_started', undefined);
      mockTrackEvent.mockReset();

      await fireEvent.click(actionMainImage);
      expect(mockTrackEvent).toHaveBeenCalledWith('get_started', undefined);
      mockTrackEvent.mockReset();
    });

    it('should not render Share', async () => {
      plan.tweet_text = null;
      const actions = [planActions.get_started, planActions.request_call_back];
      const { queryByTestId } = render(
        <Summary
          {...plan}
          campaignId={plan.campaign_id}
          actions={actions}
          entity={entity}
        />
      );
      const fb = queryByTestId('share_facebook');
      expect(fb).toBeNull();
    });
  });

  describe('Plan', () => {
    const plan = planProps.plan;
    it('matches expected output', async () => {
      const { getByAltText, getByText } = render(
        <Plan
          {...planProps}
          actions={[planActions.click_to_call, planActions.request_call_back]}
        />
      );

      const merchant = getByAltText(plan.merchant.full_name);
      expect(merchant).toBeInTheDocument();
      expect(merchant.tagName).toEqual('IMG');
      expect(merchant.src).toEqual(plan.merchant.logoUrl);

      const clickToCallAction = getByText(planActions.click_to_call.link);
      expect(clickToCallAction).toBeInTheDocument();

      await fireEvent.click(clickToCallAction);
      expect(mockTrackEvent).toHaveBeenCalledWith('click_to_call', undefined);
      mockTrackEvent.mockReset();
    });

    it('get started action', async () => {
      const { getByText } = render(
        <Plan {...planProps} actions={[planActions.get_started]} />
      );

      const button = getByText(planActions.get_started.cta);
      expect(button).toBeInTheDocument();

      await fireEvent.click(button);
      expect(mockTrackEvent).toHaveBeenCalledWith('get_started', undefined);
      mockTrackEvent.mockReset();
    });
  });
});
