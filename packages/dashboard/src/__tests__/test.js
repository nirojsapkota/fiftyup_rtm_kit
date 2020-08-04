import React from 'react';
import { render, fireEvent, cleanup, wait } from '../../../bootstrap/setup/testSetup';
import { Dashboard } from '../index';
import { getSurvey, submitSurvey } from '../actions';
import { dummyData } from '../fixtures/dummyData';

import axios from 'axios';

jest.mock('axios');

const API = dummyData.survey.url || 'xyz.app.com/abc';
const TEST_EMAIL = 'user@mail.com'


// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe('<Dashboard />', () => {
  it('matches expected output', () => {
    const { getByText, container } = render(<Dashboard {...dummyData} />);

    // Dashboard banner
    expect(getByText(dummyData.dashboardBanner.content)).toBeInTheDocument();

    // Feature Tiles
    dummyData.campaigns.forEach(tile => {
      const img = container.querySelector(`img[src="${tile.image}"]`);
      expect(img).toBeInTheDocument();
      expect(getByText(tile.headerText)).toBeInTheDocument();
      expect(getByText(tile.descriptionText)).toBeInTheDocument();
      expect(getByText(tile.flagText)).toBeInTheDocument();
      expect(getByText(tile.ctaText)).toBeInTheDocument();
      expect(getByText(tile.titleText)).toBeInTheDocument();
    });
  });

  it('pops up a modal when survey prop is given and user has not seen it yet', async () => {
    axios.get.mockResolvedValue({ data: { showSurvey: true } });
    const { getByText } = render(<Dashboard {...dummyData} />);
    await expect(axios.get).toHaveBeenCalled();
    await wait(async () => {
      expect(getByText(dummyData.survey.skip_label)).toBeInTheDocument();
    })
  })

  it('does not popup a modal when survey prop is not given', async () => {
    axios.get.mockResolvedValue({ data: { showSurvey: true } });
    const { queryByTestId } = render(<Dashboard {...dummyData} survey={undefined} />);
    await expect(axios.get).toHaveBeenCalled();
    expect(queryByTestId('test-modal')).toBeNull();
  });

  it('does popup a modal with a title and description when survey prop is given, and is a new user', async () => {
    axios.get.mockResolvedValue({ data: { showSurvey: true } });
    const { getByText } = render(<Dashboard {...dummyData} />);
    await expect(axios.get).toHaveBeenCalled();
    await wait(async () => {
      expect(getByText(dummyData.survey.skip_label)).toBeInTheDocument();
    })
    expect(getByText('Welcome to OneBigSwitch!')).toBeInTheDocument();
    expect(getByText('What type of offers are you most interested in?')).toBeInTheDocument();
  });

  it('does not popup a modal when user already seen the survey', async () => {
    axios.get.mockResolvedValue({ data: { showSurvey: false } });
    const { queryByTestId } = render(<Dashboard {...dummyData} />);
    await expect(axios.get).toHaveBeenCalled();
    expect(queryByTestId('test-modal')).toBeNull();
  });

  it('closes the modal after selecting a product and clicking on the cta link', async () => {
    axios.get.mockResolvedValue({ data: { showSurvey: true } });
    const { getByText, queryByTestId } = render(<Dashboard {...dummyData} />);

    const data = { email: dummyData.survey.email, products: ['health insurance'] };
    axios.post.mockResolvedValue(data);
    await expect(axios.get).toHaveBeenCalled();
    await wait(async () => {
      expect(getByText(dummyData.survey.skip_label)).toBeInTheDocument();
    })
    const healthProduct = getByText('Health Insurance');
    await fireEvent.click(healthProduct);
    await wait(async () => {
      expect(getByText(dummyData.survey.cta_label)).toBeInTheDocument();
    })

    await fireEvent.click(getByText(dummyData.survey.cta_label));
    await expect(axios.post).toHaveBeenCalled();
    expect(queryByTestId('test-modal')).toBeNull();
  })

  it('saves selected products when closing the modal', async () => {
    axios.get.mockResolvedValue({ data: { showSurvey: true } });
    const { getByText, queryByTestId, getByTestId } = render(<Dashboard {...dummyData} />);

    const data = { email: dummyData.survey.email, products: ['health insurance'] };
    axios.post.mockResolvedValue(data);
    await expect(axios.get).toHaveBeenCalled();
    await wait(async () => {
      expect(getByText(dummyData.survey.skip_label)).toBeInTheDocument();
    })
    const healthProduct = getByText('Health Insurance');
    await fireEvent.click(healthProduct);
    await wait(async () => {
      expect(getByText(dummyData.survey.cta_label)).toBeInTheDocument();
    })

    await fireEvent.click(getByTestId('close-modal'));
    await expect(axios.post).toHaveBeenCalled();
    expect(queryByTestId('test-modal')).toBeNull();
  })
});

describe('getSurvey', () => {
  it('fetches successfully data from an API', async () => {
    const data = { data: { email: 'user@email.com', products: ['energy'] } };

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    await expect(getSurvey(API, TEST_EMAIL)).resolves.toEqual(data);
  });

  it('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(getSurvey(API, TEST_EMAIL)).resolves.toEqual(false);

  });
});

describe('submitSurvey', () => {
  it('pushes successfully data to an API', async () => {
    const data = {};

    axios.post.mockImplementationOnce(() => Promise.resolve(data));

    await expect(submitSurvey(API, TEST_EMAIL, ['energy'])).resolves.toEqual(data);
  });

  it('pushes erroneously data to an API', async () => {

    const errorMessage = 'Network Error';

    axios.post.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(submitSurvey(API, TEST_EMAIL, ['energy'])).resolves.toEqual(false);
  });

});
