import styled from 'styled-components';

const Text = styled.p`
  align-items: center;
  color: ${({ theme }) => theme.COLORS.SECONDARY};
  font-weight: 700;
  display: flex;
  gap: 10px;
`;

export default Text;
