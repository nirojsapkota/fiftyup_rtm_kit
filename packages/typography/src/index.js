import React from 'react';
import Header from './header';
import Small from './small';
import Paragraph from './paragraph';
import Label from './label';
import { Text, labelTextStyles } from './text';
import { Blurb } from './blurb';
const unified = require('unified');
const markdown = require('remark-parse');
const stringify = require('rehype-stringify');
const remark2rehype = require('remark-rehype');

const toComponent = ast => {
  return renderComponent(ast);
};

const renderComponent = ({ type, ...props }, i) => {
  const mappedType = primitiveMap[type];
  if (typeof mappedType !== 'function') {
    console.log('Mapped type not found for', type, props);
    throw 'No!';
  }

  const intrinsicProps = mappedType(props);
  return <Text key={`${type}-${i}`} {...intrinsicProps} />;
};

const renderChildren = children => {
  return children
    ? children.map((child, i) => renderComponent(child, i))
    : null;
};
const primitiveMap = {
  root: ({ children }) => ({
    as: 'span',
    tag: 'span',
    children: renderChildren(children),
  }),
  heading: ({ children, depth }) => ({
    ...Header.defaultProps,
    as: `h${depth}`,
    tag: `h${depth}`,
    children: renderChildren(children),
  }),
  paragraph: ({ children }) => ({
    ...Paragraph.defaultProps,
    as: 'p',
    tag: 'p',
    children: renderChildren(children),
  }),
  strong: ({ children }) => ({
    as: 'strong',
    tag: 'strong',
    weight: 'bold',
    children: renderChildren(children),
  }),
  emphasis: ({ children }) => ({
    as: 'em',
    tag: 'em',
    children: renderChildren(children),
  }),
  footnoteReference: ({ children, label }) => ({
    as: 'sup',
    tag: 'span',
    children: label,
  }),
  footnote: ({ children }) => ({
    as: 'sup',
    tag: 'span',
    children: renderChildren(children),
  }),
  text: ({ value }) => ({
    as: 'span',
    tag: 'span',
    children: value,
  }),
  link: ({ children, ...rest }) => ({
    as: 'a',
    tag: 'p',
    href: rest.url,
    children: renderChildren(children),
  }),
};

export const Markdown = ({ raw }) => {
  const meh = unified()
    .use(markdown, { commonmark: true, footnotes: true })
    // .use(mentions)
    // .use(references)
    .use(remark2rehype)
    .use(stringify)
    .parse(raw.toString());

  return toComponent(meh);
};

export { Header, Small, Paragraph, Label, Text, Blurb, labelTextStyles };
