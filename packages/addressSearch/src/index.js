import React from 'react';
import Downshift from 'downshift';
import Axios from './axios';

const baseEndpoint = 'https://api.github.com/search/repositories';

const Item = props => <div {...props} />;

class AxiosExample extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: 50,
        }}
      >
        <Downshift>
          {meh => {
            const {
              inputValue,
              getInputProps,
              getLabelProps,
              getItemProps,
              getToggleButtonProps,
              selectedItem,
              highlightedIndex,
              isOpen,
              clearSelection,
            } = meh;
            return (
              <div style={{ width: 250, margin: 'auto', position: 'relative' }}>
                <label {...getLabelProps()}>
                  Start typing and select from the list:
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    {...getInputProps({
                      autocomplete: 'nope',
                      isOpen,
                      placeholder: 'Search address',
                    })}
                  />
                  {selectedItem ? (
                    <button
                      type="submit"
                      onClick={clearSelection}
                      aria-label="clear selection"
                    >
                      X
                    </button>
                  ) : (
                    <button {...getToggleButtonProps()}>Arr</button>
                  )}
                </div>
                <div>
                  {(() => {
                    if (!isOpen) {
                      return null;
                    }

                    if (!inputValue) {
                      return (
                        <Item disabled>You have to enter a search query</Item>
                      );
                    }

                    return (
                      <Axios url={baseEndpoint} params={{ q: inputValue }}>
                        {({
                          loading,
                          error,
                          moreChar,
                          data: { items = [] } = {},
                        }) => {
                          if (moreChar) {
                            return (
                              <Item disabled>More characters needed...</Item>
                            );
                          }
                          if (loading && !items.length) {
                            return <Item disabled>Loading...</Item>;
                          }

                          if (error) {
                            return <Item disabled>Error! ${error}</Item>;
                          }

                          if (!items.length) {
                            return <Item disabled>No address found</Item>;
                          }

                          return items.map(({ id, Picklist }, index) => (
                            <Item
                              key={id}
                              {...getItemProps({
                                item: Picklist,
                                index,
                                isActive: highlightedIndex === index,
                                isSelected: selectedItem === Picklist,
                              })}
                            >
                              {Picklist}
                            </Item>
                          ));
                        }}
                      </Axios>
                    );
                  })()}
                </div>
              </div>
            );
          }}
        </Downshift>
      </div>
    );
  }
}

export default AxiosExample;
