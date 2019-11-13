import { Button } from '@rtm-ui/button';
import { Icon } from '@rtm-ui/icon';
import { Box, Card } from '@rtm-ui/layout';
import { Header, Label } from '@rtm-ui/typography';
import React from 'react';
import styled from 'styled-components';
import { useOnClickOutside } from '../autocompleteField/useOnClickOutside';
import TextField from '../textField';

const ResultsContainer = styled(Card)`
  position: absolute;
  width: 100%;
  z-index: 100;
  height:${({ scrollable }) => { return scrollable ? "204px" : "none"; }};
  overflow:${({ scrollable }) => { return scrollable ? "auto" : "none"; }};
`;

const ResultItem = styled(Button)`
  cursor: pointer;
  font-size: 1em;
  :hover,
  :focus {
    background: #eee;
  }
`;

const DropdownTextBox = styled(TextField)`
border:1px solid #ccc;
cursor: default;
:hover, focus {
  pointer:cursor;
  outline:none;
}
`;

const DropdownField = ({ onWaiting,
  onFocus,
  onBlur,
  fieldUtils,
  config,
  ...inputProps }) => {

  const dropdownRef = React.useRef();
  useOnClickOutside(dropdownRef, () => setModalOpen(false));
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [currentElement, setCurrentElement] = React.useState('');

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <div>
        <DropdownTextBox
          {...inputProps}
          aria-haspopup="listbox"
          onFocus={() => {
            setModalOpen(true);
          }}
          onClick={() => {
            if (inputProps.value == '') {
              if (isModalOpen == false) {
                setModalOpen(true);
              }
            }
          }}
          value={currentElement}
        />
        <Box onClick={() => setModalOpen(!isModalOpen)}
          style={
            {
              position: 'relative',
              width: 'auto',
              float: 'right',
              top: '-35px'
            }
          }>
          <Icon
            rotate={isModalOpen ? 90 : 270}
            glyph="view-back"
          />
        </Box>
      </div>
      {isModalOpen && (
        <div>
          <ResultsContainer scrollable={config.scrollable}>
            {inputProps.options.map((element, index) => {
              return (
                <Label
                  htmlFor={`element-${inputProps.name}-${index}`}
                  key={element.label}
                >
                  <ResultItem
                    aria-selected={element.label === inputProps.value}
                    asWrapper
                    id={`element-${inputProps.name}-${index}`}
                    type="button"
                    block
                    style={{ width: '100%' }}
                    onClick={() => {
                      setModalOpen(false);
                      onWaiting('');
                      fieldUtils.setFieldValue(inputProps.name, element.value);
                      setCurrentElement(element.label);
                    }}
                  >
                    <Header tag="h6" align="left" weight="thin" p={15}>
                      {element.label}
                    </Header>
                  </ResultItem>
                </Label>
              );
            })}
          </ResultsContainer>
        </div>
      )}
    </div>
  );
};

export default DropdownField;
