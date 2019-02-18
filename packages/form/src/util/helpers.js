import * as Yup from 'yup';
import {
  maskValidator,
  requiredValidator,
  requiredRadioValidator,
  emailValidator,
  passwordConfirmValidator,
  passwordComplexityValidator,
  zipcodeValidator,
} from '../fields/util/validators';

const validatorMap = {
  maskValidator,
  requiredValidator,
  requiredRadioValidator,
  emailValidator,
  passwordConfirmValidator,
  passwordComplexityValidator,
  zipcodeValidator,
};

export const getSchema = fields => {
  const validationSchema = {};
  fields
    .filter(({ validator }) => validator)
    .forEach(({ name, validator, validatorArgs }) => {
      validationSchema[name] = validatorArgs
        ? validatorMap[`${validator}Validator`](...validatorArgs)
        : validatorMap[`${validator}Validator`];
    });

  return Yup.object().shape(validationSchema);
};

export const getInitialValues = (fields, formId, storedValues) => {
  const initialValues = {};
  fields.forEach(({ name, initialValue }) => {
    initialValues[name] = initialValue || storedValues[name] || '';
  });
  return initialValues;
};

export const setupForm = (fields, formId, storedValues) => {
  return {
    validationSchema: getSchema(fields),
    initialValues: getInitialValues(fields, formId, storedValues),
  };
};

export const getFormErrors = error => {};

export const getFieldErrors = (rest = {}, field) => {
  const { errors = [], touched = [] } = rest;
  if (errors[field.name] && touched[field.name]) {
    return errors[field.name];
  }

  return false;
};
