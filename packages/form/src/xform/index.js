import React from 'react';
import { Machine, assign, spawn, send, sendParent } from 'xstate';
import { useMachine, useService } from '@xstate/react';
import BaseField from '../fields/baseField';
import {
  maskValidator,
  requiredValidator,
  requiredRadioValidator,
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
 * Field machine logic
 *
 *
 */
const getFieldMachine = machineName => {
  const machineMap = {
    text: textMachine,
    radio: radioMachine,
  };
  return machineMap[machineName];
};

export const fieldConfig = {
  actions: {
    change: assign({
      value: (_, event) => {
        return event.value;
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
  guards: {},
  services: {
    validateField: async context => {
      const validator = validatorMap[`${context.config.validator}Validator`];
      await validator.validate(context.value);
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
              actions: 'change',
              target: 'touched',
            },
          },
        },
        touched: {
          on: {
            change: {
              actions: ['change'],
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
            validate: 'validating',
          },
        },
        validating: {
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
              actions: 'change',
              target: 'touched',
            },
          },
        },
        touched: {
          on: {
            change: {
              actions: ['change'],
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
            validate: 'validating',
          },
        },
        validating: {
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
            fieldGroupMachine(context.options),
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
                Machine(
                  {
                    ...getFieldMachine(field.config.machine),
                    id: field.name,
                    context: field,
                  },
                  { ...fieldConfig, sync: true }
                ),
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
    allFieldsTouched: (context, event) => {
      return context.fields
        .map(({ machine }) => machine.state)
        .every(state => state.matches('focus.touched'));
    },
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
      try {
        if (context.nextFn) {
          return await context.nextFn(context);
        }
        if (context.next) {
          return context.next;
        }
      } catch (e) {
        // FIXME: Since throwing an error will result in form submission, we don't have
        // a solid way of exiting this when a nextFn() call throws an unexpected error
        console.error(e);
      }

      // We're treating a rejected promise as a way of saying we have no 'next'
      // fields to show, so let's trigger the form submission instead
      throw new Error('No next fields defined, should submit instead');
    },
  },
};

const fieldGroupMachine = options => ({
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
const useField = (machine, groupIsValidating) => {
  const [state, send] = useService(machine);

  React.useEffect(() => {
    if (groupIsValidating) {
      send('validate');
    }
  }, [groupIsValidating]);

  return {
    context: state ? state.context : {},
    send,
  };
};

const useFieldGroup = service => {
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

const useForm = ({ onSubmit, options, form }) => {
  const [state] = useMachine(
    Machine(formMachine, formConfig).withContext({
      onSubmit: onSubmit,
      options,
      next: { ...fieldGroupMachine(options), context: { ...form, options } },
    })
  );

  if (!state) {
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
const Field = ({ groupIsValidating, machine }) => {
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

const FieldGroup = ({ service }) => {
  const { fields, send, nextMachine, groupIsValidating } = useFieldGroup(
    service
  );

  return (
    <>
      {fields.map(field => (
        <Field
          key={field.name}
          groupIsValidating={groupIsValidating}
          machine={field.machine}
        />
      ))}
      <button type="button" onClick={() => send('submit')}>
        Submit
      </button>
      {nextMachine && <FieldGroup service={nextMachine} />}
    </>
  );
};

export const Xform = props => {
  const { fieldGroupMachine } = useForm(props);

  return (
    <>
      <FieldGroup service={fieldGroupMachine} />
    </>
  );
};
