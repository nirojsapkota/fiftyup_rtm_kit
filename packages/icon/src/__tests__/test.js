import React from 'react';
import { render } from '@rtm-ui/bootstrap/setup/testSetup';
import Icon, { ICONS } from '../index';

describe('<Icon />', () => {
  [
    { size: 48 },
    { rotate: 45 },
    { hover: 'secondary' },
    { fill: 'primary' },
    { inline: true },
  ].map(props =>
    Object.keys(ICONS).map(icon => {
      it(`matches expected output with props: ${JSON.stringify(props)}`, () => {
        const { container } = render(<Icon glyph={icon} {...props} />);

        expect(container).toMatchSnapshot();
      });
    })
  );
});
