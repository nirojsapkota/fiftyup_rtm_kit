import React from 'react';
import { Machine, assign, spawn, send, sendParent } from 'xstate';
import { useMachine, useService } from '@xstate/react';
import { useOnClickOutside } from '../fields/autocompleteField/useOnClickOutside';
import { useDebounce } from '../fields/autocompleteField/useDebounce';
import styled from 'styled-components';

const Dropdown = styled.div``;

export const ComboBox = props => {
  return (
    <>
      <div>
        <button>Toggle dropdown</button>
      </div>
      <hr />
      <input type="text" />
      <Dropdown />
    </>
  );
};
