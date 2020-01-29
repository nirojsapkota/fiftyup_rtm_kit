import React from 'react';
import { AnimatePresence } from 'framer-motion';

export const FieldGroupContext = React.createContext();

export const FieldGroup = ({ fields, children, values, animate }) => {
  if (animate) {
    const orderedFields = fields.sort((field1, field2) => {
      // Order the fields so that hidden fields come first.
      // This way we can avoid blank fields during progressive reveal
      // Basically return -1 for ordering the first compared element to lower index and 1 for reverse.
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
      if (field1.type === 'hidden') {
        return -1;
      }
      if (field2.type === 'hidden') {
        return 1;
      }
    });
    const fieldsWithValues = orderedFields.filter(({ name }) => {
      return values[name];
    });
    const lastFieldWithValue = fieldsWithValues[fieldsWithValues.length - 1];
    const lastFieldWithValueIndex =
      fieldsWithValues.findIndex(
        ({ name }) => name === lastFieldWithValue.name
      ) || 0;

    const newFields =
      lastFieldWithValueIndex < fields.length - 1
        ? [fields[lastFieldWithValueIndex + 1]]
        : [];
    const fieldsToShow = [...fieldsWithValues, ...newFields];

    return (
      <FieldGroupContext.Provider value={{ shouldAnimate: true }}>
        <AnimatePresence initial={false}>
          {fieldsToShow.map(field => {
            return children(field);
          })}
        </AnimatePresence>
      </FieldGroupContext.Provider>
    );
  } else {
    return (
      <FieldGroupContext.Provider value={{ shouldAnimate: false }}>
        {fields.map(field => children(field))}
      </FieldGroupContext.Provider>
    );
  }
};
