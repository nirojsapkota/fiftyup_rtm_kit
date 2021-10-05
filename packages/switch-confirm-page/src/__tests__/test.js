import React from 'react';
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import { SwitchConfirmPage, ConfirmationWrapper } from '../index';
import { dummyData } from '../__fixtures__/dummyData';
import axios from 'axios';

jest.mock('axios');
const switchId = dummyData.switchId;
const switchType = dummyData.switchType;
const uploadURL = dummyData.uploadUrl;
const image =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABkAAAAs0CAYAAADQaKCwAAAgAElEQVR4XuzdBbhU';

describe('<SwitchConfirmPage />', () => {
  it('matches expected output', () => {
    const { queryAllByText } = render(<SwitchConfirmPage {...dummyData} />);
    expect(queryAllByText(/Confirm and agreement/i)[0]).toBeInTheDocument();
    expect(queryAllByText(/Review your plan below/i)[0]).toBeInTheDocument();
    expect(queryAllByText(/0909887778/i)[0]).toBeInTheDocument();
    expect(queryAllByText(/Switch Now/i)[0]).toBeInTheDocument();
    expect(queryAllByText(/Plan detail header/i)[0]).toBeInTheDocument();
  });

  it('Display review details when fireevent on tab', () => {
    const { queryAllByText, getAllByText } = render(
      <SwitchConfirmPage {...dummyData} />
    );
    const headerElement = getAllByText('Your Plan Details')[0];
    fireEvent.click(headerElement);

    expect(queryAllByText(/Contact Name/i)[0]).toBeInTheDocument();
  });

  it('Display accordion details when fireevent on tab', () => {
    const { queryAllByText, getAllByText } = render(
      <SwitchConfirmPage {...dummyData} />
    );
    const headerElement = getAllByText('Confirm and agreements')[0];
    fireEvent.click(headerElement);

    expect(
      queryAllByText(/Content for confirm and agreements/i)[0]
    ).toBeInTheDocument();
  });

  it('Submit to server when form valid', async () => {
    const { queryByText, getAllByText } = render(
      <SwitchConfirmPage {...dummyData} />
    );
    const headerElement = getAllByText('Yes, I agree')[0];

    const divSubmit = getAllByText('Switch Now')[0];
    const btnSubmit = divSubmit.closest('button');

    fireEvent.click(headerElement);
    fireEvent.click(btnSubmit);

    expect(queryByText('Tick to agree to terms above')).not.toBeInTheDocument();
  });

  it('Will trigger button click to submit form', async () => {
    const { queryAllByText, getByText } = render(
      <SwitchConfirmPage {...dummyData} />
    );
    /**
     * To avoid Not implemented: window.scrollTo
     * https://stackoverflow.com/a/62086079/1138156
     */
    window.scrollTo = jest.fn();
    const submitLink = getByText('Click here to continue Your switch');
    fireEvent.click(submitLink);
    expect(queryAllByText(/Switch Now/i)[0]).toBeInTheDocument();
  });

  it('Take screenshot of page and upload successfully to server', async () => {
    const response = {
      data: {
        Bucket: 's3-bucket',
        ETag: 'c3762497dea5bc3762497dea5b',
        Key: '1234.png',
        Location: 'https://someurl/1234.png',
        key: '1234.png',
      },
      status: 200,
    };

    axios.post.mockResolvedValue(response);
    const instance = new ConfirmationWrapper(dummyData);

    await wait(async () => {
      expect(
        instance.saveImgToS3(switchId, switchType, uploadURL, image)
      ).resolves.toEqual(response);
      expect(axios.post).toHaveBeenCalledWith(
        uploadURL,
        JSON.stringify({
          switchId: switchId,
          switchType: switchType,
          imageURL: image,
        }),
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
    });
  });

  it('Screenshot upload to server fails', async () => {
    axios.post.mockRejectedValue(Error());
    const instance = new ConfirmationWrapper(dummyData);

    await wait(async () => {
      expect(
        instance.saveImgToS3(switchId, switchType, uploadURL, image)
      ).resolves.toEqual(true);
      expect(axios.post).toHaveBeenCalledWith(
        uploadURL,
        JSON.stringify({
          switchId: switchId,
          switchType: switchType,
          imageURL: image,
        }),
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
    });
  });
});
