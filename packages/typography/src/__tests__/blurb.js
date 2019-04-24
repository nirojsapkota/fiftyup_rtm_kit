import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import { Blurb } from '../index';
import { getWeight } from '@rtm-ui/theme';

describe('<Blurb />', () => {
  const textAligns = ['left', 'center', 'right'];

  textAligns.map(textAlign => {
    it('matches expected output', () => {
      const data = {
        header: '97 Members',
        body: 'have shopped around in your postcode this week!',
      };

      const { getByText } = render(
        <Blurb
          right
          fillContainer={true}
          header={data.header}
          body={data.body}
          right={textAlign === 'right'}
          center={textAlign === 'center'}
        />
      );

      const header = getByText(data.header);
      expect(header).toBeInTheDocument();
      expect(header.tagName).toEqual('H5');
      expect(header).toHaveStyleRule('font-weight', getWeight('bold'));

      const body = getByText(data.body);
      expect(body).toBeInTheDocument();
      expect(body).toHaveStyleRule('text-align', textAlign);
    });
  });
});
