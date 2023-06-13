import styled from 'styled-components';

const Button = styled.button`
  background: none;
  border: none;
  min-height: 30px;
  min-width: 30px;
  max-width: 68px;
  padding: 2px;
`;

export default Button;

export const Text = styled.p`
  color: ${({ theme }) => theme.COLORS.TEXT_TERTIARY};
`;
