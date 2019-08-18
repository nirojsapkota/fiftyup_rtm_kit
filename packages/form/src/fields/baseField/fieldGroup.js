import React from 'react';
import { AnimatePresence } from 'framer-motion';

export const FieldGroupContext = React.createContext();

export const FieldGroup = ({ fields, children, values, animate }) => {
  if (animate) {
    const orderedFields = fields.sort(field => {
      // Order the fields so that hidden fields come first.
      // This way we can avoid blank fields during progressive reveal
      if (field.type === 'hidden') {
        return -1;
      } else {
        return 0;
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
