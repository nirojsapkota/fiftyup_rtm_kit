import React from 'react';
import { render, wait, fireEvent } from '../../../bootstrap/setup/testSetup';
import { ReadFile } from '../index';
import axios from 'axios';

jest.mock('axios');

describe('<ReadFile/>', () => {
  it('matches expected list of files from s3', async () => {
    const resp = {
      data: { files: ['k6c3zh83w1/k6c3zh83w1_1554426811442.csv'] },
    };
    axios.get.mockResolvedValue(resp);
    const file = 'k6c3zh83w1_1554426811442.csv';
    const readFile = async readFileUrl =>
      axios.get({
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      });
    const downloadFile = jest.fn(async file =>
      axios.get(file, {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json',
        },
      })
    );
    const { getByText } = render(
      <ReadFile readFile={readFile} downloadFile={downloadFile} />
    );

    await wait(async () => {
      var text = getByText('k6c3zh83w1_1554426811442.csv');
      expect(text).toBeInTheDocument();
      var buttonText = getByText(/SAVE Files/i);
      fireEvent.click(buttonText);
      expect(downloadFile).toHaveBeenCalled();
    });
  });
});
