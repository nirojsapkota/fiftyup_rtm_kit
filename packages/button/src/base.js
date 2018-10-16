import React from "react";
import t from "prop-types";
import { StyledButton, WrapperButton } from "./style";

export const Base = ({
  track,
  onClick,
  children,
  asWrapper,
  ...buttonProps
}) => {
  const Component = asWrapper ? WrapperButton : StyledButton;

  return (
    <Component onClick={onClick} {...buttonProps}>
      {children}
    </Component>
  );
};

Base.propTypes = {
  track: t.string,
  children: t.node.isRequired,
  onClick: t.func,
  block: t.bool,
  asWrapper: t.bool,
};
