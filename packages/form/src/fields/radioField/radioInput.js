import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@rtm-ui/layout';
import styled from 'styled-components';
import Icon from '../../../../icon/src';

const RadioContainer = styled(Box)`
  position: relative;
`;

const InvisibleInput = styled.input`
  top: 0;
  left: 0;
  margin: 0;
  opacity: 0;
  padding: 0;
  z-index: 2;
  position: absolute;
`;

const StyledRadio = styled.div`
  cursor: pointer;
  position: relative;
  z-index: 1;
  white-space: nowrap;
`;

export const RadioInput = props => {
  return (
    <RadioContainer>
      {/* TODO: ensure the ref signals when this is tabbed on */}
      <InvisibleInput
        type="radio"
        id={props.id}
        data-testId={props.id}
        disabled={props.disabled}
        defaultChecked={props.selected}
        onClick={props.onClick}
      />
      <StyledRadio onClick={props.onClick}>
        <Icon size={22} glyph={props.selected ? 'radio-active' : 'radio'} />
      </StyledRadio>
    </RadioContainer>
  );
};
