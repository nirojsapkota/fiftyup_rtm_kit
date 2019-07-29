import React from 'react';
import Header from './header';
import Paragraph from './paragraph';
import { Box } from '@rtm-ui/layout';
import styled from 'styled-components';
import { Text } from './text';
import unified from 'unified';
import markdown from 'remark-parse';
import stringify from 'rehype-stringify';
import remark2rehype from 'remark-rehype';
import interpolator from './interpolator';
import blocks from './blocks';

const toComponent = (ast, i) => {
  return renderComponent(ast, i);
};

const renderComponent = ({ type, ...props }, i) => {
  const mappedType = primitiveMap[type];
  if (typeof mappedType !== 'function') {
    console.log('Mapped type not found for', type, props);
    return null;
  }

  const intrinsicProps = mappedType(props);
  return <Text key={`${type}-${i}`} {...intrinsicProps} />;
};

const renderChildren = children =>
  children.map((child, i) => renderComponent(child, i));

const primitiveMap = {
  heading: ({ children, depth }) => ({
    ...Header.defaultProps,
    as: `h${depth}`,
    tag: `h${depth}`,
    mb: 30,
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
  list: ({ children, ordered }) => ({
    as: ordered === true ? 'ol' : 'ul',
    tag: ordered === true ? 'ol' : 'ul',
    children: renderChildren(children),
  }),
  block: ({ children, rules }) => {
    return {
      ...rules,
      className: 'block-container',
      children: renderChildren(children),
    };
  },
  listItem: ({ children }) => ({
    as: 'li',
    tag: 'li',
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
  handlebars: ({ children }) => ({
    as: 'span',
    tag: 'span',
    // NOTE: For now this just casts the child item to a string. Not
    // sure if there's a use-case for an object or array or something
    // else here
    children: renderChildren(children),
  }),
  text: ({ value }) => ({
    as: 'span',
    tag: 'span',
    children: value,
  }),
  link: ({ children, ...rest }) => {
    let props = {};
    // FIXME: we may want some sort of error when more
    // just plaintext is dropped into a link tag
    if (children[0].value.split('|').length === 2) {
      const track = children[0].value.split('|')[1] || null;
      const value = children[0].value.split('|')[0];
      props = {
        track,
        children: value,
      };
    } else {
      props = {
        children: renderChildren(children),
      };
    }
    return {
      as: 'a',
      tag: 'a',
      color: 'link',
      href: rest.url,
      title: rest.title,
      ...props,
    };
  },
};

// Add margin-bottom to each child except last
const MarkdownBox = styled(Box)`
  > *:not(:last-child) {
    margin-bottom: 20px;
  }
  .block-container > *:not(:last-child) {
    margin-bottom: 10px;
  }

  ul,
  ol {
    li {
      &:not(:last-child) {
        margin-bottom: 20px;
      }

      p {
        display: inline;
      }
    }
  }
`;

export const Markdown = ({ raw, referenceObject = {}, ...boxProps }) => {
  const ast = unified()
    .use(markdown, { commonmark: true, footnotes: true })
    .use(interpolator, referenceObject)
    .use(blocks)
    .use(remark2rehype)
    .use(stringify)
    .parse(raw.toString());

  return (
    <MarkdownBox {...boxProps} data-testid="markdown">
      {ast.children.map((item, i) => toComponent(item, i))}
    </MarkdownBox>
  );
};
