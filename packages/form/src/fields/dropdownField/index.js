import { Button } from '@rtm-ui/button';
import { Card } from '@rtm-ui/layout';
import { Header, Label } from '@rtm-ui/typography';
import React from 'react';
import styled from 'styled-components';
import TextField from '../textField';

const ResultsContainer = styled(Card)`
  position: absolute;
  width: 100%;
  top: ${({ distanceFromTop }) => `${distanceFromTop}px`};
  z-index: 100;
`;

const ResultItem = styled(Button)`
  cursor: pointer;
  font-size: 1em;

  :hover,
  :focus {
    background: #eee;
  }
`;

const DropdownField = ({ onWaiting,
  onFocus,
  onBlur,
  fieldUtils,
  config,
  ...inputProps }) => {

  console.log(inputProps.options);


  const inputRef = React.useRef();
  const [hasSelected, setHasSelected] = React.useState(false);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [resultsPosition, setResultsPosition] = React.useState();
  const [hasInteracted, setHasInteracted] = React.useState(false);

  console.log("isModalOpen", isModalOpen);
  console.log("setHasSelected", hasSelected);
  console.log(inputProps);
  console.log("onBlur", onBlur);
  return (
    <div style={{ position: 'relative' }}>

      <div ref={inputRef}>
        <TextField
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
            inputProps.onChange(e);
          }}

        />
      </div>


      {isModalOpen && (
        <div>
          <ResultsContainer distanceFromTop={resultsPosition}>


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
                      config.onDidSelect &&
                        config.onDidSelect(inputProps.name, element.label);
                      fieldUtils.setFieldValue(inputProps.name, element.label);
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
