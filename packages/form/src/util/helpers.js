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
    .filter(({ config: { validator } }) => validator)
    .forEach(({ name, config: { validator, validatorArgs } }) => {
      validationSchema[name] = validatorArgs
        ? validatorMap[`${validator}Validator`](...validatorArgs)
        : validatorMap[`${validator}Validator`];
    });

  return Yup.object().shape(validationSchema);
};

export const getInitialValues = fields => {
  const initialValues = {};
  fields.forEach(({ name, initialValue }) => {
    initialValues[name] = initialValue || '';
  });
  return initialValues;
};

export const setupForm = fields => {
  return {
    validationSchema: getSchema(fields),
    initialValues: getInitialValues(fields),
  };
};

export const getFieldErrors = (rest, field) => {
  const { errors, touched } = rest;
  if (errors[field.name] && touched[field.name]) {
    return errors[field.name];
  }

  return false;
};
