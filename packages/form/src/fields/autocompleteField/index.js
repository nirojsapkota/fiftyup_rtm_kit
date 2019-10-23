import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Card } from '@rtm-ui/layout';
import { Header, Label } from '@rtm-ui/typography';
import { Button } from '@rtm-ui/button';
import TextField from '../textField';
import { useOnClickOutside } from './useOnClickOutside';
import { useDebounce } from './useDebounce';

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

const AutocompleteField = ({
  onWaiting,
  onFocus,
  onBlur,
  fieldUtils,
  config,
  ...inputProps
}) => {
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
          onFocus={e => {
            setModalOpen(true);
            setHasInteracted(true);
            typeof onFocus === 'function' && onFocus(e);
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
                      onBlur(); // FIXME
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
