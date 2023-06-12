import styled from 'styled-components';

const Button = styled.button`
  align-items: center;
  background: none;
  border: none;
  display: flex;
  gap: 10px;
  justify-content: start;
  min-height: 30px;
  min-width: 30px;
  padding: 5px 20px;
`;

export default Button;

export const Text = styled.p`
  color: ${({ theme }) => theme.COLORS.TEXT_TERTIARY};
  font-size: 1.5rem;
`;
