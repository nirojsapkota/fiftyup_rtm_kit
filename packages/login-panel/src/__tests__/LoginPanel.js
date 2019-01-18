import React from 'react';
// eslint-disable-next-line import/named
import {
  render,
  // eslint-disable-next-line import/named
  cleanup,
} from '../../../bootstrap/setup/testSetup';
import LoginPanel from '../index';
import loginPanelProps from '../__fixtures__/loginPanel';

jest.mock('axios');

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe('<LoginPanel />', () => {
  it('matches expected output', async () => {
    const { getByText, getByValue, container } = render(
      <LoginPanel {...loginPanelProps} />
    );

    // expect hidden fields
    const jumpPath = getByValue(loginPanelProps.hiddenFields.jump_path);
    expect(jumpPath.name).toEqual('jump_path');
    const registeringCampaignId = getByValue(
      loginPanelProps.hiddenFields.registering_campaign_id.toString()
    );
    expect(registeringCampaignId.name).toEqual('registering_campaign_id');

    expect(getByText(loginPanelProps.title)).toBeInTheDocument();
    expect(getByText(loginPanelProps.buttonText)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
