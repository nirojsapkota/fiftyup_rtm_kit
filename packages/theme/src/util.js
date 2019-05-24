/* eslint-disable */
import { css } from 'styled-components';
import cloneDeep from 'lodash.clonedeep';
import toPath from 'lodash.topath';
import { lighten, darken } from 'polished';

export const getColor = (color, theme) => {
  const variantColor = theme.colors.variants[theme.variant][color];

  return (
    variantColor || theme.colors.grayscale[color] || theme.colors.social[color]
  );
};

export const backgroundStyle = css`
  background: ${props => getColor('background', props.theme)};
`;

export function getIn(obj, key, def = null, p = 0) {
  const path = toPath(key);
  while (obj && p < path.length) {
    obj = obj[path[p++]];
  }
  return obj;
}

export function setIn(obj, path, value) {
  let res = {};
  let resVal = res;
  let i = 0;
  let pathArray = toPath(path);

  for (; i < pathArray.length - 1; i++) {
    const currentPath = pathArray[i];
    let currentObj = getIn(obj, pathArray.slice(0, i + 1));

    if (resVal[currentPath]) {
      resVal = resVal[currentPath];
    } else {
      resVal = resVal[currentPath] = cloneDeep(currentObj);
    }
  }

  resVal[pathArray[i]] = value;

  const result = { ...obj, ...res };

  return result;
}

export function getWeight(weight) {
  const weightMap = {
    thin: '100',
    normal: '400',
    bold: '900',
  };

  return weightMap[weight] || '400';
}

export const tintColor = (colorHex, amt) => {
  if (amt > 0) {
    return lighten(amt / 100, colorHex);
  } else {
    return darken((amt / 100) * -1, colorHex);
  }
};
