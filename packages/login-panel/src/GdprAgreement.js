import React, { useState, useEffect } from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import { Box } from '@rtm-ui/layout';
import { Paragraph, Small, Markdown } from '@rtm-ui/typography';

const FlexBoxStyled = styled(Box)`
  display: flex;
  flex-direction: row;
  background: inherit;
  * {
    background: inherit;
  }
`;

const AgreementContainer = styled(Box)`
  display: inherit;
`

const GdprAgreement = ({
  enableCheckBox,
  isRequire,
  content,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (typeof props.getCheckBoxValue === 'function') {
      props.getCheckBoxValue(isChecked);
    }
  },[isChecked])

  return(
    <FlexBoxStyled>
      <AgreementContainer>
        <React.Fragment>
          {enableCheckBox &&
            <input
              data-testid="ckAgreement"
              type="checkbox"
              required={isRequire}
              onChange={(e) => {setIsChecked(e.target.checked)}}
              checked={isChecked}
              style={{marginRight: "5px", marginTop: "1px"}}
            />}
          {content && <Small><Markdown raw={content} /></Small>}
        </React.Fragment>
      </AgreementContainer>
    </FlexBoxStyled>
  );
}

GdprAgreement.defaultProps = {
  enableCheckBox: true,
  isRequire: 'required',
  isChecked: false,
  content: '',
};

GdprAgreement.propTypes = {
  enableCheckBox: t.bool,
  isRequire: t.string,
  isChecked: t.bool,
  cont: t.string,
  getCheckBoxValue: t.func,
};

export default GdprAgreement;
