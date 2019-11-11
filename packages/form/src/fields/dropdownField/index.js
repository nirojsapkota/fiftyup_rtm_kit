import { Button } from '@rtm-ui/button';
import { Card } from '@rtm-ui/layout';
import { Header, Label } from '@rtm-ui/typography';
import React from 'react';
import styled from 'styled-components';
import TextField from '../textField';
import { useDebounce } from './useDebounce';
import { useOnClickOutside } from './useOnClickOutside';

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

const DropdownField = ({
  onWaiting,
  onFocus,
  onBlur,
  fieldUtils,
  config,
  ...inputProps
}) => {

  console.log(props);

  const resultsRef = React.useRef();
  const inputRef = React.useRef();
  const [results, setResults] = React.useState([]);
  const [hasSelected, setHasSelected] = React.useState(false);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [resultsPosition, setResultsPosition] = React.useState();
  useOnClickOutside(resultsRef, () => setModalOpen(false));
  const debouncedSearchTerm = useDebounce(inputProps.value, 500);
  const [hasInteracted, setHasInteracted] = React.useState(false);

  React.useEffect(() => {
    if (debouncedSearchTerm) {
      !hasSelected && onWaiting('Searching pending...');
      config.searchFunction(debouncedSearchTerm).then(results => {
        results.length > 0
          ? isModalOpen
            ? onWaiting(`${results.length} results`)
            : onWaiting(``)
          : (onWaiting(``), config.onEmptyResult());
        setResults(results);
      });
    } else {
      onWaiting('');
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  React.useEffect(() => {
    if (inputProps.value && !hasSelected && hasInteracted) {
      // onWaiting('Search pending');
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [inputProps.value]);

  React.useEffect(() => {
    if (inputRef.current) {
      const position = inputRef.current.getBoundingClientRect();
      if (position) {
        setResultsPosition(position.height + 20);
      }
    }
  }, [inputRef]);

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
          onBlur={onBlur}
          onChange={e => {
            setHasSelected(false);
            setHasInteracted(true);
            inputProps.onChange(e);
          }}
        />
      </div>
      {isModalOpen && (
        <div ref={resultsRef}>
          <ResultsContainer distanceFromTop={resultsPosition}>
            {results.map((result, index) => {
              return (
                <Label
                  htmlFor={`result-${inputProps.name}-${index}`}
                  key={result.label}
                >
                  <ResultItem
                    aria-selected={result.label === inputProps.value}
                    asWrapper
                    id={`result-${inputProps.name}-${index}`}
                    type="button"
                    block
                    style={{ width: '100%' }}
                    onClick={() => {
                      setHasSelected(true);
                      setModalOpen(false);
                      onWaiting('');
                      config.onDidSelect &&
                        config.onDidSelect(inputProps.name, result.label);
                      fieldUtils.setFieldValue(inputProps.name, result.label);
                    }}
                  >
                    <Header tag="h6" align="left" weight="thin" p={15}>
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


export default DropdownField;
