import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const Sidebar = props => {
  const { children, ...rest } = props;
  return (
    <S.Sidebar mb={[2, 3]} {...rest}>
      {props.children}
    </S.Sidebar>
  );
};

export default Sidebar;

Sidebar.propTypes = {
  children: PropTypes.node.isRequired,
};
