import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import { Seo } from '../index';
import data from '../__fixtures__/props.js';

describe('<Seo />', () => {
  it('should render Seo component', () => {
    const props = data;
    const container = render(<Seo {...props}></Seo>);
    expect(container).toBeDefined();

    document.head.innerHTML =
      '<div>' +
      '<Helmet>' +
      `<title>${props.title}</title>` +
      `<link href=${props.link}></link>` +
      `<meta name=${props.meta[6].name} content=${props.meta[6].content}>` +
      `<meta property=${props.meta[1].property} content=${props.meta[1].content}>` +
      '</Helmet>' +
      '</div>';

    const title = document.querySelector('title');
    expect(title.innerHTML).toEqual('One Big Switch');

    const link = document.querySelector('link');
    expect(link.href).toEqual(
      'https://www.onebigswitch.com.au/assets/design_aug_2015/OBS_Logo-55122841e6193ded61ea6dfe0b2d22865a92c176912b693ef206b6a5da766741.png'
    );

    const meta = document.querySelector('meta');
    expect(meta.name).toEqual('keywords');
    expect(meta.content).toEqual('One');

    const element = document.querySelector('meta[property="og:description"]');
    expect(element.getAttribute('content')).toEqual('Join');
  });
});
