import React from 'react';
import PropTypes from 'prop-types';
import { render } from '../../../bootstrap/setup/testSetup';
import { EntityProvider, withEntity } from '../index';
import entityProps, {
  fiftyup as fiftyupProps,
} from '../__fixtures__/entityContext';

const TestComponent = ({ entity }) => {
  const {
    getBrand,
    getBrandName,
    getBusinessTelephoneNumber,
    getBusinessInfo,
    getBusinessHours,
    getFinancialServicesGuide,
    getTwitterLink,
    getFacebookLink,
  } = entity;

  return (
    <div>
      <div>{getBrand()}</div>
      <div>{getBrandName()}</div>
      <div>{getBusinessTelephoneNumber()}</div>
      <div>{getBusinessInfo()}</div>
      <div>{getBusinessHours()}</div>
      <div>{getFinancialServicesGuide()}</div>
      <div>{getTwitterLink()}</div>
      <div>{getFacebookLink()}</div>
    </div>
  );
};

TestComponent.propTypes = {
  entity: PropTypes.shape({}),
};

describe('<EntityProvider />', () => {
  it('matches expected output', () => {
    const WithEntityComponent = withEntity(TestComponent);
    const { getByText, container } = render(
      <EntityProvider entity={entityProps}>
        <WithEntityComponent />
      </EntityProvider>
    );

    expect(getByText(entityProps.brand)).toBeInTheDocument();
    expect(getByText(entityProps.name)).toBeInTheDocument();
    expect(getByText('TEL: 1300 858 737')).toBeInTheDocument();
    expect(container).toHaveTextContent('One Big Switch AFSL 455982');
    expect(container).toHaveTextContent('One Big Switch ACL 405918');
    expect(container).toHaveTextContent('One Big Switch ABN 75 150 963 474');
    expect(
      getByText(entityProps.business_opening_hours_html)
    ).toBeInTheDocument();
    expect(
      getByText(
        'https://s3-ap-southeast-1.amazonaws.com/onebigswitch/OBSFSG.pdf'
      )
    ).toBeInTheDocument();
    expect(getByText('https://twitter.com/OneBigSwitchAU')).toBeInTheDocument();
    expect(getByText('https://facebook.com/onebigswitch')).toBeInTheDocument();

    expect(container).toMatchSnapshot();
  });

  it('props does not have entity brand and namespace', () => {
    const WithEntityComponent = withEntity(TestComponent);
    const props = { ...entityProps, brand: null, namespace: null };
    const { queryByText } = render(
      <EntityProvider entity={props}>
        <WithEntityComponent />
      </EntityProvider>
    );

    expect(queryByText(entityProps.brand)).not.toBeInTheDocument();
    expect(queryByText(entityProps.name)).not.toBeInTheDocument();
    expect(queryByText('TEL: 1300 858 737')).not.toBeInTheDocument();
    expect(queryByText('One Big Switch AFSL 455982')).not.toBeInTheDocument();
    expect(queryByText('One Big Switch ACL 405918')).not.toBeInTheDocument();
    expect(
      queryByText('One Big Switch ABN 75 150 963 474')
    ).not.toBeInTheDocument();
    expect(
      queryByText(
        'https://s3-ap-southeast-1.amazonaws.com/onebigswitch/OBSFSG.pdf'
      )
    ).not.toBeInTheDocument();
    expect(
      queryByText('https://twitter.com/OneBigSwitchAU')
    ).not.toBeInTheDocument();
    expect(
      queryByText('https://facebook.com/onebigswitch')
    ).not.toBeInTheDocument();
  });

  it('props does not have business opening hours', () => {
    const WithEntityComponent = withEntity(TestComponent);
    const props = { ...entityProps, business_opening_hours_html: null };
    const { queryByText } = render(
      <EntityProvider entity={props}>
        <WithEntityComponent />
      </EntityProvider>
    );
    expect(
      queryByText(entityProps.business_opening_hours_html)
    ).not.toBeInTheDocument();
  });

  it('props match fiftyup info', () => {
    const WithEntityComponent = withEntity(TestComponent);
    const { getByText, container } = render(
      <EntityProvider entity={fiftyupProps}>
        <WithEntityComponent />
      </EntityProvider>
    );

    expect(getByText(fiftyupProps.brand)).toBeInTheDocument();
    expect(getByText(fiftyupProps.name)).toBeInTheDocument();
    expect(getByText('TEL: 1300 969 382')).toBeInTheDocument();
    expect(container).toHaveTextContent('FiftyUp Club Pty Ltd CAR 465649');
    expect(container).toHaveTextContent('FiftyUp Club Pty Ltd CR 481478');
    expect(container).toHaveTextContent('FiftyUp Club Pty Ltd ACN 166 905 175');
    expect(
      getByText(fiftyupProps.business_opening_hours_html)
    ).toBeInTheDocument();
    expect(
      getByText(
        'https://s3-ap-southeast-1.amazonaws.com/onebigswitch/50UPFSG.pdf'
      )
    ).toBeInTheDocument();
    expect(getByText('https://twitter.com/FiftyUpClub')).toBeInTheDocument();
    expect(
      getByText('https://facebook.com/pages/FiftyUp-Club/381717248640397')
    ).toBeInTheDocument();
  });

  it('TwitterLink and FacebookLink match obsus', () => {
    const WithEntityComponent = withEntity(TestComponent);
    const props = { ...entityProps, namespace: 'obsus' };
    const { getByText } = render(
      <EntityProvider entity={props}>
        <WithEntityComponent />
      </EntityProvider>
    );
    expect(
      getByText('https://twitter.com/OneBigSwitchUSA')
    ).toBeInTheDocument();
    expect(getByText('https://facebook.com/onebigswitch')).toBeInTheDocument();
  });

  it('TwitterLink and FacebookLink match obsie', () => {
    const WithEntityComponent = withEntity(TestComponent);
    const props = { ...entityProps, namespace: 'obsie' };
    const { getByText } = render(
      <EntityProvider entity={props}>
        <WithEntityComponent />
      </EntityProvider>
    );
    expect(
      getByText('https://twitter.com/OneBigSwitchIRE')
    ).toBeInTheDocument();
    expect(
      getByText(
        'https://facebook.com/pages/One-Big-Switch-Ireland/228731240631941'
      )
    ).toBeInTheDocument();
  });

  it('TwitterLink and FacebookLink match ninesaver', () => {
    const WithEntityComponent = withEntity(TestComponent);
    const props = { ...entityProps, namespace: 'ninesaver' };
    const { getByText } = render(
      <EntityProvider entity={props}>
        <WithEntityComponent />
      </EntityProvider>
    );
    expect(getByText('https://twitter.com/9Saver')).toBeInTheDocument();
    expect(
      getByText('https://www.facebook.com/9Saver-268187043689965')
    ).toBeInTheDocument();
  });
});
