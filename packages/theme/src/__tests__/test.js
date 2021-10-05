import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { Theme, BootstrapTheme } from '../index';
import { obs, fuc, ninesaver } from '../themes';
import { tintColor, getColor, setIn, getWeight } from '../util';
import { MockWrapper } from '../__mocks__/backgroundExample';

const themes = [obs, fuc, ninesaver];

describe('<BootstrapTheme />', () => {
  it('provides a theme context', () => {
    const { getByText } = render(
      <BootstrapTheme theme={obs}>
        <div>Welcome to React</div>
      </BootstrapTheme>
    );
    expect(getByText('Welcome to React')).toBeInTheDocument();
  });

  it('when no theme is present it doesnt error', () => {
    const { getByText } = render(
      <BootstrapTheme>
        <div>Welcome to React</div>
      </BootstrapTheme>
    );
    expect(getByText('Welcome to React')).toBeInTheDocument();
  });

  it('do not render CssReset', () => {
    const { getByTestId } = render(
      <BootstrapTheme theme={obs} cssReset={false}>
        <img href="/" data-testid="img" alt="testing" />
      </BootstrapTheme>
    );
    // inside CssReset: image display block
    expect(getByTestId('img')).not.toHaveStyle('display: block');
  });
});

describe('<Theme />', () => {
  themes.map(theme =>
    it('provides a theme context', () => {
      const { getByText } = render(
        <Theme theme={theme}>
          <div>Welcome to React</div>
        </Theme>
      );
      expect(getByText('Welcome to React')).toBeInTheDocument();
    })
  );

  it('alters the theme context', () => {
    const { getByText } = render(
      <Theme variant="b">
        <div>Welcome to React</div>
      </Theme>
    );
    expect(getByText('Welcome to React')).toBeInTheDocument();
  });
});

describe('backgroundStyle', () => {
  it('alters the theme context', () => {
    const { getByText } = render(
      <Theme theme={obs}>
        <MockWrapper variant="b">Welcome to React</MockWrapper>
      </Theme>
    );
    expect(getByText('Welcome to React')).toBeInTheDocument();
  });
});

describe('setIn', () => {
  it('alters the theme with the path provided', () => {
    const currentBorderRadius = obs.borderRadius;
    expect(setIn(obs, 'borderRadius', '10px').borderRadius).toBe('10px');
    expect(setIn(obs, 'borderRadius', '10px').borderRadius).not.toBe(
      currentBorderRadius
    );

    const currentBackgroundColor = obs.colors.variants.a.background;
    expect(
      setIn(obs, 'colors.variants.a.background', 'red').colors.variants.a
        .background
    ).toBe('red');
    expect(
      setIn(obs, 'colors.variants.a.background', 'red').colors.variants.a
        .background
    ).not.toBe(currentBackgroundColor);
  });
});

describe('getColor', () => {
  it('gets the color of the key specified for the current variant', () => {
    // FIXME: mock the ninesaver object
    expect(getColor('primary', ninesaver)).toBe('#00b1ff');
  });
  it('when the color is not in a variant', () => {
    // FIXME: mock the ninesaver object
    expect(getColor('darkest', ninesaver)).toBe('#333');
  });
  it('when the color for social media', () => {
    // FIXME: mock the ninesaver object
    expect(getColor('facebook', ninesaver)).toBe('#3B5998');
  });
});

describe('getWeight', () => {
  it('gets the weight specified from the mapping', () => {
    expect(getWeight('thin')).toBe('100');
    expect(getWeight('normal')).toBe('400');
    expect(getWeight('bold')).toBe('900');
  });

  it('defaults to 400', () => {
    expect(getWeight('unknownKey')).toBe('400');
  });
});

describe('tintColor', () => {
  it('lightens the color provided when the value is positive', () => {
    expect(tintColor('#eee', 10)).toBe('#fff');
  });
  it('darkens the color provided when the value is negative', () => {
    expect(tintColor('#eee', -10)).toBe('#d5d5d5');
  });
});
