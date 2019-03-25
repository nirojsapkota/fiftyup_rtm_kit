import React from 'react';
import PropTypes from 'prop-types';
import { TrackingProvider } from '@rtm-ui/tracker';
import Button, { ButtonGroup } from '../../button/src';
import { Pane } from '../../layout/src';
import { Logo } from '../../icon/src';
import Bootstrap from '../src';
import { useLocalStorage } from './useLocalStorage';

// This is used by jest and Docz
const TestBootstrap = ({ themeName = 'obs', overrides, children }) => {
  const [localThemeName, setThemeName] = useLocalStorage(
    'themeName',
    themeName
  );
  return (
    <Bootstrap
      trackingProvider={TrackingProvider}
      overrides={overrides}
      themeName={localThemeName}
    >
      <Pane style={{ position: 'absolute' }} elevation={4} p={15} ml={[0, 300]}>
        <ButtonGroup>
          <Button asWrapper onClick={() => setThemeName('fiftyup')}>
            <Logo width={75} entityBrand="fiftyup" />
          </Button>
          <Button asWrapper onClick={() => setThemeName('obs')}>
            <Logo width={75} entityBrand="obs" />
          </Button>
          <Button asWrapper onClick={() => setThemeName('ninesaver')}>
            <Logo width={75} entityBrand="ninesaver" />
          </Button>
        </ButtonGroup>
      </Pane>
      {children}
    </Bootstrap>
  );
};

TestBootstrap.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object,
  children: PropTypes.node,
};

export default TestBootstrap;
