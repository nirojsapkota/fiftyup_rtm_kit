import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import { Box } from '@rtm-ui/layout';
import { Paragraph, Small } from '@rtm-ui/typography';

const FlexBoxStyled = styled(Box)`
  display: flex;
  flex-direction: row;
  background: inherit;
  * {
    background: inherit;
  }
`;

const Link = styled.a`
  padding-left: 5px;
`;

class GdprAgreement extends React.Component {
  constructor(props) {
    super(props);

    if (props.isShowCheckBox) {
      this.state = {
        isChecked: props.checkBoxValue,
      };
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const value = e.target.checked;
    this.setState({
      isChecked: value,
    });

    if (typeof this.props.getCheckBoxValue === 'function') {
      this.props.getCheckBoxValue(value);
    }
  }

  render() {
    const {
      isShowCheckBox,
      isRequire,
      confirmationOfConsent,
      termsAndConditions,
      privacyPolicy,
    } = this.props;

    return (
      <FlexBoxStyled>
        {isShowCheckBox && (
          <input
            type="checkbox"
            id="ckb_agreement"
            required={isRequire}
            onChange={this.handleChange}
            checked={this.state.isChecked}
          />
        )}

        <Paragraph>
          <Small>
            By ticking this box, you agree to our
            {confirmationOfConsent && (
              <Link href={confirmationOfConsent.url}>
                {confirmationOfConsent.text},
              </Link>
            )}
            <Link href={termsAndConditions.url}>{termsAndConditions.text}</Link>
            {` `}
            and
            <Link href={privacyPolicy.url}>{privacyPolicy.text} </Link>
          </Small>
        </Paragraph>
      </FlexBoxStyled>
    );
  }
}

GdprAgreement.defaultProps = {
  isShowCheckBox: true,
  isRequire: 'required',
  checkBoxValue: false,
  confirmationOfConsent: {
    url: '/confirmation-of-consent',
    text: 'Confirmation of Consent',
  },
  termsAndConditions: {
    url: '/terms-and-conditions',
    text: 'Terms and Conditions',
  },
  privacyPolicy: {
    url: '/privacy-policy',
    text: 'Privacy Policy',
  },
};

GdprAgreement.propTypes = {
  isShowCheckBox: t.bool,
  isRequire: t.string,
  checkBoxValue: t.bool,
  confirmationOfConsent: t.shape({
    url: t.string,
    text: t.string,
  }),
  termsAndConditions: t.shape({
    url: t.string,
    text: t.string,
  }),
  privacyPolicy: t.shape({
    url: t.string,
    text: t.string,
  }),
  getCheckBoxValue: t.func,
};

export default GdprAgreement;
