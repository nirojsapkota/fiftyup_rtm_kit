import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { getColor, getWeight } from '@rtm-ui/theme';
import { Box } from '@rtm-ui/layout';

const colorStyles = css`
  color: ${props => getColor(props.color || 'text', props.theme)};
`;

const subStyles = css`
  sub {
    vertical-align: sub;
    font-size: smaller;
  }
  sup {
    vertical-align: super;
    font-size: smaller;
  }
`;

const sizeChart = [
  {
    element: 'h1',
    sizes: [32, 36, 42, 57],
  },
  {
    element: 'h2',
    sizes: [32, 32, 36, 36],
  },
  {
    element: 'h3',
    sizes: [28, 28, 32, 32],
  },
  {
    element: 'h4',
    sizes: [24, 24, 28, 28],
  },
  {
    element: 'h5',
    sizes: [20, 20, 24, 24],
  },
  {
    element: 'h6',
    sizes: [16, 16, 20, 20],
  },
  {
    element: 'p',
    sizes: [16, 16, 16, 16],
  },
  {
    element: 'input',
    sizes: [16, 16, 16, 16],
  },
  {
    element: 'small',
    sizes: [12, 12, 12, 12],
  },
  {
    element: 'label',
    sizes: [14, 14, 14, 14],
  },
  {
    element: 'a',
    sizes: [16, 16, 16, 16],
  },
];

const lineHeightChart = tag => {
  switch (tag) {
    case 'small':
      return [1.6, 1.6, 1.6, 1.6];
    case 'p':
      return [1.2, 1.2, 1.2, 1.2];
    default:
      return [1.2, 1.2, 1.2, 1.2];
  }
};

export const labelTextStyles = css`
  font-size: 13px;
  letter-spacing: 1px;
  line-height: 1;
  text-transform: uppercase;
  font-family: ${props => props.theme.fonts.sansSerif};
  font-weight: 900;
`;

function displayByEachScreen(tag) {
  const { sizes } = sizeChart.find(({ element }) => element === tag);
  const lineHeight = lineHeightChart(tag);
  return css`
    font-size: ${sizes[0]}px;
    line-height: ${lineHeight[0]};
    @media (min-width: ${props => props.theme.grid.sm}em) {
      font-size: ${sizes[1]}px;
      line-height: ${lineHeight[1]};
    }
    @media (min-width: ${props => props.theme.grid.md}em) {
      font-size: ${sizes[2]}px;
      line-height: ${lineHeight[2]};
    }
    @media (min-width: ${props => props.theme.grid.lg}em) {
      font-size: ${sizes[3]}px;
      line-height: ${lineHeight[3]};
    }
  `;
}

const generalStyleForText = css`
  font-family: ${props =>
    props.font === 'serif'
      ? props.theme.fonts.serif
      : props.theme.fonts.sansSerif};
  font-weight: ${props => getWeight(props.weight)};
  text-align: ${props => props.align};
  ${colorStyles};
  ${subStyles};
  strong {
    font-weight: bold;
  }
`;

function createMarkup(html) {
  return { __html: html };
}

const H1 = styled(({ color, tag, weight, font, align, boxParams, ...rest }) => (
  <Box {...boxParams} {...rest} as={tag} />
))`
  ${generalStyleForText};
  ${rest => displayByEachScreen(rest.tag)};
`;

export function Text({
  dangerousHTML,
  children,
  p,
  pl,
  pr,
  pt,
  pb,
  px,
  py,
  ...rest
}) {
  const textValue = dangerousHTML
    ? { dangerouslySetInnerHTML: createMarkup(dangerousHTML) }
    : { children };
  const tagParams = { ...rest, ...textValue };
  return <H1 boxParams={{ p, pl, pr, pt, pb, px, py }} {...tagParams} />;
}

Text.defaultProps = {
  dangerousHTML: undefined,
  children: undefined,
  align: 'left',
  weight: 'normal',
  font: 'sansSerif',
  color: null,
  p: undefined,
  pl: undefined,
  pr: undefined,
  pt: undefined,
  pb: undefined,
  px: undefined,
  py: undefined,
};

export const headerTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
export const primitiveTags = ['p', 'small', 'a', 'label', 'input'];
export const weightProps = ['thin', 'normal', 'bold'];
export const fontStyles = ['serif', 'sansSerif'];
export const alignmentProps = [
  'left',
  'center',
  'right',
  'justified',
  'inherit',
];

Text.propTypes = {
  tag: PropTypes.oneOf([...headerTags, ...primitiveTags])
    .isRequired,
  dangerousHTML: PropTypes.string,
  children: PropTypes.node,
  align: PropTypes.oneOf(alignmentProps),
  weight: PropTypes.oneOf(weightProps),
  font: PropTypes.oneOf(fontStyles),
  color: PropTypes.string,
  p: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  pl: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  pr: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  pt: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  pb: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  px: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  py: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.number),
  ]),
};
