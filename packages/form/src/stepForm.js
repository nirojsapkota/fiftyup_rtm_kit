import React from 'react';
import PropTypes from 'prop-types';
import Form from './form';
import { FormContext } from './formContext';

const StepForm = ({ steps, ...props }) => {
  const [activeFormId, setActiveFormId] = React.useState(steps[0].id);
  const [values, setValues] = React.useState({});
  const formIds = steps.map(({ id }) => id);

  return (
    <FormContext.Provider value={values}>
      {props.children({
        activeFormId,
        forms: steps.map((form, index) => {
          return props.renderForm({
            ...form,
            onSuccess: ({ id, values: submittedValues }) => {
              const newValues = { ...values, [id]: submittedValues };
              const nextFormId = formIds[formIds.indexOf(id) + 1];
              setActiveFormId(nextFormId);
              setValues(newValues);

              if (index === steps.length - 1) {
                props.onFinalSuccess &&
                  props.onFinalSuccess({ values: newValues });
              } else {
                props.onEachSuccess &&
                  props.onEachSuccess({ values: newValues, nextFormId });
              }
            },
          });
        }),
      })}
    </FormContext.Provider>
  );
};

export default StepForm;
