import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import Canvas from '../index';

describe('
<Canvas />', () => {
it('has unit tests specified', () => {
expect(true).toEqual(false)
})

it('matches expected output', () => {
const text = 'Hello, World!'

const { getByText } = render(<Canvas>{text}</Canvas>);

expect(getByText(text)).toBeInTheDocument();
});
})
