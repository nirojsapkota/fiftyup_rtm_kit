import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from '@rtm-ui/layout';
import { Paragraph, Label } from '@rtm-ui/typography';
import { getFieldComponent } from '../util/getFieldComponent';
import { motion } from 'framer-motion';
import { FieldGroup, FieldGroupContext } from './fieldGroup';

export { FieldGroup };

const SmallText = styled(Paragraph)`
  font-size: 0.6em;
`;

const Wrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: ${props => (props.alignItems ? props.alignItems : 'center')};
  flex-wrap: wrap;
  margin: 5px 0;
`;

const variantChild = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};
const variants = {
  open: {
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const variantChildLast = {
  open: {
    opacity: 1,
  },
  closed: {
    opacity: 0,
  },
};

const AnimateableWrapper = ({ children, ...animateProps }) => {
  const fieldGroupContext = React.useContext(FieldGroupContext);
  const shouldAnimate = fieldGroupContext
    ? fieldGroupContext.shouldAnimate
    : false;
  if (shouldAnimate) {
    return <motion.div {...animateProps}>{children}</motion.div>;
  } else {
    return children;
  }
};

const BaseField = props => {
  const [focused, setFocused] = React.useState(false);
  const [waiting, setWaiting] = React.useState(false);

  const toggleFocused = e => {
    setFocused(!focused);
    if (!focused && typeof props.onFocus === 'function') {
      props.onFocus(e);
    }
    if (focused && typeof props.onBlur === 'function') {
      props.onBlur(e);
    }
  };

  const [closed, setClosed] = React.useState(true);
  React.useEffect(() => {
    // The purpose of this is to allow the field to mount
    // in a hidden state and then begin it's animation
    const timeout = setTimeout(() => setClosed(false), 100);
    return () => clearInterval(timeout);
  }, []);

  const toggleWaiting = () => {
    setWaiting(!waiting);
  };

  const { label, description, hint, helper, error } = props;
  const Input = getFieldComponent(props.type, props.config);

  const { initialValue: _iv, ...inputProps } = props;

  return props.type !== 'hidden' ? (
    <Box mb={10}>
      <AnimateableWrapper initial={false} animate={closed ? 'closed' : 'open'} exit={{ opacity: 0 }}>
        <AnimateableWrapper variants={variants}>
          <AnimateableWrapper variants={variantChild}>
            {props.config.renderLabel ? (
              props.config.renderLabel({
                name: props.name,
                label,
                description,
                helper,
              })
            ) : (
                <Wrapper alignItems="flex-end">
                  <>
                    <Box>
                      <Label font="serif" htmlFor={props.name}>
                        {label}
                      </Label>
                      <SmallText>{description}</SmallText>
                    </Box>
                    <SmallText>{helper}</SmallText>
                  </>
                </Wrapper>
              )}
          </AnimateableWrapper>
          <AnimateableWrapper variants={variantChild}>
            <Input
              {...inputProps}
              showErrorColor={!focused && error}
              id={`${props.name}`}
              value={inputProps.value}
              onFocus={toggleFocused}
              onBlur={toggleFocused}
              onWaiting={toggleWaiting}
            />
          </AnimateableWrapper>
          <AnimateableWrapper variants={variantChildLast}>
            {/* Ensure the page doesn't jump if a message is inserted */}
            <Wrapper style={{ minHeight: '12px' }}>
              <SmallText>{hint}</SmallText>
              <SmallText
                data-testid="fieldError"
                color={!focused && error ? 'error' : 'text'}
              >
                {error || waiting}
              </SmallText>
            </Wrapper>
          </AnimateableWrapper>
        </AnimateableWrapper>
      </AnimateableWrapper>
    </Box>
  ) : (
      <Input {...inputProps} id={`${props.name}`} />
    );
};

export default BaseField;

const inputHtmlProps = {
  autoComplete: PropTypes.oneOf(['off', 'on', 'new-password']),
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf([
    'text',
    'tel',
    'radio',
    'password',
    'checkbox',
    'hidden',
    //'month',
  ]).isRequired,
};

BaseField.propTypes = {
  ...inputHtmlProps,
  label: PropTypes.string.isRequired,
  config: PropTypes.shape({
    component: PropTypes.string,
    validator: PropTypes.string,
  }),
};
