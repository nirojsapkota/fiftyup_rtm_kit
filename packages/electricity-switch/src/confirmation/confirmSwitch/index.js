import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import { Box } from '@rtm-ui/layout';
import { Button } from '@rtm-ui/button';
import { Small } from '@rtm-ui/typography';
import { Form } from '@rtm-ui/form';
import { getColor } from '@rtm-ui/theme';

const ButtonWrapper = styled(Box)`
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Wrapper = styled(Box)`
  background: ${props => getColor('background', props.theme)};
`;
class ConfirmSwitch extends React.Component {
  render() {
    const {
      agreementItems,
      authenticityToken,
      backButtonText,
      buttonText,
      buttonId,
      editUrl,
      handleSubmit,
    } = this.props;
    const fields = [
      {
        label: '',
        name: 'authenticity_token',
        type: 'hidden',
        initialValue: authenticityToken,
        config: {},
      },
      {
        label: '',
        name: '_method',
        type: 'hidden',
        initialValue: 'put',
        config: {},
      },
    ];

    agreementItems.map(({ label }) => label).map((val, index) => {
      val &&
        fields.push({
          label: '',
          config: {
            validator: 'requiredRadio',
          },
          name: 'agreement' + index,
          value: '',
          type: 'checkbox',
          options: [
            {
              label: <Small dangerousHTML={val} />,
              value: 'agreement' + index,
            },
          ],
        });
    });

    return (
      <Wrapper p={20}>
        <Form
          id="confirm-form"
          fields={fields}
          onSubmit={typeof handleSubmit == 'function' && handleSubmit}
          renderFooter={({ formError }) => (
            <React.Fragment>
              <ButtonWrapper>
                <Button as="a" href={editUrl} secondary={true}>
                  {backButtonText}
                </Button>
                <Button id={buttonId} type="submit">
                  {buttonText}
                </Button>
              </ButtonWrapper>
            </React.Fragment>
          )}
        />
      </Wrapper>
    );
  }
}

ConfirmSwitch.defaultProps = {
  buttonText: 'Switch Now',
  buttonId: 'btn-submit',
  backButtonText: 'Back',
};

ConfirmSwitch.propTypes = {
  authenticityToken: t.string.isRequired,
  agreementItems: t.arrayOf(t.shape({})).isRequired,
  backButtonText: t.string,
  buttonText: t.string,
  buttonId: t.string,
  editUrl: t.string.isRequired,
  handleSubmit: t.func,
};

export default ConfirmSwitch;
