import { createAutoCorrectedDatePipe } from 'text-mask-addons';

// prettier-ignore
const maskPatterns = {
  // TODO: probably should show a nicer looking output
  phoneUS: ['+', '1', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  dateUS: [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
  ssn: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
};

// https://github.com/text-mask/text-mask/tree/master/addons#pipes
// Pipes allow us to add additional constraints to a pattern
export const pipes = {
  dateUS: createAutoCorrectedDatePipe('mm/dd/yyyy'),
};

export default maskPatterns;
