import React from 'react';
import t from 'prop-types';
import styled from 'styled-components';
import { Box } from '@rtm-ui/layout';
import { Icon } from '@rtm-ui/icon';
import { Paragraph } from '@rtm-ui/typography';
import { backgroundStyle } from '@rtm-ui/theme';

const Wrapper = styled(Box)`
  ${backgroundStyle};
`;

const Content = styled(Box)`
  max-width: 1080px;
  position: relative;
`;

const ImgHorizontal = styled(Box)`
  position: absolute;
  left: 0px;
  top: -20px;
`;

const ImgVertical = styled(Box)`
  position: absolute;
  top: 20px;
  right: 0;
`;

const HeaderContainer = styled(Box)`
  min-height: 90px;
  display: flex;
  align-items: center;
`;

const ConfirmHeader = ({ icon, orientation, confirmationHeader }) => {
  const ImgContainer = orientation === 'vertical' ? ImgVertical : ImgHorizontal;
  return (
    <Wrapper pt={orientation === 'vertical' ? 10 : 20}>
      <Content m="auto" py={orientation === 'vertical' ? 20 : 10} px={10}>
        <ImgContainer>
          <Icon fill="primary" glyph={icon} size={150} />{' '}
        </ImgContainer>
        <HeaderContainer
          style={{ marginLeft: orientation === 'vertical' ? 0 : 150 }}
        >
          <Paragraph color="light" dangerousHTML={confirmationHeader} />
        </HeaderContainer>
      </Content>
    </Wrapper>
  );
};

ConfirmHeader.defaultProps = {
  orientation: 'horizontal',
};

ConfirmHeader.propTypes = {
  icon: t.string,
  confirmationHeader: t.string,
  orientation: t.oneOf(['vertical', 'horizontal']),
};

export default ConfirmHeader;
