import { render } from "react-testing-library";
import React from "react";
import "jest-styled-components";
import Bootstrap from "../packages/bootstrap";

const bootstrapRender = (node, ...options) =>
  render(<Bootstrap>{node}</Bootstrap>, ...options);

export * from "react-testing-library";
export { bootstrapRender as render };
