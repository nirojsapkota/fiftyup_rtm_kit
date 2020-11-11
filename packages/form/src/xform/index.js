/* istanbul ignore file */
// FIXME: This file is currently excluded in the
// coverage checks. Please remove the istanbul comment above once
// the tests passes the required 95% test coverage.

import React from 'react';
import { Machine, assign, spawn, send, sendParent } from 'xstate';
import { useMachine, useService } from '@xstate/react';
import BaseField from '../fields/baseField';
import {
  maskValidator,
  requiredValidator,
  requiredRadioValidator,
  requiredRadioTermsValidator,
  emailValidator,
  passwordConfirmValidator,
  passwordComplexityValidator,
  zipcodeValidator,
  postcodeValidator,
  countyValidator,
  dropdownValidator,
} from '../fields/util/validators';
const validatorMap = {
  maskValidator,
  requiredValidator,
  requiredRadioValidator,
  requiredRadioTermsValidator,
  emailValidator,
  passwordConfirmValidator,
  passwordComplexityValidator,
  zipcodeValidator,
  postcodeValidator,
  countyValidator,
  dropdownValidator,
};

/**
 *
 *
 * Helpers
 *
 *
 */
const getFieldMachine = (machineName, field) => {
  const machineMap = {
    text: textMachine,
    radio: radioMachine,
    check: radioMachine,
  };

  let context = field;
  let machine = machineMap[machineName];

  // If we have a radio field with only one value
  // we can skip to it's validation step
  if (machineName === 'radio' && field.options.length === 1) {
    context = { ...field, value: field.options[0].value, type: 'hidden' };
    machine = {
      ...machine,
      states: {
        ...machine.states,
        completion: {
          ...machine.states.completion,
          initial: 'complete', // move to complete
        },
        validity: {
          ...machine.states.validity,
          initial: 'validating', // this will trigger the field group submission
        },
      },
    };
  }

  return {
    ...machine,
    id: field.name,
    context,
  };
};

const getFieldValues = fields => {
  const submissionObject = {};
  fields.map(({ machine }) => {
    const { name, value } = machine.state.context;
    submissionObject[name] = value;
  });

  return submissionObject;
};

/**
 *
 *
 * Field machine logic
 *
 *
 */
export const fieldConfig = {
  actions: {
    change: assign({
      value: (_, event) => {
        return event.value;
      },
      validatorArgs: (_, event) => {
        return event.validatorArgs;
      },
      validator: (_, event) => {
        return event.validator;
      },
    }),
    assignValidatorArgs: assign({
      validatorArgs: (_, event) => {
        return event.validatorArgs;
      },
      validator: (_, event) => {
        return event.validator;
      },
    }),
    assignError: assign({
      error: (_, event) => {
        return event.data.message;
      },
    }),
    removeError: assign({
      error: null,
    }),
    notifyParentTouched: sendParent(context => ({
      type: 'fieldTouched',
      data: context,
    })),
    notifyParentComplete: sendParent(context => ({
      type: 'fieldComplete',
      data: context,
    })),
    notifyParentIncomplete: sendParent(context => ({
      type: 'fieldIncomplete',
      data: context,
    })),
    notifyParentUnknown: sendParent(() => ({
      type: 'fieldUnknown',
    })),
    notifyParentInvalid: sendParent(() => ({
      type: 'fieldInvalid',
    })),
    notifyParentValid: sendParent(context => ({
      type: 'fieldValid',
      data: context,
    })),
  },
  guards: {
    hasValue: context => {
      return !!context.value;
    },
    autoValidateValues: context => {
      return !!context.value && !!context.autoValidate;
    },
  },
  services: {
    validateField: async (context) => {
      const validatorArgs = context.validatorArgs
      const validator = context.validator
      if (context.config.validate_if) {
        // Use the validator in the context rather than context.config
        // These are validator manipulated/set from the component
        if (validatorArgs) {
          await validatorMap[`${validator}Validator`](...validatorArgs).validate(context.value);
        } else if (validator) {
          await validatorMap[`${validator}Validator`].validate(context.value);
        } else {
          // do nothing
        }
      } else {
        // Use the validator in the context.config
        if (context.config.validatorArgs) {
          await validatorMap[`${context.config.validator}Validator`](...validatorArgs).validate(context.value);
        } else if (context.config.validator) {
          await validatorMap[`${context.config.validator}Validator`].validate(context.value);
        } else {
          // do nothing
        }
      }
    },
  },
};

