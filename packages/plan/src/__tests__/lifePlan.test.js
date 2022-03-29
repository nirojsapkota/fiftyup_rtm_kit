import React from 'react';
// eslint-disable-next-line import/named
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import lifePlanProps from '../__fixtures__/lifePlans';
import { Plan } from '../index';

const axios = require('axios');
jest.mock('axios');

afterEach(jest.clearAllMocks);

describe('<Plan />', () => {
  describe('with markdown as the feature renderer', () => {
    it('gets parsed in to valid html', () => {
      const { getByText } = render(<Plan {...lifePlanProps} />);
    });

    it('renders the multiple header images when multi_image_file_urls is passed', () => {
      const { getAllByAltText } = render(<Plan {...lifePlanProps} />);
      const planImages = getAllByAltText('Main Header Text');
      expect(planImages).toHaveLength(4);
    });

    it('renders the single header image when multi_image_file_urls is not passed', () => {
      lifePlanProps.plan.multi_image_file_urls = [];
      const { getAllByAltText } = render(<Plan {...lifePlanProps} />);
      const planImages = getAllByAltText('Main Header Text');
      expect(planImages).toHaveLength(2);
    });
  });

  describe('with the get_quote option', () => {
    it('renders the get quote form', async () => {
      const { getAllByText } = render(<Plan {...lifePlanProps} />);

      expect(getAllByText('Get A Quick Quote Now')[0]).toBeInTheDocument();

      expect(getAllByText('Get Quote')[0]).toBeInTheDocument();
    });

    it('generates a quote', async () => {
      const { getAllByText, getByLabelText, debug, getByTestId } = render(
        <Plan {...lifePlanProps} />
      );

      fireEvent.change(getByLabelText(/First name/i), {
        target: { value: 'Test' },
      });

      fireEvent.change(getByLabelText(/Surname/i), {
        target: { value: 'Last' },
      });

      fireEvent.change(getByLabelText(/Phone number/i), {
        target: { value: '0222222222' },
      });

      let input = await getByLabelText('Age');
      await fireEvent.focus(input);
      await fireEvent.click(input);
      // Wait for dropdown to appear
      await wait(async () => {
        const dropdownItem = await getByLabelText('18 years old');
        await expect(dropdownItem).toBeInTheDocument();
        await fireEvent.click(dropdownItem);
      });

      fireEvent.click(getAllByText(/Female/i)[0]);

      fireEvent.click(getAllByText(/Smoker/i)[0]);

      let input2 = await getByLabelText('Amount of cover');
      await fireEvent.focus(input2);
      await fireEvent.click(input2);
      // Wait for dropdown to appear
      await wait(async () => {
        const dropdownItem = await getByLabelText('$100,000');
        await expect(dropdownItem).toBeInTheDocument();
        await fireEvent.click(dropdownItem);
      });

      axios.post.mockResolvedValue({ data: { obs: '100' }, status: 200 });

      const formSubmitButton = getAllByText(/Get quote/i)[0].closest('button');
      await fireEvent.click(formSubmitButton);

      await wait(async () => {
        await expect(axios.post).toHaveBeenCalled();
        expect(getByTestId('quoteStep2')).toBeInTheDocument();
        expect(getAllByText('Morning')[0]).toBeInTheDocument();
        expect(getAllByText('Afternoon')[0]).toBeInTheDocument();
        expect(getAllByText('Evening')[0]).toBeInTheDocument();
        expect(getAllByText('Generate a new quote')[0]).toBeInTheDocument();
      });

      // await fireEvent.click(getAllByText(/Generate a new quote/i)[0].closest('button'));
      //expect(getByTestId('quoteStep1')).toBeInTheDocument();
      // await wait(async () => {
      //   await expect(getByTestId('quoteStep1')).toBeInTheDocument();
      // });

      axios.patch.mockResolvedValue({
        message: 'Phoneback saved',
        status: 200,
      });

      fireEvent.click(getAllByText(/Morning/i)[0]);
      await wait(async () => {
        await expect(axios.patch).toHaveBeenCalled();
        expect(getByTestId('quoteStep3')).toBeInTheDocument();
      });
    });
  });
});
