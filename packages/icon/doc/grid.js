import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  background-color: #fff;
`;

export const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  line-height: 1;
`;
