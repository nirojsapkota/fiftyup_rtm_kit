import { Button } from '@rtm-ui/button';
import { Card } from '@rtm-ui/layout';
import { Header, Label } from '@rtm-ui/typography';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import TextField from '../textField';
import { useOnClickOutside } from '../autocompleteField/useOnClickOutside';
import PlacesAutocomplete, {
  geocodeByPlaceId,
} from 'react-places-autocomplete';

const ResultsContainer = styled(Card)`
  position: absolute;
  width: 100%;
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

/**
 * break down into address component
 * These much info is enough for now
 */
const componentForm = {
  subpremise: 'short_name',
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name',
};

const parseAddress = (formatted_address, { address_components }) => {
  /**
   * Keep this log, which is used for spying on test
   */
  console.log(`parsing ${formatted_address}`);
  let returnObj = { formatted_address };
  address_components.map(component => {
    const addressTypes = component.types[0];
    if (componentForm[addressTypes]) {
      returnObj[addressTypes] = component[componentForm[addressTypes]];
    }
  });
  return returnObj;
};

const GoogleAddressAutocompleteField = ({
  onWaiting,
  onFocus,
  onBlur,
  fieldUtils,
  config,
  onChange,
  ...inputProps
}) => {
  // destructured onChange as the PlacesAutocomplete has it's own onChange implementation and would override
  const resultsRef = React.useRef();
  const inputRef = React.useRef();
  const [hasSelected, setHasSelected] = React.useState(false);
  const [isModalOpen, setModalOpen] = React.useState(false);
  // const [resultsPosition, setResultsPosition] = React.useState();
  useOnClickOutside(resultsRef, () => setModalOpen(false));
  const [hasInteracted, setHasInteracted] = React.useState(false);
  const [address, setAddress] = React.useState(inputProps.value || '');
  const [suggestionHint, setSuggestionHint] = React.useState(
    'Start typing address'
  );

  React.useEffect(() => {
    if (address && !hasSelected && hasInteracted) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }, [address]);

  // input element onchange handler
  const handleChange = addr => {
    if (addr) {
      if (addr.length < 6) {
        setSuggestionHint('Need more characters');
      }
    } else {
      setSuggestionHint('Start typing address');
    }
    setHasInteracted(true);
    setHasSelected(false);
    setAddress(addr);
  };

  const handleSelect = (address, placeId) => {
    setHasSelected(true);
    setModalOpen(false);
    onWaiting('');
    setSuggestionHint('');
    setAddress(address);
    fieldUtils.setFieldValue(inputProps.name, address);
    placeId &&
      config.onDidSelect &&
      geocodeByPlaceId(placeId)
        .then(result => {
          const [address_components] = result;
          config.onDidSelect(parseAddress(address, address_components));
        })
        .catch(error => console.error('Error', error));
  };

  const onError = (status, clearSuggestions) => {
    setSuggestionHint('No matches');
    clearSuggestions();
    config.onEmptyResult && config.onEmptyResult(status);
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
      searchOptions={config.searchOptions}
      onError={onError}
      highlightFirstSuggestion
      debounce={500}
      shouldFetchSuggestions={
        config.minInputLength ? address.length > config.minInputLength : true
      }
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
        loading && setSuggestionHint('Searching');
        return (
          <div style={{ position: 'relative' }}>
            <div ref={inputRef}>
              <TextField
                {...inputProps}
                {...getInputProps()}
                aria-haspopup="listbox"
                onFocus={e => {
                  setModalOpen(true);
                  setHasInteracted(true);
                  typeof onFocus === 'function' && onFocus(e);
                }}
                onBlur={onBlur}
              />
            </div>
            {isModalOpen && (
              <div ref={resultsRef}>
                <ResultsContainer>
                  {suggestions.length > 0
                    ? suggestions.map((result, index) => {
                        return (
                          <Label
                            {...getSuggestionItemProps(result)}
                            htmlFor={`result-${inputProps.name}-${index}`}
                            key={result.description}
                          >
                            <ResultItem
                              aria-selected={
                                result.description === inputProps.value
                              }
                              asWrapper
                              id={`result-${inputProps.name}-${index}`}
                              type="button"
                              block
                              style={
                                result.active
                                  ? { width: '100%', background: '#eee' }
                                  : { width: '100%' }
                              }
                            >
                              <Header
                                tag="h6"
                                align="left"
                                weight="thin"
                                p={15}
                              >
                                {result.description}
                              </Header>
                            </ResultItem>
                          </Label>
                        );
                      })
                    : suggestionHint && (
                        <Label htmlFor={`no-result`} key="no-result">
                          <Header
                            data-testid="no-result"
                            tag="h6"
                            align="left"
                            weight="thin"
                            p={15}
                          >
                            {suggestionHint}
                          </Header>
                        </Label>
                      )}
                </ResultsContainer>
              </div>
            )}
          </div>
        );
      }}
    </PlacesAutocomplete>
  );
};

GoogleAddressAutocompleteField.propTypes = {
  autoComplete: PropTypes.string,
  name: PropTypes.string,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  config: PropTypes.shape({
    searchOptions: PropTypes.shape({
      componentRestrictions: PropTypes.shape({}),
      types: PropTypes.array,
    }),
    onDidSelect: PropTypes.func,
    onEmptyResult: PropTypes.func,
    minInputLength: PropTypes.number,
  }),
};

export default GoogleAddressAutocompleteField;
