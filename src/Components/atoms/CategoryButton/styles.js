import styled from 'styled-components';

const Button = styled.button`
  align-items: center;
  background: none;
  border: none;
  display: flex;
  font-size: 0.7rem;
  flex-direction: column;
  gap: 5px;
  justify-content: start;
  min-height: 85px;
  min-width: 30px;
  max-width: 60px;
  padding: 2px;
`;

export default Button;

export const Text = styled.p`
  color: ${({ theme }) => theme.COLORS.TEXT_TERTIARY};
`;
