import React from 'react';
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import { Dashboard } from '../index';
import { getSurvey, submitSurvey } from '../actions';
import { dummyData } from '../fixtures/dummyData';

import axios from 'axios';

jest.mock('axios');

const API = dummyData.survey.url || 'xyz.app.com/abc';
const TEST_EMAIL = 'user@mail.com';

describe('<Dashboard />', () => {
  it('matches expected output', () => {
    const { getAllByText, container } = render(<Dashboard {...dummyData} />);

    // Dashboard banner
    expect(
      getAllByText(dummyData.dashboardBanner.content)[0]
    ).toBeInTheDocument();

    // Feature Tiles
    dummyData.campaigns.forEach(tile => {
      const img = container.querySelector(`img[src="${tile.image}"]`);
      expect(img).toBeInTheDocument();
      expect(getAllByText(tile.headerText)[0]).toBeInTheDocument();
      expect(getAllByText(tile.descriptionText)[0]).toBeInTheDocument();
      expect(getAllByText(tile.flagText)[0]).toBeInTheDocument();
      expect(getAllByText(tile.ctaText)[0]).toBeInTheDocument();
      expect(getAllByText(tile.titleText)[0]).toBeInTheDocument();
    });
  });

  it('pops up a modal when survey prop is given and user has not seen it yet', async () => {
    axios.get.mockResolvedValue({ data: { showSurvey: true } });
    const { getAllByText } = render(<Dashboard {...dummyData} />);
    await expect(axios.get).toHaveBeenCalled();
    await wait(async () => {
      expect(getAllByText(dummyData.survey.skip_label)[0]).toBeInTheDocument();
    });
  });

  it('does not popup a modal when survey prop is not given', async () => {
    axios.get.mockResolvedValue({ data: { showSurvey: true } });
    const { queryByTestId } = render(
      <Dashboard {...dummyData} survey={undefined} />
    );
    await expect(axios.get).toHaveBeenCalled();
    expect(queryByTestId('test-modal')).toBeNull();
  });

  it('does popup a modal with a description when survey prop is given, and is a new user', async () => {
    axios.get.mockResolvedValue({ data: { showSurvey: true } });
    const { getByText } = render(<Dashboard {...dummyData} />);
    await expect(axios.get).toHaveBeenCalled();
    await wait(async () => {
      expect(getByText(dummyData.survey.skip_label)).toBeInTheDocument();
      expect(
        getByText('What type of offers are you most interested in?')
      ).toBeInTheDocument();
    });
  });

  it('does not popup a modal when user already seen the survey', async () => {
    axios.get.mockResolvedValue({ data: { showSurvey: false } });
    const { queryByTestId } = render(<Dashboard {...dummyData} />);
    await expect(axios.get).toHaveBeenCalled();
    expect(queryByTestId('test-modal')).toBeNull();
  });

  it('closes the modal after selecting a product and clicking on close button', async () => {
    axios.get.mockResolvedValue({ data: { showSurvey: true } });
    const { getAllByText, queryAllByTestId } = await render(
      <Dashboard {...dummyData} survey={dummyData.survey} />
    );

    await expect(axios.get).toHaveBeenCalled();
    await wait(async () => {
      expect(getAllByText(dummyData.survey.skip_label)[0]).toBeInTheDocument();
      const healthProduct = getAllByText('HEALTH INSURANCE')[0];
      await fireEvent.click(healthProduct);
    });

    await wait(async () => {
      expect(getAllByText(dummyData.survey.cta_label)[0]).toBeInTheDocument();
    });

    await fireEvent.click(getAllByText(dummyData.survey.skip_label)[0]);
    await wait(async () => {
      expect(axios.post).toHaveBeenCalled();
      expect(queryAllByTestId('test-modal')[0]).toBeUndefined();
    });
  });

  it('submits selected products and closes modal when submitting', async () => {
    axios.get.mockResolvedValue({ data: { showSurvey: true } });
    const { getAllByText, queryAllByTestId } = await render(
      <Dashboard {...dummyData} />
    );

    await expect(axios.get).toHaveBeenCalled();
    await wait(async () => {
      expect(getAllByText('HEALTH INSURANCE')[0]).toBeInTheDocument();
    });
    const healthProduct = getAllByText('HEALTH INSURANCE')[0];
    axios.post.mockResolvedValue({
      email: dummyData.survey.email,
      products: ['health insurance'],
    });
    await fireEvent.click(healthProduct);
    await wait(async () => {
      expect(getAllByText(dummyData.survey.cta_label)[0]).toBeInTheDocument();
    });

    await fireEvent.click(getAllByText(dummyData.survey.cta_label)[0]);
    await wait(async () => {
      expect(axios.post).toHaveBeenCalled();
      expect(queryAllByTestId('test-modal')[0]).toBeUndefined();
    });
  });
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
      Promise.reject(new Error(errorMessage))
    );

    await expect(getSurvey(API, TEST_EMAIL)).resolves.toEqual(false);
  });
});

describe('submitSurvey', () => {
  it('pushes successfully data to an API', async () => {
    const data = {};
    axios.post.mockImplementationOnce(() => Promise.resolve(data));

    await expect(submitSurvey(API, TEST_EMAIL, ['energy'])).resolves.toEqual(
      data
    );
  });

  it('pushes erroneously data to an API', async () => {
    const errorMessage = 'Network Error';

    axios.post.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );

    await expect(submitSurvey(API, TEST_EMAIL, ['energy'])).resolves.toEqual(
      false
    );
  });
});

describe('dashboard preference ga tracking', () => {
  it('tracks dashboard preference', async () => {
    global.ga = jest.fn();
    const spyGa = jest.spyOn(global, 'ga');

    axios.get.mockResolvedValue({ data: { showSurvey: true } });
    const { getAllByText } = render(<Dashboard {...dummyData} />);

    await expect(axios.get).toHaveBeenCalled();

    await wait(async () => {
      expect(getAllByText('HEALTH INSURANCE')[0]).toBeInTheDocument();
    });
    const healthProduct = getAllByText('HEALTH INSURANCE')[0];
    await fireEvent.click(healthProduct);

    await wait(async () => {
      expect(getAllByText('LIFE INSURANCE')[0]).toBeInTheDocument();
    });
    const lifeProduct = getAllByText('LIFE INSURANCE')[0];
    await fireEvent.click(lifeProduct);

    await wait(async () => {
      expect(getAllByText(dummyData.survey.cta_label)[0]).toBeInTheDocument();
    });

    await fireEvent.click(getAllByText(dummyData.survey.cta_label)[0]);

    await wait(async () => {
      expect(spyGa).toHaveBeenCalledWith('send', {
        hitType: 'pageview',
        page:
          'virtual/dashboard-preferences/cta/health-insurance+life-insurance',
      });
    });
  });
});
