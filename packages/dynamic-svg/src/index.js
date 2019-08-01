import React from 'react';
import styled from 'styled-components';
import { getColor } from '@rtm-ui/theme';
import Handlebars from 'handlebars';
import axios from 'axios';

const Wrapper = styled.div`
  svg {
    max-width: 100%;
  }
  text {
    font-family: ${p => p.theme.fonts.sansSerif};
    fill: ${p => getColor('primary', p.theme)};
    tspan {
      font-family: ${p => p.theme.fonts.sansSerif};
      fill: ${p => getColor('primary', p.theme)};
    }
  }
`;

export const DynamicSvg = ({ src, referenceObject }) => {
  const [svgString, setSvgString] = React.useState('');

  React.useEffect(() => {
    if (svgString) {
      const template = Handlebars.compile(svgString);
      const interpolatedSvgString = template(referenceObject);
      setSvgString(interpolatedSvgString);
    }
  }, [referenceObject, svgString]);

  React.useEffect(() => {
    const getSvg = async () => {
      try {
        const response = await axios.get(src);
        setSvgString(response.data);
      } catch (e) {
        console.error(e);
      }
    };

    getSvg();
  }, [src]);

  const createMarkup = () => {
    return { __html: svgString };
  };

  return <Wrapper dangerouslySetInnerHTML={createMarkup()} />;
};
