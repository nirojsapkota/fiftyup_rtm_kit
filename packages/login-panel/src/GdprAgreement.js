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
`;

const StyledCheckbox = styled.input`
  margin-right: 5px;
  margin-top: 1px;
  padding: 10px;
  -ms-transform: scale(1.2); /* IE */
  -moz-transform: scale(1.2); /* FF */
  -webkit-transform: scale(1.2); /* Safari and Chrome */
  -o-transform: scale(1.2); /* Opera */
  transform: scale(1.2);
`;

const GdprAgreement = ({ enableCheckBox, isRequire, content, ...props }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (typeof props.getCheckBoxValue === 'function') {
      props.getCheckBoxValue(isChecked);
    }
  }, [isChecked]);

  return (
    <FlexBoxStyled>
      <AgreementContainer>
        <React.Fragment>
          {enableCheckBox && (
            <StyledCheckbox
              data-testid="ckAgreement"
              type="checkbox"
              required={isRequire}
              onChange={e => {
                setIsChecked(e.target.checked);
              }}
              checked={isChecked}
            />
          )}
          {content && (
            <Small>
              <Markdown raw={content} />
            </Small>
          )}
        </React.Fragment>
      </AgreementContainer>
    </FlexBoxStyled>
  );
};

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
