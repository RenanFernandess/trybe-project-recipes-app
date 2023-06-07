import styled from 'styled-components';

const Text = styled.article`
  border: 1px solid ${({ theme }) => theme.COLORS.BORDER};
  border-radius: 5px;
  padding: 10px;
`;

export default Text;

export const Title = styled.h2`
  padding: 5px 10px;
`;
