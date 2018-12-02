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
            console.log(meh);
            const {
              inputValue,
              getInputProps,
              getLabelProps,
              getMenuProps,
              getItemProps,
              getToggleButtonProps,
              selectedItem,
              highlightedIndex,
              isOpen,
              clearSelection,
            } = meh;
            return (
              <div style={{ width: 250, margin: 'auto', position: 'relative' }}>
                <label {...getLabelProps()}>Select a Github repository</label>
                <div style={{ position: 'relative' }}>
                  <input
                    {...getInputProps({
                      isOpen,
                      placeholder: 'Search repository',
                    })}
                  />
                  {selectedItem ? (
                    <button
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
                        {({ loading, error, data: { items = [] } = {} }) => {
                          if (loading) {
                            return <Item disabled>Loading...</Item>;
                          }

                          if (error) {
                            return <Item disabled>Error! ${error}</Item>;
                          }

                          if (!items.length) {
                            return <Item disabled>No repositories found</Item>;
                          }

                          return items.map(({ id, name: item }, index) => (
                            <Item
                              key={id}
                              {...getItemProps({
                                item,
                                index,
                                isActive: highlightedIndex === index,
                                isSelected: selectedItem === item,
                              })}
                            >
                              {item}
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
