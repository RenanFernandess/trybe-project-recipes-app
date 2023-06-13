import styled from 'styled-components';

const Input = styled.input`
  height: 12px;
  width: 12px;
  margin: 0;

  &::before {
    content: "";
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
    border-radius: 50%;
    height: 100%;
    display: block;
    width: 100%;
  }

  &:checked::before {
    background-color: ${({ theme }) => theme.COLORS.SECONDARY};
    border: 3px solid white;
    height: 6px;
    width: 6px;
  }
`;

export default Input;

export const Label = styled.label`
  cursor: pointer;
  align-items: center;
  display: flex;
  font-size: 0.7rem;
  gap: 5px;
  justify-content: start;
`;
