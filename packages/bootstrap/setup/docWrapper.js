import React from 'react';
import styled from 'styled-components';
import { useWindowSize } from '../../nav/src/useWindowSize';

const Wrapper = styled.div`
  position: absolute;
  left: ${props => props.offsetLeft}px;
  right: 0;
`;

const Container = styled.div``;

const DocWrapper = ({ children }) => {
  const navWidth = 280;
  const navBreakpoint = 1120;
  const ref = React.useRef();
  const windowSize = useWindowSize();
  const [height, setHeight] = React.useState(0);
  const [left, setLeft] = React.useState(navWidth);

  React.useEffect(
    () => {
      if (windowSize.width < navBreakpoint) {
        setLeft(0);
      } else {
        setLeft(navWidth);
      }
      if (ref.current) {
        const { height } = ref.current.getBoundingClientRect();
        setHeight(height);
      }
    },
    [() => ref.current || windowSize]
  );

  return (
    <Container style={{ paddingBottom: `${height}px` }}>
      <div />
      <Wrapper offsetLeft={left}>
        <div ref={ref}>{children}</div>
      </Wrapper>
    </Container>
  );
};

export { DocWrapper };
