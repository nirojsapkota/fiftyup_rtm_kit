import React from 'react';
import PropTypes from 'prop-types';
import Form from './form';

const passThruStep = async values => {
  values;
};

class StepForm extends React.Component {
  state = {
    steps: this.props.steps,
    id: this.props.id,
    values: {},
    errors: {},
    formErrors: {},
    formPositions: {},
    nextStep: this.props.steps[0].id,
  };

  componentDidMount() {
    // const storedItems = JSON.parse(window.localStorage.getItem(this.state.id));
    // window.localStorage.removeItem(this.state.id);
    const formPositions = {};
    this.state.steps.forEach(({ id }) => {
      const formNode = document.getElementById(`form-${id}`);
      formPositions[id] = formNode ? formNode.offsetTop : 0;
    });
    this.setState({
      // values: storedItems,
      formPositions,
    });
  }

  handleChildFormSubmit = async (
    callback,
    values,
    actions,
    options = {},
    formId
  ) => {
    await callback(values, { ...options, ...this.state.values })
      .then(res => {
        this.setState(prevState => {
          const values = {
            ...prevState.values,
            [formId]: res,
          };

          window.localStorage.setItem(
            prevState.id,
            JSON.stringify(values, 0, 2)
          );

          return {
            values,
            errors: {},
            formErrors: {},
          };
        });
      })
      .catch(err => {
        this.setState(prevState => {
          return {
            formErrors: {
              ...prevState.formErrors,
              [formId]: err.object.formError,
            },
            errors: {
              ...prevState.errors,
              [formId]: err.object.fieldErrors,
            },
          };
        });
      })
      .finally(() => {
        actions.setSubmitting(false);

        this.calculateNextStep();
      });
  };

  calculateNextStep = () => {
    const finishedSteps = this.state.values
      ? Object.keys(this.state.values)
      : [];
    const erroredSteps = this.state.errors
      ? Object.keys(this.state.errors)
      : [];
    const lastFinishedStep = finishedSteps[finishedSteps.length - 1];
    const lastErroredStep = erroredSteps[erroredSteps.length - 1];
    const stepIds = this.state.steps && this.state.steps.map(({ id }) => id);

    const nextStepIndex =
      (stepIds.indexOf(lastErroredStep) === -1
        ? null
        : stepIds.indexOf(lastErroredStep)) ||
      (stepIds.indexOf(lastFinishedStep) === -1
        ? 0
        : stepIds.indexOf(lastFinishedStep) + 1);

    this.setState({ nextStep: stepIds[nextStepIndex] });
  };

  render() {
    const { steps } = this.state;
    window.scrollTo({
      top: this.state.formPositions[this.state.nextStep] || 0,
      behavior: 'smooth',
    });

    const finishedSteps = this.state.values
      ? Object.keys(this.state.values)
      : [];

    const isEnabled = id => {
      return !finishedSteps.includes(id) && this.state.nextStep !== id;
    };
    return (
      <React.Fragment>
        {steps.map(({ onSubmit = passThruStep, id, ...rest }) => {
          return (
            <Form
              formId={id}
              disabled={isEnabled(id)}
              key={id}
              status="success" // FIXME
              storedValues={this.state.values && this.state.values[id]}
              onSubmit={(values, actions, options) =>
                this.handleChildFormSubmit(
                  onSubmit,
                  values,
                  actions,
                  options,
                  id
                )
              }
              formError={this.state.formErrors[id]}
              errors={this.state.errors[id]}
              {...rest}
            />
          );
        })}
      </React.Fragment>
    );
  }
}
StepForm.propTypes = {
  onSubmit: PropTypes.func,
};

export default StepForm;
