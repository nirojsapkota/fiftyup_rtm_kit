import React from 'react';
import { getColor, getWeight, obs } from '@rtm-ui/theme';
// eslint-disable-next-line import/named
import {
  render,
  // eslint-disable-next-line import/named
  fireEvent,
  // eslint-disable-next-line import/named
  wait,
  // eslint-disable-next-line import/named
  cleanup,
} from '../../../bootstrap/setup/testSetup';
import { default as energyPlanProp } from '../__fixtures__/energyPlan';
import { EnergyPlan } from '../energyPlan';
import { GenericPlan } from '../genericPlan';
import { PlanSelector, Plan } from '../index';

afterEach(cleanup);

describe('<EnergyPlan />', () => {
  it('matches expected output', async () => {
    // get first energy plan from fixture to check
    const plan = {
      ...energyPlanProp.plans[0],
      planRate: 'Plan rate data',
      planBrief: 'Plan brief data',
    };

    const { getByText, getByAltText } = render(<EnergyPlan {...plan} />);

    expect(getByText(plan.displayName)).toBeInTheDocument();
    expect(getByText(plan.planRate)).toBeInTheDocument();
    expect(getByText(plan.planBrief)).toBeInTheDocument();
    expect(getByText(plan.button.text)).toBeInTheDocument();

    const logo = getByAltText(plan.merchant.fullName);
    expect(logo).toBeInTheDocument();
    expect(logo.tagName).toEqual('IMG');
    expect(logo.src).toEqual(plan.merchant.logo);
  });
});

describe('<GenericPlan />', () => {
  it('matches expected output', async () => {
    const testContent = 'Expectation test content';
    const { getByText } = render(
      <GenericPlan>
        <div>{testContent}</div>
      </GenericPlan>
    );

    expect(getByText(testContent)).toBeInTheDocument();
  });
});

describe('<Plan />', () => {
  it('fallback to default generic plan', async () => {
    const data = {
      productName: 'testProduct',
    };
    const testContent = 'Expectation test content';
    const { getByText } = render(
      <Plan {...data}>
        <div>{testContent}</div>
      </Plan>
    );

    expect(getByText(testContent)).toBeInTheDocument();
  });
});

describe('<PlanSelector />', () => {
  it('matches expected output', async () => {
    const callCentre = energyPlanProp.callCentre;
    const { getByText } = render(<PlanSelector {...energyPlanProp} />);
    expect(getByText(energyPlanProp.header)).toBeInTheDocument();

    expect(getByText(callCentre.moreInfo)).toBeInTheDocument();
    expect(getByText(callCentre.callMerchant)).toBeInTheDocument();
    expect(getByText(callCentre.phoneNumber)).toBeInTheDocument();
    expect(getByText(callCentre.officeHour)).toBeInTheDocument();
  });

  it('custom render component', async () => {
    const plans = energyPlanProp.plans;

    const { getByText } = render(
      <PlanSelector
        {...energyPlanProp}
        renderPlan={({ plan, index }) => (
          <div key={`plan-${index}`}>{plan.id}</div>
        )}
      />
    );

    await wait(async () => {
      await plans.forEach(async plan => {
        const el = await getByText(plan.id);
        expect(el).toBeInTheDocument();
      });
    });
  });
});
