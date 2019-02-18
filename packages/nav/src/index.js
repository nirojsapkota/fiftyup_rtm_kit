import React from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Pane } from '@rtm-ui/layout';
import Icon, { Logo } from '@rtm-ui/icon';
import Sheet from './sheet';

const A = styled.a`
  cursor: pointer;
  display: block;

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

const Navbar = props => {
  return (
    <Flex p={20} elevation={1}>
      {props.desktop && <div />}
      <A style={{ display: 'flex' }} onClick={props.onHomeClick}>
        <Logo entityBrand={props.logo} width={100} />
      </A>
      <A showHover data-testid="toggle-nav" onClick={() => props.onNavClick()}>
        <Icon size={48} glyph="menu" />
      </A>
    </Flex>
  );
};

const Portal = props => {
  return ReactDOM.createPortal(
    <Sheet headerAction={props.header} {...props} />,
    document.body
  );
};

const Nav = props => {
  const [isClosed, toggleClosed] = React.useState(true);
  const toggle = () => toggleClosed(!isClosed);
  return (
    <React.Fragment>
      <Navbar
        logo={props.logo}
        onHomeClick={props.onHomeClick}
        onNavClick={toggle}
      />
      {!isClosed && <Portal {...props} isClosed={isClosed} toggle={toggle} />}
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
