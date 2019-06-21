import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { getColor, getWeight } from '@rtm-ui/theme';
import { useTracker } from '@rtm-ui/tracker';
import { Box } from '@rtm-ui/layout';

const colorStyles = css`
  ${props =>
    props.color ? `color: ${getColor(props.color, props.theme)}` : null};
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
    sizes: [2, 2.2, 2.5, 4],
  },
  {
    element: 'h2',
    sizes: [2, 2, 2.2, 2.2],
  },
  {
    element: 'h3',
    sizes: [1.75, 1.75, 2, 2],
  },
  {
    element: 'h4',
    sizes: [1.5, 1.5, 1.75, 1.75],
  },
  {
    element: 'h5',
    sizes: [1.25, 1.25, 1.5, 1.5],
  },
  {
    element: 'h6',
    sizes: [1, 1, 1.25, 1.25],
  },
  {
    element: 'p',
    sizes: [1, 1, 1, 1],
  },
  {
    element: 'input',
    sizes: [1, 1, 1, 1],
  },
  {
    element: 'small',
    sizes: [0.75, 0.75, 0.75, 0.75],
  },
  {
    element: 'label',
    sizes: [1, 1, 1, 1],
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
  font-size: 0.85em;
  letter-spacing: 1px;
  line-height: 1;
  text-transform: uppercase;
  font-family: ${props => props.theme.fonts.sansSerif};
  font-weight: 900;
`;

function displayByEachScreen(tag) {
  const sizeItem = sizeChart.filter(({ element }) => element === tag)[0];
  let sizes;
  if (sizeItem) {
    sizes = sizeItem.sizes;
  }
  const lineHeight = lineHeightChart(tag);
  return css`
    ${sizes && `font-size: ${sizes[0]}em`};
    line-height: ${lineHeight[0]};
    @media (min-width: ${props => props.theme.grid.sm}em) {
      ${sizes && `font-size: ${sizes[0]}em`};
      line-height: ${lineHeight[1]};
    }
    @media (min-width: ${props => props.theme.grid.md}em) {
      ${sizes && `font-size: ${sizes[0]}em`};
      line-height: ${lineHeight[2]};
    }
    @media (min-width: ${props => props.theme.grid.lg}em) {
      ${sizes && `font-size: ${sizes[0]}em`};
      line-height: ${lineHeight[3]};
    }
  `;
}

const generalStyleForText = css`
  font-family: ${props =>
    props.font === 'serif'
      ? props.theme.fonts.serif
      : props.theme.fonts.sansSerif};
  ${props => (props.weight ? `font-weight: ${getWeight(props.weight)}` : null)};
  text-align: ${props => props.align};
  ${colorStyles};
  ${subStyles};

  em,
  i {
    font-style: italic;
  }

  strong {
    font-weight: bold;
  }
`;

function createMarkup(html) {
  return { __html: html };
}

const H1 = styled(({ color, tag, weight, font, align, boxParams, ...rest }) => {
  return <Box {...boxParams} {...rest} as={tag} />;
})`
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
  const { trackEvent } = useTracker();
  let onClickProps = {};
  if (rest.as === 'a' && rest.track) {
    onClickProps = {
      onClick: e => trackEvent(e, rest.track, rest.onClick),
    };
  }
  return (
    <H1
      boxParams={{ p, pl, pr, pt, pb, px, py }}
      {...tagParams}
      {...onClickProps} // FIXME: placing this before tagParams allows tracking to be overridden
    />
  );
}

Text.defaultProps = {
  dangerousHTML: undefined,
  children: undefined,
  align: 'left',
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

export const primitiveTags = [
  'p',
  'small',
  'a',
  'label',
  'input',
  'span',
  'strong',
  'em',
];

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
  tag: PropTypes.oneOf([...headerTags, ...primitiveTags]).isRequired,
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
