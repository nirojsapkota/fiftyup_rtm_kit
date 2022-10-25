import React from 'react';
import { Header, Small, Paragraph, Markdown } from '@rtm-ui/typography';
import styled from 'styled-components';
import { Card, Box } from '@rtm-ui/layout';
import { Icon } from '@rtm-ui/icon';
import { Button } from '@rtm-ui/button';
import { Dialog } from '@rtm-ui/dialog';
import { Form } from '@rtm-ui/form';
import { track } from '@rtm-ui/tracker';

const CenterBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const WhiteCard = styled(Card)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const PhonebackBox = ({ form, children, ...props }) => {
  return (
    <WhiteCard
      width={[1, 1, 500]}
      variant="a"
      pt={[20]}
      pb={[10, 20]}
      px={[10, 20]}
      mt={30}
    >
      <Header tag="h6" align="center" color="accent">
        {props.talkToUsText}
      </Header>
      <Header tag="h1" align="center" color="text">
        {props.businessPhone}
      </Header>
      <Header tag="h6" align="center" color="accent">
        {props.businessHours}
      </Header>
      <Paragraph
        align="center"
        py={[2, 2]}
        dangerousHTML={props.extraMessage}
      />
      <Box pt={10}>
        <Phoneback form={form} {...props} />
        {children}
      </Box>
    </WhiteCard>
  );
};

export const Phoneback = ({
  form,
  isPhonebacked = false,
  isFormSubmitting,
  thankYouProps,
  ...props
}) => {
  const [phonebackSubmitted, setPhonebackSubmitted] = React.useState(
    isPhonebacked
  );
  const [phonebackSubmitting, setPhonebackSubmitting] = React.useState(
    isFormSubmitting
  );

  React.useEffect(() => {
    setPhonebackSubmitted(isPhonebacked);
  }, [isPhonebacked]);

  React.useEffect(() => {
    setPhonebackSubmitting(isFormSubmitting);
  }, [isFormSubmitting]);

  return (
    <Dialog
      renderContainer={() => {
        return (
          <Box p={[10, 20]}>
            {!phonebackSubmitted ? (
              <Box>
                {props.header && (
                  <Header tag="h6" align="center" color="text">
                    {props.header}
                  </Header>
                )}
                {props.title && <Markdown raw={props.title} />}
                <PhonebackForm
                  {...props}
                  phonebackSubmitting={phonebackSubmitting}
                  form={{
                    ...form,
                    onSuccess: (values, ctx) => {
                      setPhonebackSubmitted(true);
                      track(`${props.track}/submit`);
                      form.onSuccess && form.onSuccess(values, ctx);
                    },
                  }}
                />
              </Box>
            ) : (
              <Box>
                {thankYouProps.content && (
                  <Markdown raw={thankYouProps.content} />
                )}
                {!thankYouProps.content && (
                  <>
                    <Header pb={10} align="center" tag="h5" weight="normal">
                      {thankYouProps.header}
                    </Header>
                    <Paragraph py={10} align="center">
                      {thankYouProps.message}
                    </Paragraph>
                  </>
                )}

                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Button as="a" href={thankYouProps.link}>
                    {thankYouProps.buttonText}
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        );
      }}
      renderTrigger={open => {
        if (typeof props.renderTrigger === 'function') {
          return props.renderTrigger(open);
        } else {
          return (
            <>
              <CenterBox>
                <Button onClick={open}>
                  {props.requestButtonText}
                  <Icon
                    inline
                    fill="inverseText"
                    glyph={props.requestButtonIcon}
                  />
                </Button>
              </CenterBox>
            </>
          );
        }
      }}
    />
  );
};

export const PhonebackForm = ({ form, ...props }) => {
  return (
    <>
      <Form
        {...form}
        renderFooter={({ formError }) => (
          <>
            {props.agreement && <Box my={2}>{props.agreement}</Box>}
            <CenterBox>
              <Button
                disabled={props.phonebackSubmitting}
                type="submit"
                track={props.track}
              >
                {props.submitText}
              </Button>
            </CenterBox>
            {formError && (
              <Box pt={2}>
                <Small align="left" color="error">
                  <Icon fill="error" glyph="error" size={15} />
                  {formError}
                </Small>
              </Box>
            )}
          </>
        )}
      />
    </>
  );
};
