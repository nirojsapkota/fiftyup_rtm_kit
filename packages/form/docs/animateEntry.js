import React from 'react';
import { useForm, useFieldGroup, Field } from '../src';
import { motion, AnimatePresence } from 'framer-motion';
import { simple } from './xsample';

export const FieldGroup = ({ service }) => {
  const { fields, nextMachine, groupIsValidating } = useFieldGroup(service);

  return (
    <>
      {fields.map(field => (
        <Field
          key={field.name}
          groupIsValidating={groupIsValidating}
          machine={field.machine}
        />
      ))}
      <AnimatePresence>
        {nextMachine && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
          >
            <FieldGroup service={nextMachine} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const AnimateEntry = _props => {
  const props = simple; // Just an example - use props passed in
  const { fieldGroupMachine } = useForm(props);

  return <>{fieldGroupMachine && <FieldGroup service={fieldGroupMachine} />}</>;
};
