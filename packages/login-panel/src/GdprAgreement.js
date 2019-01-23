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

    this.state = {
      isChecked: props.isChecked || false,
    };

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
      enableCheckBox,
      isRequire,
      confirmationOfConsent,
      termsAndConditions,
      privacyPolicy,
    } = this.props;

    return (
      <FlexBoxStyled>
        <Paragraph>
          {enableCheckBox ? (
            <React.Fragment>
              <input
                data-testid="ckAgreement"
                type="checkbox"
                required={isRequire}
                onChange={this.handleChange}
                checked={this.state.isChecked}
              />
              <Small>By ticking this box, you agree to our</Small>
            </React.Fragment>
          ) : (
            <Small>By clicking the button above, you agree to our</Small>
          )}
          <Small>
            {confirmationOfConsent && (
              <React.Fragment>
                <Link href={confirmationOfConsent.url}>
                  {confirmationOfConsent.text}
                </Link>
                ,
              </React.Fragment>
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
  enableCheckBox: true,
  isRequire: 'required',
  isChecked: false,
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
  enableCheckBox: t.bool,
  isRequire: t.string,
  isChecked: t.bool,
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
