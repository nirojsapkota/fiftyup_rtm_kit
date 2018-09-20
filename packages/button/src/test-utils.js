import { render } from "react-testing-library";
import React from "react";
import Variant from "@rtm-test/theme";

const customRender = (node, ...options) =>
  render(<Variant>{node}</Variant>, ...options);

export * from "react-testing-library";
export { customRender as render };
