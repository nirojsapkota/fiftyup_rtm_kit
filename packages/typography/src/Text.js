import React from 'react';
import t from 'prop-types';
import styled, { css } from 'styled-components';
import { getColor, themeColorKeys } from '@rtm-ui/theme';
import { Box } from '@rtm-ui/layout';

const weightMap = {
  thin: '100',
  normal: '400',
  bold: '900',
};

// FIXME: this should default to bold for headers
function getWeight(weight) {
  return weightMap[weight] || '400';
}

const colorStyles = css`
  color: ${props => getColor(props.color || 'text', props.theme)};
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
    element: 'small',
    sizes: [12, 12, 12, 12],
  },
];

export const labelTextStyles = css`
  font-size: 13px;
  letter-spacing: 1px;
  line-height: 1;
  text-transform: uppercase;
  font-family: MuseoSans;
  font-weight: 900;
`;

function headerFontSize(tag) {
  const { sizes } = sizeChart.find(({ element }) => element === tag);

  return css`
    font-size: ${sizes[0]}px;
    @media (min-width: ${props => props.theme.grid.sm}em) {
      font-size: ${sizes[1]}px;
    }
    @media (min-width: ${props => props.theme.grid.md}em) {
      font-size: ${sizes[2]}px;
    }
    @media (min-width: ${props => props.theme.grid.lg}em) {
      font-size: ${sizes[3]}px;
    }
  `;
}

const headerStyles = css`
  font-family: ${props =>
    props.font === 'serif'
      ? props.theme.fonts.serif
      : props.theme.fonts.sansSerif};
  font-weight: ${props => getWeight(props.weight)};
  line-height: 1.2;
  text-align: ${props => props.align};
  ${colorStyles};
`;

function createMarkup(html) {
  return { __html: html };
}

const H1 = styled(
  ({ color, tag, weight, font, align, scale, boxParams, ...rest }) => (
    <Box {...boxParams} {...rest} as={tag} />
  )
)`
  ${headerStyles};
  ${rest => headerFontSize(rest.tag)};
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
  scale: 1,
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
export const primitiveTags = ['p', 'small', 'a', 'label'];
export const weightProps = ['thin', 'normal', 'bold'];
export const fontStyles = ['serif', 'sansSerif'];
export const alignmentProps = [
  'left',
  'center',
  'right',
  'justified',
  'inherit',
];
export { themeColorKeys };

Text.propTypes = {
  tag: t.oneOf([...headerTags, 'p', 'small', 'a', 'label']).isRequired,
  dangerousHTML: t.string,
  children: t.node,
  align: t.oneOf(alignmentProps),
  weight: t.oneOf(weightProps),
  font: t.oneOf(fontStyles),
  scale: t.oneOf([1, 2, 3, 4]),
  color: t.string,
  p: t.oneOfType([t.number, t.arrayOf(t.number)]),
  pl: t.oneOfType([t.number, t.arrayOf(t.number)]),
  pr: t.oneOfType([t.number, t.arrayOf(t.number)]),
  pt: t.oneOfType([t.number, t.arrayOf(t.number)]),
  pb: t.oneOfType([t.number, t.arrayOf(t.number)]),
  px: t.oneOfType([t.number, t.arrayOf(t.number)]),
  py: t.oneOfType([t.number, t.arrayOf(t.number)]),
};
