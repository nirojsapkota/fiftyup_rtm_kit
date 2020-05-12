import React from 'react';
import styled, { ThemeContext } from 'styled-components';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import isReact from 'is-react';
import { Box, Pane, scrollToElement } from '@rtm-ui/layout';
import { Icon, Logo } from '@rtm-ui/icon';
import { Button } from '@rtm-ui/button';
import { A } from '@rtm-ui/a';
import { Header, Small, Paragraph } from '@rtm-ui/typography';
import { useWindowSize } from './useWindowSize';
import Sheet from './sheet';

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

const FixedPosition = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9999;
  background: white;
`;

const StyledNavbar = styled(Flex)`
  box-shadow: ${props => props.sticky ? 'none' : 'inherit'};
`;

const BrandItems = styled(Box)`
  align-items: center;
  display: contents;
  &.left {
    display: flex;
    flex-flow: row-reverse;
    > * {
      padding-right: 20px;
    }
  }
`

const Navbar = ({ variant, ...props }) => {
  const { logoGlyph } = React.useContext(ThemeContext);
  return (
    <StyledNavbar variant={variant} px={[10, 20]} py={[0, 0, 0, 10]} elevation={1}>
      {props.isDesktop && <div style={{ wdith: '32px' }} />}
      <NavGroupWrapper px={[0, 0, 32]}>
        <BrandItems data-testid="brand-items" className={props.logoPosition} >
          {props.isDesktop && props.tagline && (
            <Paragraph pr={10} weight="bold" color="tertiary" tag="h6">
              {props.tagline}
            </Paragraph>
          )}
          <Box style={{ display: 'flex' }}>
            <LogoA href="/">
              {isReact.compatible(props.logo) ? (
                props.logo
              ) : (
                <Logo
                  entityBrand={logoGlyph}
                  width={props.isDesktop ? 150 : 100}
                />
              )}
            </LogoA>
          </Box>

        </BrandItems>

        <NavList>
          {props.isDesktop ? (
            <NavGroup>
              {props.items
                .filter(item => item.navbar)
                .map(({ label, id, ...item }) => {
                  if (item.scrollTo) {item = {...item, onClick: (e) => { scrollToElement(e, item.scrollTo) }}}
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
    </StyledNavbar>
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

const NavbarPositioner = (props) => {
  if (props.sticky) {
    return(
      <FixedPosition data-testid="nav-fixed">
        {props.children}
      </FixedPosition>
    )
  } else {
    return(
      <React.Fragment>
        {props.children}
      </React.Fragment>
    )
  }
}
const Nav = props => {
  const size = useWindowSize();
  const [isDesktop, setIsDesktop] = React.useState();

  React.useLayoutEffect(
    function() {
      setIsDesktop(size.width > 1300);
    },
    [size.width]
  );

  const [isClosed, toggleClosed] = React.useState(true);
  const toggle = () => toggleClosed(!isClosed);
  return (
    <NavbarPositioner sticky={props.sticky}>
      <Navbar
        sticky={props.sticky}
        variant={props.variant}
        isDesktop={isDesktop}
        logoPosition={props.logoPosition}
        logo={props.logo}
        onHomeClick={props.onHomeClick}
        tagline={props.tagline}
        onNavClick={toggle}
        items={props.items}
      >
        {!props.user && props.children}
      </Navbar>
      {props.subHeader && (
        <Box variant="b">
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
          header={() =>
            props.signOutPath && (
              <ProfileStatus
                user={props.user}
                signInPath={props.signInPath}
                signOutPath={props.signOutPath}
              />
            )
          }
          isDesktop={isDesktop}
          isClosed={isClosed}
          toggle={toggle}
        />
      )}
    </NavbarPositioner>
  );
};

Nav.propTypes = {
  logo: PropTypes.string,
  sticky: PropTypes.bool,
  onHomeClick: PropTypes.func,
  logoPosition: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      onClick: PropTypes.func,
      label: PropTypes.string,
      scrollTo: PropTypes.string,
    })
  ),
  children: PropTypes.node,
};

Nav.defaultProps = {
  logoPosition: "left",
};

Navbar.propTypes = {
  logo: PropTypes.string,
  desktop: PropTypes.bool,
  logoPosition: PropTypes.string,
  onHomeClick: PropTypes.func,
  onNavClick: PropTypes.func,
};

export { Nav };
