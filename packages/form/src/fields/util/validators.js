import * as Yup from 'yup';
import maskPatterns from './maskPatterns';

export const maskValidator = (regex, fieldName) => {
  return Yup.string()
    .required('Required')
    .min(maskPatterns[regex].length, 'Not enough characters')
    .test('matches-mask', `Invalid ${fieldName}`, (value = '') => {
      const matches = [...value].every((char, index) => {
        const pattern = maskPatterns[regex][index];
        try {
          return char.match(new RegExp(pattern));
        } catch (e) {
          return pattern === char;
        }
      });
      return matches;
    });
};

export const zipcodeValidator = Yup.string()
  .required('Required')
  .min(4, 'Must be 4 digits');

export const requiredValidator = Yup.string().required('Required');
export const requiredRadioValidator = Yup.string().required(
  'Please select an option'
);

export const emailValidator = Yup.string()
  .email('Invalid email address')
  .required('Required');

export const passwordConfirmValidator = passwordFieldName =>
  Yup.string()
    .oneOf([Yup.ref(passwordFieldName), null], "Passwords don't match")
    .required(`Confirm ${passwordFieldName} is required`);

export const dropdownValidator = options => {
  return Yup.string()
    .oneOf(options, 'Please select from the dropdown list')
    .required('Required');
};

export const passwordComplexityValidator = Yup.string();
