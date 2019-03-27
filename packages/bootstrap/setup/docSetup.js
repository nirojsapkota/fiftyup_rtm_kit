import React from 'react';
import PropTypes from 'prop-types';
import { TrackingProvider } from '@rtm-ui/tracker';
import Button, { ButtonGroup } from '../../button/src';
import { Logo } from '../../icon/src';
import Bootstrap from '../src';
import { useLocalStorage } from './useLocalStorage';
import DocWrapper from './docWrapper';

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
      <DocWrapper>
        <ButtonGroup style={{ padding: '10px 10px 5px' }}>
          <Button
            style={{
              paddingBottom: '2px',
              boxShadow:
                localThemeName === 'fiftyup'
                  ? 'inset 0 -3px 0px currentColor'
                  : 'none',
            }}
            asWrapper
            onClick={() => setThemeName('fiftyup')}
          >
            <Logo width={75} entityBrand="fiftyup" />
          </Button>
          <Button
            style={{
              paddingBottom: '2px',
              boxShadow:
                localThemeName === 'obs'
                  ? 'inset 0 -3px 0px currentColor'
                  : 'none',
            }}
            asWrapper
            onClick={() => setThemeName('obs')}
          >
            <Logo width={75} entityBrand="obs" />
          </Button>
          <Button
            style={{
              paddingBottom: '2px',
              boxShadow:
                localThemeName === 'ninesaver'
                  ? 'inset 0 -3px 0px currentColor'
                  : 'none',
            }}
            asWrapper
            onClick={() => setThemeName('ninesaver')}
          >
            <Logo width={75} entityBrand="ninesaver" />
          </Button>
        </ButtonGroup>
      </DocWrapper>
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
