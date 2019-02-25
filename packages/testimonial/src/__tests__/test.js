import React from 'react';
import { render } from '../../../bootstrap/setup/testSetup';
import Testimonial from '../index';

describe('<Testimonial />', async() => {
  const items = [
    {
      id: 1,
      author:"Jenny Jane",
      bio: "Jenny Bio",
      body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      selfie: "https://placeimg.com/400/400/people"
    },
    {
      id: 2,
      author:"Bobby Bob",
      bio: "Bobby bio",
      body:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      selfie: "https://placeimg.com/400/400/people"
    }
  ];

  it('can handle one item', () => {
    const item = items[0];
    const { getByText, getByAltText } = render(<Testimonial items={[item]} />);

    expect(getByText(item.author)).toBeInTheDocument();
    expect(getByText(item.bio)).toBeInTheDocument();
    expect(getByText(item.body)).toBeInTheDocument();
    expect(getByAltText(item.author)).toBeInTheDocument();
  });

  it('can handle more than one items', async() => {
    const { getByText, getByAltText } = await render(<Testimonial items={items} />);

    items.forEach(async item => {
      await expect(getByText(item.author)).toBeInTheDocument();
      await expect(getByText(item.bio)).toBeInTheDocument();
      await expect(getByText(item.body)).toBeInTheDocument();
      await expect(getByAltText(item.author)).toBeInTheDocument();
    })
  })
})
