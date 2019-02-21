import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from '@rtm-ui/layout';
import { Header, Label } from '@rtm-ui/typography';
import TextField from '../textField';
import Button from '@rtm-ui/button';
import { useOnClickOutside } from './useOnClickOutside';
import { searchCharacters, useDebounce } from './search';

const ResultsContainer = styled(Card)`
  position: absolute;
  width: 100%;
  top: ${({ distanceFromTop }) => `${distanceFromTop}px`};
`;

const ResultItem = styled(Button)`
  cursor: pointer;

  :hover,
  :focus {
    background: #eee;
  }
`;

const AutocompleteField = ({ onWaiting, fieldUtils, data, ...inputProps }) => {
  const resultsRef = React.useRef();
  const inputRef = React.useRef();
  const [results, setResults] = React.useState([]);
  const [hasSelected, setHasSelected] = React.useState(false);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [resultsPosition, setResultsPosition] = React.useState();
  useOnClickOutside(resultsRef, () => setModalOpen(false));
  const debouncedSearchTerm = useDebounce(inputProps.value, 500);

  React.useEffect(
    () => {
      if (debouncedSearchTerm) {
        !hasSelected && onWaiting('Searching pending...');
        searchCharacters(debouncedSearchTerm, data.autoCompleteUrl).then(
          results => {
            isModalOpen && results.length > 0
              ? onWaiting(`${results.length} results`)
              : onWaiting(``);
            setResults(results);
          }
        );
      } else {
        onWaiting('');
        setResults([]);
      }
    },
    [debouncedSearchTerm]
  );

  React.useEffect(
    () => {
      if (inputProps.value && !hasSelected) {
        // onWaiting('Search pending');
        setModalOpen(true);
      } else {
        setModalOpen(false);
      }
    },
    [inputProps.value]
  );

  React.useEffect(
    () => {
      if (inputRef.current) {
        const position = inputRef.current.getBoundingClientRect();
        if (position) {
          setResultsPosition(position.height + 20);
        }
      }
    },
    [inputRef]
  );

  return (
    <div style={{ position: 'relative' }}>
      <div ref={inputRef}>
        <TextField
          {...inputProps}
          aria-haspopup="listbox"
          onChange={e => {
            setHasSelected(false);
            inputProps.onChange(e);
          }}
        />
      </div>
      {isModalOpen && (
        <div ref={resultsRef}>
          <ResultsContainer distanceFromTop={resultsPosition}>
            {results.map((result, index) => {
              return (
                <Label htmlFor={`result-${inputProps.name}-${index}`}>
                  <ResultItem
                    role="option"
                    aria-selected={result.label === inputProps.value}
                    asWrapper
                    id={`result-${inputProps.name}-${index}`}
                    role="radio"
                    type="button"
                    block
                    style={{ width: '100%' }}
                    onClick={() => {
                      setHasSelected(true);
                      setModalOpen(false);
                      onWaiting('');
                      fieldUtils.setFieldValue(inputProps.name, result.label);
                    }}
                  >
                    <Header tag="h6" weight="thin" p={15}>
                      {result.label}
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

AutocompleteField.propTypes = {
  autoComplete: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  id: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

export default AutocompleteField;
