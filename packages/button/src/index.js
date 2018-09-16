import React from "react";
import t from "prop-types";
import { Base } from "./base";

const Button = props => <Base {...props} />;

export default Button;

// FIXME: Docz is working on making this importable
const buttonTypes = ["submit", "reset", "button"];
Button.propTypes = {
  /** Passes the onClick event to the Tracking context with this action */
  track: t.string,
  children: t.oneOfType([t.func, t.arrayOf(t.func), t.node]).isRequired,
  type: t.oneOf(buttonTypes),
  onClick: t.func,
  asWrapper: t.bool,
  block: t.bool,
  secondary: t.bool,
};