export const textMachine = {
  type: 'parallel',
  states: {
    focus: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            change: {
              actions: ['change', 'assignValidatorArgs', 'removeError'],
              target: 'touched',
            },
          },
        },
        touched: {
          on: {
            change: {
              actions: ['change', 'assignValidatorArgs', 'removeError'],
            },
          },
        },
      },
    },
    completion: {
      initial: 'unknown',
      states: {
        unknown: {
          on: {
            '': [{ target: 'complete', cond: 'autoValidateValues' }, { target: 'idle' }],
          },
        },
        idle: {
          entry: 'notifyParentIncomplete',
          on: {
            complete: 'complete',
          },
        },
        complete: {
          entry: 'notifyParentComplete',
          on: {
            change: 'idle',
          },
        },
      },
    },
    validity: {
      initial: 'unknown',
      states: {
        unknown: {
          on: {
            '': [
              { target: 'validating', cond: 'autoValidateValues' },
              { target: 'idle' },
            ],
          },
        },
        idle: {
          on: {
            validate: 'validating',
          },
        },
        validating: {
          entry: ['assignValidatorArgs'],
          invoke: {
            src: 'validateField',
            onDone: 'valid',
            onError: {
              target: 'invalid',
              actions: 'assignError',
            },
          },
        },
        invalid: {
          entry: ['notifyParentInvalid'],
          on: {
            change: 'unknown',
            validate: 'validating',
          },
        },
        valid: {
          entry: ['notifyParentValid', 'removeError'],
          on: {
            change: 'unknown',
            validate: 'validating',
          },
        },
      },
    },
  },
};

export const radioMachine = {
  type: 'parallel',
  states: {
    focus: {
      initial: 'idle',
      states: {
        idle: {
          on: {
            change: {
              actions: ['change', 'assignValidatorArgs', 'removeError'],
              target: 'touched',
            },
          },
        },
        touched: {
          on: {
            change: {
              actions: ['change', 'assignValidatorArgs', 'removeError'],
            },
          },
        },
      },
    },
    completion: {
      initial: 'idle',
      states: {
        idle: {
          entry: 'notifyParentIncomplete',
          on: {
            change: 'complete',
          },
        },
        complete: {
          entry: 'notifyParentComplete',
          on: {
            change: { actions: 'notifyParentIncomplete' },
          },
        },
      },
    },
    validity: {
      initial: 'unknown',
      states: {
        unknown: {
          on: {
            '': [
              { target: 'validating', cond: 'autoValidateValues' },
              { target: 'idle' },
            ],
          },
        },
        idle: {
          on: {
            validate: 'validating',
          },
        },
        validating: {
          entry: ['assignValidatorArgs'],
          invoke: {
            src: 'validateField',
            onDone: 'valid',
            onError: {
              target: 'invalid',
              actions: 'assignError',
            },
          },
        },
        invalid: {
          entry: ['notifyParentInvalid'],
          on: {
            change: 'unknown',
            validate: 'validating',
          },
        },
        valid: {
          entry: ['notifyParentValid', 'removeError'],
          on: {
            change: 'unknown',
            validate: 'validating',
          },
        },
      },
    },
  },
};

/**
 *
 *
 * Field group machine logic
 *
 *
 */
const fieldGroupConfig = {
  actions: {
    assignNext: assign({
      nextMachine: (context, event) => {
        const name = event.data.fields.map(({ name }) => name).join('-');

        // NOTE: This check allows us to preserve a machine that's
        // already been spawned. There's probably a better way to do this
        // but right now the thought is that we only want to preserve
        // child machines when we know it wont change, so if we have
        // context.nextFn we can't be sure it wouldn't change so we
        // need to spawn again - which will wipe out it's values
        if (context.nextMachine && context.next) {
          return context.nextMachine;
        }

        return spawn(
          Machine(
            fieldGroupMachineConfig(context.options),
            fieldGroupConfig
          ).withContext({
            ...event.data,
            options: context.options,
          }),
          `group-${name}`
        );
      },
    }),
    sendRequestToSubmit: send('parentRequestSubmitting', {
      to: context => context.nextMachine,
    }),
    spawn: assign({
      fields: (context, event) =>
        context.fields.map(field => ({
          ...field,
          machine: field.machine
            ? field.machine
            : spawn(
                Machine(getFieldMachine(field.config.machine, field), {
                  ...fieldConfig,
                  sync: true,
                }),
                `field-${field.name}`
              ),
        })),
    }),
    notifyParentSubmitting: sendParent((context, event) => {
      const submissionObject = {};
      context.fields.map(({ machine }) => {
        const { name, value } = machine.state.context;
        submissionObject[name] = value;
      });

      return {
        type: 'bubble',
        data: { ...event.data, ...submissionObject },
      };
    }),
  },
  guards: {
    allFieldsComplete: (context, event) => {
      return context.fields
        .map(({ machine }) => machine.state)
        .every(state => state.matches('completion.complete'));
    },
    allFieldsValid: (context, event) => {
      return context.fields
        .map(({ machine }) => machine.state)
        .every(state => state.matches('validity.valid'));
    },
  },
  services: {
    getNextFieldGroup: async context => {
      if (context.onSubmit) {
        await context.onSubmit(getFieldValues(context.fields));
      }

      try {
        if (context.nextFn) {
          return context.nextFn(
            context.fields.map(({ machine }) => machine.state.context)
          );
        }
        if (context.next) {
          return context.next;
        }
      } catch (e) {
        console.error(e);
      }

      // We're treating a rejected promise as a way of saying we have no 'next'
      // fields to show, so let's trigger the form submission instead
      throw new Error('No next fields defined, should submit instead');
    },
  },
};

