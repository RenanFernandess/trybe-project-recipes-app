import styled from 'styled-components';

const Input = styled.input`
  height: 15px;
  width: 15px;

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
  }
`;

export default Input;

export const Label = styled.label`
  cursor: pointer;
  align-items: center;
  display: flex;
  gap: 5px;
  justify-content: center;
`;
