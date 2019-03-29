import React from 'react';
import frontMatter from './frontMatter';
import styled from 'styled-components';
import { Link } from 'docz';
import { Card } from '../packages/layout/src';
import { Header, Paragraph } from '../packages/typography/src';

const groupBy = (list, props) => {
  return list.reduce((a, b) => {
    (a[b[props]] = a[b[props]] || []).push(b);
    return a;
  }, {});
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  padding: 10px;
  grid-gap: 10px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const BoxCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #efefef;
  }
`;

const Welcome = () => {
  const groups = groupBy(frontMatter, 'menu');
  const groupKeys = Object.keys(groups);

  return (
    <div>
      {groupKeys.map(key => {
        return (
          <div>
            {key !== 'undefined' && (
              <Header py={20} tag="h3">
                {key}
              </Header>
            )}
            <Container key={key}>
              {groups[key].map(item => {
                return (
                  <StyledLink to={item.route}>
                    <BoxCard py={20}>
                      <Paragraph>{item.name}</Paragraph>
                    </BoxCard>
                  </StyledLink>
                );
              })}
            </Container>
          </div>
        );
      })}
    </div>
  );
};

export default Welcome;
