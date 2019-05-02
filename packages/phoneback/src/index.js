import React from 'react';
import { Header, Small, Paragraph } from '@rtm-ui/typography';
import styled from 'styled-components';
import { Card, Box } from '@rtm-ui/layout';
import { Icon } from '@rtm-ui/icon';
import { Button } from '@rtm-ui/button';
import { Dialog } from '@rtm-ui/dialog';
import { Form } from '@rtm-ui/form';

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

export const PhonebackBox = ({ form, text, children }) => {
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
        {text.talkToUsText}
      </Header>
      <Header tag="h1" align="center" color="text">
        {text.businessPhone}
      </Header>
      <Header tag="h6" align="center" color="accent">
        {text.businessHours}
      </Header>
      <Box pt={10}>
        <Phoneback text={text} form={form} />
        {children}
      </Box>
    </WhiteCard>
  );
};

export const Phoneback = ({ form, text }) => {
  const [phonebackSubmitted, setPhonebackSubmitted] = React.useState(false);
  return (
    <Dialog
      renderContainer={() => {
        return (
          <Box p={[10, 20]}>
            {!phonebackSubmitted ? (
              <Box>
                <Header tag="h6" align="center" color="text">
                  {text.header}
                </Header>
                <PhonebackForm
                  text={text}
                  form={{
                    ...form,
                    onSuccess: (values, ctx) => {
                      setPhonebackSubmitted(true);
                      form.onSuccess && form.onSuccess(values, ctx);
                    },
                  }}
                />
              </Box>
            ) : (
              <Box>
                <Header pb={10} align="center" tag="h5" weight="normal">
                  {text.thankYou}
                </Header>
                <Paragraph py={10} align="center">
                  {text.message}
                </Paragraph>
                <Box
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Button as="a" href={text.thankYouLink}>
                    {text.thankYouButtonText}
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        );
      }}
      renderTrigger={open => {
        return (
          <CenterBox>
            <Button onClick={open}>
              {text.requestButtonText}
              <Icon inline fill="inverseText" glyph={text.requestButtonIcon} />
            </Button>
          </CenterBox>
        );
      }}
    />
  );
};

export const PhonebackForm = ({ form, text }) => {
  return (
    <>
      <Form {...form} submitText="Call Me Back" />
      <Box style={{ textAlign: 'right' }}>
        <Small dangerousHTML={text.disclaimer} />
      </Box>
    </>
  );
};
