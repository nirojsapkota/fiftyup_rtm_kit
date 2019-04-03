import React from 'react';
import { render, fireEvent } from '../../../bootstrap/setup/testSetup';
import Accordion from '../index';

describe('<Accordion/>', () => {
  const props = {
    footNote: {
      type: 'text',
      value: 'Footer text',
    },
    items: [
      {
        header: 'Heading 1',
        body: [
          {
            title: 'Title item 1',
            body: {
              type: 'text',
              value: 'Welcome to react',
            },
          },
        ],
      },
    ],
  };
  it('renders match expected output', () => {
    const { getByText } = render(
      <Accordion
        {...props}
        renderHeader={h => <h2>{h.header}</h2>}
        renderItem={item => <div>{item.body}</div>}
      />
    );
    expect(getByText('Heading 1')).toBeInTheDocument();
  });

  it('calls onClick to display content', () => {
    const { getByText, container } = render(
      <Accordion
        {...props}
        renderItem={item => {
          return (
            <div>
              <h2>{item.body[0].title}</h2>
              <h2>{item.body[0].body.value}</h2>
            </div>
          );
        }}
        renderHeader={h => {
          return <div>{h.header}</div>;
        }}
      />
    );
    const headingText = getByText('Heading 1');
    fireEvent.click(headingText);

    expect(getByText('Welcome to react')).toBeInTheDocument();
    expect(getByText('Title item 1')).toBeInTheDocument();
  });

  it('Set default content of tab by index', () => {
    const { getByText } = render(
      <Accordion
        activeItemIndex={0}
        {...props}
        renderItem={item => {
          return (
            <div>
              <h2>{item.body[0].title}</h2>
              <h2>{item.body[0].body.value}</h2>
            </div>
          );
        }}
        renderHeader={h => {
          return <div>{h.header}</div>;
        }}
      />
    );
    const headingText = getByText('Heading 1');
    expect(getByText('Welcome to react')).toBeInTheDocument();
    expect(getByText('Title item 1')).toBeInTheDocument();
  });

  it('Double click on header tab to hidden the content', () => {
    const firstItem = props.items[0]
    const { queryByText, getByText } = render(
      <Accordion
        {...props}
        activeItemIndex={null}
        renderItem={item => {
          return (
            <div>
              <h2>{item.body[0].title}</h2>
              <h2>{item.body[0].body.value}</h2>
            </div>
          );
        }}
        renderHeader={h => {
          return <div>{h.header}</div>;
        }}
      />
    );
    const headingText = getByText(firstItem.header);
    fireEvent.click(headingText);
    fireEvent.click(headingText);
    expect(queryByText('Welcome to react')).not.toBeInTheDocument();
    expect(queryByText('Title item 1')).not.toBeInTheDocument();
  });
});
