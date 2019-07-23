import React from 'react';
import { AnimatePresence } from 'framer-motion';

export const FieldGroupContext = React.createContext();

export const FieldGroup = ({ fields, children, values, animate }) => {
  if (animate) {
    const fieldsWithValues = fields.filter(({ name }) => {
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
