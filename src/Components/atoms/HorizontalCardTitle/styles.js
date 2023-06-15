import styled from 'styled-components';

const Title = styled.p`
  font-weight: 900;
`;

export default Title;

export const Container = styled.div`
  grid-area: Title;
`;

export const Category = styled.div`
  color: ${({ theme }) => theme.COLORS.TEXT_TERTIARY};
  font-size: 0.7rem;
`;
