import React from 'react';
import Downshift from 'downshift';
import styled from 'styled-components';
import Icon from '@rtm-ui/icon';
import Popover from '@rtm-ui/popover';
import { Text } from '@rtm-ui/typography';
import Button from '@rtm-ui/button';
import AuApi from './apis/auApi';
import Mock from './apis/mock';

const InputWrap = styled.div`
  position: relative;
`;

const InputWrapper = ({ hasSelection, children, ...props }) => {
  return <InputWrap {...props}>{children}</InputWrap>;
};

const CancelButton = styled(Button)`
  position: absolute;
  top: 8px;
  right: 5px;
`;

const Input = styled(Text)`
  box-shadow: inset 0 0 0 1px rgba(67, 90, 111, 0.3),
    inset 0 1px 2px rgba(67, 90, 111, 0.14);
  border: none;
  display: block;
  width: 100%;

  &:focus {
    outline: none;
    box-shadow: inset 0 0 2px rgba(67, 90, 111, 0.14), inset 0 0 0 1px #579ad9,
      0 0 0 3px rgba(16, 112, 202, 0.14);
  }
`;

const Item = props => <Text tag="p" {...props} p={2} />;

class AddressSearch extends React.Component {
  render() {
    const Api = { au: AuApi, mock: Mock }[this.props.apiService];
    return (
      <div>
        <Downshift>
          {({
            inputValue,
            getInputProps,
            getLabelProps,
            getItemProps,
            getToggleButtonProps,
            selectedItem,
            highlightedIndex,
            isOpen,
            clearSelection,
          }) => (
            <div>
              {/* eslint-disable-next-line */}
              <label {...getLabelProps({ children: this.props.label })} />
              <Popover
                display="block"
                isControlled
                anchor={
                  <InputWrapper>
                    <Input
                      p={2}
                      {...getInputProps({
                        name: this.props.name,
                        placeholder: this.props.placeholder,
                        isOpen,
                        autoComplete: 'nope',
                        tag: 'input',
                      })}
                    />
                    {selectedItem ? (
                      <CancelButton
                        type="submit"
                        onClick={clearSelection}
                        aria-label="clear selection"
                        asWrapper
                      >
                        <Icon inline glyph="check" />
                      </CancelButton>
                    ) : (
                      <CancelButton
                        {...getToggleButtonProps({ asWrapper: true })}
                      >
                        View
                      </CancelButton>
                    )}
                  </InputWrapper>
                }
              >
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
                    <Api params={{ q: inputValue }}>
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
                          return <Item disabled>Error! {error}</Item>;
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
                    </Api>
                  );
                })()}
              </Popover>
            </div>
          )}
        </Downshift>
      </div>
    );
  }
}

export default AddressSearch;
