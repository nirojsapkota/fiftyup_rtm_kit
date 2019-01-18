import React from 'react';
// eslint-disable-next-line import/named
import {
  render,
  // eslint-disable-next-line import/named
  cleanup,
} from '../../../bootstrap/setup/testSetup';
import LoginPanel from '../index';
import { mockData } from '../__mocks__/data';

jest.mock('axios');

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe('<LoginPanel />', () => {
  it('matches expected output', async () => {
    const { getByText, getByValue, container } = render(
      <LoginPanel {...mockData} />
    );

    // expect hidden fields
    const jumpPath = getByValue(mockData.hiddenFields.jump_path);
    expect(jumpPath.name).toEqual('jump_path');
    const registeringCampaignId = getByValue(
      mockData.hiddenFields.registering_campaign_id.toString()
    );
    expect(registeringCampaignId.name).toEqual('registering_campaign_id');

    expect(getByText(mockData.title)).toBeInTheDocument();
    expect(getByText(mockData.buttonText)).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });
});
