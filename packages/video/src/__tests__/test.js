import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import Video from '../index';

describe('
<Video />', () => {
it('has unit tests specified', () => {
expect(true).toEqual(false)
})

it('matches expected output', () => {
const text = 'Hello, World!'

const { getByText } = render(<Video>{text}</Video>);

expect(getByText(text)).toBeInTheDocument();
});
})
