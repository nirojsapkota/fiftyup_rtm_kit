import React from "react";
import Theme from "../index";
import { obs, fuc, ninesaver } from "../themes";
import { render } from "react-testing-library";
import DoczWrapper from "../docz/wrapper";
import { getColor } from "../util";

const themes = [obs, fuc, ninesaver];

describe(`<Theme />`, () => {
  themes.map(theme =>
    it(`provides a theme context`, () => {
      const { getByText } = render(
        <Theme theme={theme}>
          <div>Welcome to React</div>
        </Theme>
      );
      expect(getByText(`Welcome to React`)).toBeInTheDocument();
    })
  );

  it(`alters the theme context`, () => {
    const { getByText } = render(
      <Theme variant="b">
        <div>Welcome to React</div>
      </Theme>
    );
    expect(getByText(`Welcome to React`)).toBeInTheDocument();
  });

  it(`provides a theme context`, () => {
    const { getByText } = render(
      <DoczWrapper>
        <div>Welcome to React</div>
      </DoczWrapper>
    );
    expect(getByText(`Welcome to React`)).toBeInTheDocument();
  });
});

describe(`getColor`, () => {
  it(`gets the color of the key specified for the current variant`, () => {
    // FIXME: mock the ninesaver object
    expect(getColor("primary", ninesaver)).toBe("#00b1ff");
  });
  it(`when the color is not in a variant`, () => {
    // FIXME: mock the ninesaver object
    expect(getColor("darkest", ninesaver)).toBe("#333");
  });
  it(`when the color for social media`, () => {
    // FIXME: mock the ninesaver object
    expect(getColor("facebook", ninesaver)).toBe("#3B5998");
  });
});
