import React from 'react';
import PropTypes from 'prop-types';
import { render } from '../../../bootstrap/setup/testSetup';
import { EntityProvider, EntityConsumer } from '../index';

import { fiftyup, ninesaver, obsau, obseu, obsus } from '../entities';

const TestComponent = ({ entity }) => {
  const { brand, namespace } = entity;

  return (
    <div>
      <div>{brand}</div>
      <div>{namespace}</div>
    </div>
  );
};

TestComponent.propTypes = {
  entity: PropTypes.shape({}),
};

describe('<EntityProvider />', () => {
  it('matches expected output obsau', () => {
    const { getByText, container } = render(
      <EntityProvider entity={obsau}>
        <EntityConsumer>
          {entity => <TestComponent entity={entity} />}
        </EntityConsumer>
      </EntityProvider>
    );

    expect(getByText(obsau.brand)).toBeInTheDocument();
    expect(getByText(obsau.namespace)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('matches expected output obseu', () => {
    const { getByText, container } = render(
      <EntityProvider entity={obseu}>
        <EntityConsumer>
          {entity => <TestComponent entity={entity} />}
        </EntityConsumer>
      </EntityProvider>
    );

    expect(getByText(obseu.brand)).toBeInTheDocument();
    expect(getByText(obseu.namespace)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('matches expected output obsus', () => {
    const { getByText, container } = render(
      <EntityProvider entity={obsus}>
        <EntityConsumer>
          {entity => <TestComponent entity={entity} />}
        </EntityConsumer>
      </EntityProvider>
    );

    expect(getByText(obsus.brand)).toBeInTheDocument();
    expect(getByText(obsus.namespace)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('matches expected output fiftyup', () => {
    const { getByText, container } = render(
      <EntityProvider entity={fiftyup}>
        <EntityConsumer>
          {entity => <TestComponent entity={entity} />}
        </EntityConsumer>
      </EntityProvider>
    );

    expect(getByText(fiftyup.brand)).toBeInTheDocument();
    expect(getByText(fiftyup.namespace)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('matches expected output ninesaver', () => {
    const { getByText, container } = render(
      <EntityProvider entity={ninesaver}>
        <EntityConsumer>
          {entity => <TestComponent entity={entity} />}
        </EntityConsumer>
      </EntityProvider>
    );

    expect(getByText(ninesaver.brand)).toBeInTheDocument();
    expect(getByText(ninesaver.namespace)).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('matches expected output fiftyup with empty name space', () => {
    const entity = { brand: fiftyup.brand, namespace: '' };
    const { getByText } = render(
      <EntityProvider entity={entity}>
        <EntityConsumer>
          {entity => <TestComponent entity={entity} />}
        </EntityConsumer>
      </EntityProvider>
    );

    expect(getByText(fiftyup.brand)).toBeInTheDocument();
    expect(getByText(fiftyup.namespace)).toBeInTheDocument();
  });
});
