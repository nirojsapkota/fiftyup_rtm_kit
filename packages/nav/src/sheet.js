import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Box, Pane } from '@rtm-ui/layout';
import { Header } from '@rtm-ui/typography';
import { getColor } from '@rtm-ui/theme';
import Icon from '@rtm-ui/icon';

const A = styled.a`
  cursor: pointer;
  display: block;
  text-transform: uppercase;
  text-decoration: none;

  &:hover {
    background: ${props => getColor('light', props.theme)};
  }
`;

const SheetItem = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${props => getColor('background', props.theme)};
`;

const Wrapper = styled.div`
  position: fixed;
  z-index: 10000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

const ScreenWrapper = styled.div`
  position: absolute;
  background: black;
  opacity: 0.25;
  z-index: 3000;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: block;
`;

const SheetWrapper = styled(Pane)`
  position: absolute;
  right: 0;
  transition: all 0.3s ease;
  top: 0;
  bottom: 0;
  max-width: 80%;
  width: 330px;
  z-index: 4000;
`;

const Screen = props => {
  return <ScreenWrapper onClick={props.onClick} />;
};

const Sheet = props => {
  const { isClosed, toggle } = props;

  return (
    <Wrapper isClosed={isClosed}>
      <Screen data-testid="nav-screen" onClick={toggle} />
      <SheetWrapper variant="a" elevation={2}>
        <SheetItem p={20}>
          {typeof props.headerAction === 'function' &&
            props.headerAction(toggle)}
          <A data-testid="toggle-close-nav" onClick={toggle}>
            <Box>
              <Icon size={40} fill="primary" glyph="view-close" />
            </Box>
          </A>
        </SheetItem>
        {props.items
          .filter(item => (props.isDesktop && !item.navbar) || !props.isDesktop)
          .map(({ id, href, label }) => (
            <A key={id} href={href}>
              <SheetItem p={20}>
                <Header style={{ lineHeight: '2' }} tag="h6">
                  {label}
                </Header>
                <Box>
                  <Icon fill="primary" size={40} inline glyph="view-forward" />
                </Box>
              </SheetItem>
            </A>
          ))}
      </SheetWrapper>
    </Wrapper>
  );
};

Screen.propTypes = {
  onClick: PropTypes.func,
  isClosed: PropTypes.bool,
};

Sheet.defaultProps = {
  isClosed: true,
};

Sheet.propTypes = {
  isClosed: PropTypes.bool,
  headerAction: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      onClick: PropTypes.func,
      label: PropTypes.string,
    })
  ),
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
};

export default Sheet;
