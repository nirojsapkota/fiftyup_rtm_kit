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

// 4 Digit AU Postcode Validation
export const postcodeValidator = Yup.string()
  .required('Required')
  .matches(
    /^[0-9]{4}(,\s*)([A-Za-z]+(?:\s[A-Za-z]+)*)$/,
    'Please select postcode and suburb from the dropdown list'
  );

// 5 Digit US Zipcode Validation
export const zipcodeValidator = Yup.string()
  .required('Required')
  .matches(
    /^[0-9]{5}(,\s*)([A-Za-z]+(?:\s[A-Za-z]+)*)$/,
    'Please select zipcode and city from the dropdown list'
  );

// IE County Validation
export const countyValidator = Yup.string()
  .required('Required')
  .matches(/[A-Za-z]+/, 'Please select county from the dropdown list');

export const monthValidator = Yup.string()
  .required('Required')
  .matches(
    /^[A-Za-z]{3},\s([0-9]{4})$/,
    'Please select month and year from the dropdown'
  );

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
