import React from 'react';
import styled, { ThemeContext } from 'styled-components';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Box, Pane } from '@rtm-ui/layout';
import Icon, { Logo } from '@rtm-ui/icon';
import Button from '@rtm-ui/button';
import A from '@rtm-ui/a';
import { Header, Small, Paragraph } from '@rtm-ui/typography';
import Sheet from './sheet';
import { useWindowSize } from './useWindowSize';

const NavA = styled(A)`
  white-space: pre;
  padding: 0 10px;
  text-transform: uppercase;
`;

const LogoA = styled(A)`
  display: flex;
  padding: 5px;
`;

const ProfileStatus = ({ user, signOutPath, signInPath }) => {
  return user ? (
    <Box style={{ display: 'flex', alignItems: 'center' }}>
      <Icon fill="tertiary" glyph="profile" />
      <Box
        pl={10}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <Small color="primary">{user.email}</Small>
        <Button data-testid="sign-out" as="a" asWrapper href={signOutPath}>
          <Header tag="h6">SIGN OUT</Header>
        </Button>
      </Box>
    </Box>
  ) : (
    <Button data-testid="sign-in" as="a" href={signInPath}>
      Sign Up
    </Button>
  );
};

const StyledParagraph = styled(Paragraph)`
  cursor: pointer;
  display: block;
  text-transform: uppercase;

  &:hover {
    background: ${props => props.showHover && '#eee'};
  }
`;

const Flex = styled(Pane)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavList = styled(Box)`
  display: flex;
  align-items: center;
`;

const ToggleList = styled(Box)`
  display: flex;
  align-items: center;

  /* FIXME: this is overridden here due to the mockup */
  button {
    padding: 18px 14px;
  }
`;

const NavGroup = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavGroupWrapper = styled(NavGroup)`
  width: 1216px;
`;

const Navbar = ({ variant, ...props }) => {
  const { logoGlyph } = React.useContext(ThemeContext);
  return (
    <Flex variant={variant} px={[10, 20]} elevation={1}>
      {props.isDesktop && <div style={{ wdith: '32px' }} />}
      <NavGroupWrapper px={[0, 0, 32]}>
        {props.isDesktop &&
          props.tagline && (
            <Paragraph pr={10} weight="bold" color="tertiary" tag="h6">
              {props.tagline}
            </Paragraph>
          )}
        <StyledParagraph style={{ display: 'flex' }}>
          <LogoA href="/">
            <Logo entityBrand={logoGlyph} width={props.isDesktop ? 200 : 100} />
          </LogoA>
        </StyledParagraph>
        <NavList>
          {props.isDesktop ? (
            <NavGroup>
              {props.items
                .filter(item => item.navbar)
                .map(({ label, id, ...item }) => {
                  return (
                    <NavA key={id} color="primary" weight="bold" {...item}>
                      {label}
                    </NavA>
                  );
                })}
            </NavGroup>
          ) : (
            <div />
          )}
        </NavList>
      </NavGroupWrapper>
      <ToggleList p={10}>
        {props.children}
        <A onClick={() => props.onNavClick()}>
          <StyledParagraph ml="5px" showHover data-testid="toggle-nav">
            <Icon size={48} fill="primary" glyph="menu" />
          </StyledParagraph>
        </A>
      </ToggleList>
    </Flex>
  );
};

const Portal = props => {
  return ReactDOM.createPortal(
    <Sheet headerAction={props.header} {...props} />,
    document.body
  );
};

const SubHeaderWrapper = styled(Box)`
  max-width: 1400px;
  margin: auto;
`;
const Nav = props => {
  const size = useWindowSize();
  const [isDesktop, setIsDesktop] = React.useState();

  React.useEffect(
    function() {
      setIsDesktop(size.width > 1300);
    },
    [size.width]
  );

  const [isClosed, toggleClosed] = React.useState(true);
  const toggle = () => toggleClosed(!isClosed);
  return (
    <React.Fragment>
      <Navbar
        variant={props.variant}
        isDesktop={isDesktop}
        logo={props.logo}
        onHomeClick={props.onHomeClick}
        tagline={props.tagline}
        onNavClick={toggle}
        items={props.items}
      >
        {!props.user && props.children}
      </Navbar>
      {props.subHeader && (
        <Box variant="c">
          <SubHeaderWrapper>
            <Header tag="h6" p="5px" pl="10px" align="center" weight="bold">
              {props.subHeader}
            </Header>
          </SubHeaderWrapper>
        </Box>
      )}
      {!isClosed && (
        <Portal
          {...props}
          header={() => (
            <ProfileStatus
              user={props.user}
              signInPath={props.signInPath}
              signOutPath={props.signOutPath}
            />
          )}
          isDesktop={isDesktop}
          isClosed={isClosed}
          toggle={toggle}
        />
      )}
    </React.Fragment>
  );
};

Nav.propTypes = {
  logo: PropTypes.string,
  onHomeClick: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      onClick: PropTypes.func,
      label: PropTypes.string,
    })
  ),
  children: PropTypes.node,
};

Navbar.propTypes = {
  logo: PropTypes.string,
  desktop: PropTypes.bool,
  onHomeClick: PropTypes.func,
  onNavClick: PropTypes.func,
};

export { Sheet };
export default Nav;
