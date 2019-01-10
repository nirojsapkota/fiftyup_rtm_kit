import React from 'react';
import axios from 'axios';
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
import LoginPanel from '../index';

jest.mock('axios');

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

const mockDefaultAxios = () => {
  axios.get.mockResolvedValueOnce({ data: [] });
  axios.post.mockResolvedValueOnce({ data: { redirectPath: '/' } });
};

describe('<LoginPanel />', () => {
  it('matches expected output', async () => {
    // set Up
    mockDefaultAxios();

    const { getByText, getByPlaceholderText, container } = render(
      <LoginPanel />
    );

    const email = getByPlaceholderText('Email');
    fireEvent.change(email, {
      target: { value: 'user@example.com' },
    });
    const postcode = getByPlaceholderText('Postcode');
    fireEvent.change(postcode, {
      target: { value: '2000, Barangaroo' },
    });

    const submit = getByText('See the offer');
    fireEvent.click(submit);

    expect(container).toHaveTextContent(
      'Join One Big Switch today for FREE and instantly unlock your special offers!'
    );

    // expect event was fired
    await wait(() => {
      expect(submit).toBeDisabled();
    });
  });
});
