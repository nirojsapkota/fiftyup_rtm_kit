import styled from 'styled-components';
import { Box, Card } from '@rtm-ui/layout';

export const MerchantBox = styled.div`
  max-width: 250px;
  margin: 10px auto;
  padding-top: 10px;
`;
export const SidebarWrapper = styled.div`
  min-width: 340px;
`;

export const StyledWrapper = styled(Box)`
  position: relative;
  justify-content: center;
  display: flex;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    right: 0;
    background-color: ${props => props.theme.colors.grayscale.lightest};
    height: 320px;

    @media (min-width: ${props => props.theme.grid.md}) {
      height: 400px;
    }
  }
`;

export const ContentWrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;

  max-width: 1400px;
  width: 100%;
`;

export const ImageContentWrapper = styled(Box)`
  @media screen and (min-width: 750px) {
    width: 50%;
  }
`;

export const Sidebar = styled(Box)`
  position: sticky;
  top: 0;
  align-self: flex-start;
`;

export const StyledAccordion = styled(Box)`
  background: ${props => props.theme.colors.grayscale.lightest};
`;

export const Cta = styled(Card)`
  display: inherit;
`;
