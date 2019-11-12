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
  height:${({ scrollable }) => { return scrollable ? "200px" : "none"; }};
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

const ArrowIcon = styled(Icon)`
  position: absolute;
  right: 20px;
  top: 1px;
  border:5px solid red;
`;

const DropdownField = ({ onWaiting,
  onFocus,
  onBlur,
  fieldUtils,
  config,
  ...inputProps }) => {

  const inputRef = React.useRef();
  const dropdownRef = React.useRef();
  useOnClickOutside(dropdownRef, () => setModalOpen(false));
  const [hasSelected, setHasSelected] = React.useState(false);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [hasInteracted, setHasInteracted] = React.useState(false);
  const [currentElement, setCurrentElement] = React.useState('');


  return (
    <div style={{ position: 'relative' }}>

      <div ref={inputRef}>
        <DropdownTextBox
          {...inputProps}

          aria-haspopup="listbox"

          onFocus={() => {
            setModalOpen(true);
            setHasInteracted(true);
            onFocus();
          }}

          onBlur={() => {
            onBlur();
          }}

          onChange={e => {
            setHasSelected(false);
            setHasInteracted(true);
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

        <Box style={
          {
            position: 'relative',
            width: 'auto',
            float: 'right',
            top: '-35px'
          }
        }>
          <Icon
            rotate={true ? -90 : 60}
            glyph="view-back"
          />
        </Box>


      </div>
      {isModalOpen && (
        <div ref={dropdownRef}>
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
                      setHasSelected(true);
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
