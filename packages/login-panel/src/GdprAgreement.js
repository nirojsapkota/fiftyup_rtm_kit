import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import { Box } from '@rtm-ui/layout';
import { Paragraph, Small } from '@rtm-ui/typography';

const StyledCheckBox = styled.input``;
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
      isChecked: props.isChecked,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const value = e.target.checked;
    this.setState({
      isChecked: value,
    });

    if (this.getValue) {
      this.props.getValue(value);
    }
  }

  render() {
    return (
      <FlexBoxStyled>
        <StyledCheckBox
          type="checkbox"
          id="ckb_agreement"
          required={this.props.required}
          onChange={this.handleChange}
          checked={this.state.isChecked}
        />
        <Paragraph>
          <Small>
            By ticking this box, you agree to our
            {this.props.confirmationOfConsent && (
              <Link id="" href={this.props.confirmationOfConsent.url}>
                {this.props.confirmationOfConsent.text},
              </Link>
            )}
            <Link href={this.props.termsAndConditions.url}>
              {this.props.termsAndConditions.text}
            </Link>
            {` `}
            and
            <Link href={this.props.privacyPolicy.url}>
              {this.props.privacyPolicy.text}{' '}
            </Link>
          </Small>
        </Paragraph>
      </FlexBoxStyled>
    );
  }
}

GdprAgreement.defaultProps = {
  isChecked: true,
  required: 'required',
  confirmationOfConsent: {
    url: '#',
    text: 'Confirmation of Consent',
  },
  termsAndConditions: {
    url: '#',
    text: 'Terms and Conditions',
  },
  privacyPolicy: {
    url: '#',
    text: 'Privacy Policy',
  },
};

GdprAgreement.propTypes = {
  isChecked: t.bool,
  required: t.string,
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
  getValue: t.func,
};

export default GdprAgreement;