const fieldGroupMachineConfig = options => ({
  initial: 'init',
  states: {
    init: {
      on: {
        '': {
          target: 'notReady',
          actions: 'spawn',
        },
      },
    },
    notReady: {
      on: {
        submit: 'validating',
        fieldComplete: options.autoComplete
          ? {
              target: 'validating',
              cond: 'allFieldsComplete',
            }
          : {},
      },
    },
    validating: {
      on: {
        fieldInvalid: {
          target: 'notReady',
        },
        fieldValid: {
          target: 'invoking',
          cond: 'allFieldsValid',
        },
      },
    },
    invoking: {
      invoke: {
        src: 'getNextFieldGroup',
        onDone: {
          target: 'groupReady.passThru',
          actions: 'assignNext',
        },
        onError: {
          target: 'groupReady.submitter',
        },
      },
    },
    groupReady: {
      on: {
        fieldIncomplete: options.autoComplete ? 'validating' : 'notReady',
      },
      states: {
        passThru: {
          entry: 'sendRequestToSubmit',
          on: {
            parentRequestSubmitting: { actions: 'sendRequestToSubmit' },
            bubble: { actions: 'notifyParentSubmitting' },
          },
        },
        submitter: {
          entry: 'notifyParentSubmitting',
          on: {
            parentRequestSubmitting: { actions: 'notifyParentSubmitting' },
          },
        },
      },
    },
  },
});

/**
 *
 *
 * Form machine logic
 *
 *
 */
const formConfig = {
  actions: {
    // "Attempted to spawn an Actor" warning is tracked here
    // https://github.com/davidkpiano/xstate/issues/757
    assignInitialFieldGroup: assign({
      nextMachine: context => {
        const name = context.next.context.fields
          .map(({ name }) => name)
          .join('-');

        return spawn(
          Machine({ ...context.next, id: `group-${name}` }, fieldGroupConfig),
          `group-${name}`
        );
      },
    }),
  },
};

const formMachine = {
  initial: 'idle',
  states: {
    idle: {
      entry: 'assignInitialFieldGroup',
      on: {
        '': 'formReady',
      },
    },
    formReady: {
      on: {
        bubble: {
          target: 'submitting',
        },
      },
    },
    submitting: {
      invoke: {
        src: async (context, event) => {
          await context.onSubmit(event.data);
        },
        onDone: 'formReady',
        onError: 'formReady',
      },
    },
  },
};

/**
 *
 *
 * Hooks
 *
 *
 */
export const useField = (machine, groupIsValidating, fieldValidator = {}) => {
  const [state, send] = useService(machine);
  const { validator, validatorArgs } = fieldValidator

  React.useEffect(() => {
    if (groupIsValidating) {
      validatorArgs ? send({type: 'validate', validator, validatorArgs}) : send({type: 'validate', validator});
    }
  }, [groupIsValidating, send]);

  return {
    context: state ? state.context : {},
    send,
  };
};

export const useInitialFieldValue = (field, value) => {
  const [_state, send] = useService(field.machine);
  React.useEffect(() => {
    send({
      type: 'change',
      value: value
    });
  }, [value, send])

  return {};
}

export const useFieldGroup = service => {
  const [state, send] = useService(service);
  const [groupIsValidating, setGroupIsValidating] = React.useState(false);

  React.useEffect(() => {
    if (state && state.matches('validating')) {
      setGroupIsValidating(true);
    } else {
      setGroupIsValidating(false);
    }
  }, [state]);

  return {
    fields: state ? state.context.fields : [],
    nextMachine: state ? state.context.nextMachine : null,
    groupIsValidating: groupIsValidating,
    send,
    state,
  };
};

export const useForm = ({ onSubmit, options, form }) => {
  const [state] = useMachine(
    Machine(formMachine, formConfig).withContext({
      onSubmit: onSubmit,
      options,
      fieldOptions: form.fieldOptions,
      submitText: form.submitText,
      next: {
        ...fieldGroupMachineConfig(options),
        context: { ...form, options },
      },
    })
  );

  if (!state) {
    return {
      formState: undefined,
      fieldGroupMachine: undefined,
    };
  }

  if (!state.context.nextMachine.hasOwnProperty('machine')) {
    return {
      formState: undefined,
      fieldGroupMachine: undefined,
    };
  }

  return {
    formState: state,
    fieldGroupMachine: state.context.nextMachine,
  };
};

/**
 *
 *
 * Components
 *
 *
 */
export const Field = ({ groupIsValidating, machine }) => {
  const { context, send } = useField(machine, groupIsValidating);

  return (
    <BaseField
      {...context}
      fieldUtils={{
        setFieldValue: (_name, value) => {
          send({
            type: 'change',
            value: value,
          });
        },
      }}
      onBlur={() => {
        send(`complete`);
      }}
      onChange={e => {
        send({
          type: 'change',
          value: e.target.value,
        });
      }}
      error={context.error}
    />
  );
};

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
      {nextMachine && <FieldGroup service={nextMachine} />}
    </>
  );
};

export const Xform = props => {
  const { fieldGroupMachine } = useForm(props);

  return <>{fieldGroupMachine && <FieldGroup service={fieldGroupMachine} />}</>;
};
