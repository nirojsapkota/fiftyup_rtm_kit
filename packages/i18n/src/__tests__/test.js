import React from 'react';
import { render } from '@testing-library/react';
import { LocaleProvider, useLocale } from '../index';

const Wrapper = ({ children }) => {
  return (
    <LocaleProvider keys={{ en: { myMessage: 'Hello, World!' } }}>
      {children}
    </LocaleProvider>
  );
};

const NestedItem = () => {
  const { myMessage } = useLocale({ key: 'myMessage' });

  return <p>{myMessage}</p>;
};

// NOTE: these tests render with the unwrapped version of `render`
// since we don't want to catch errors with the Bootstrap error boundary
describe('<I18n />', () => {
  it('matches expected output', () => {
    const { getByText } = render(
      <Wrapper>
        <NestedItem />
      </Wrapper>
    );

    expect(getByText('Hello, World!')).toBeInTheDocument();
  });
  it('throws an error of its own when context isnt provided', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<NestedItem />)).toThrow();
  });
});
