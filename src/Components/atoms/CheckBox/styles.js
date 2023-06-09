import styled from 'styled-components';

const Input = styled.input`
  height: 15px;
  width: 15px;
  margin-right: 10px;
  position: relative;

  &::before {
    content: "";
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
    border: 2px solid ${({ theme }) => theme.COLORS.SECONDARY};
    border-radius: 2px;
    display: block;
    height: 100%;
    width: 100%;
  }

  &:checked::after {
    content: "";
    border-right: 2px solid ${({ theme }) => theme.COLORS.SECONDARY};
    border-bottom: 2px solid ${({ theme }) => theme.COLORS.SECONDARY};
    display: block;
    height: 9px;
    left: 6px;
    position: absolute;
    transform: rotate(40deg);
    top: 2px;
    width: 5px;
  }
`;

export default Input;

export const Label = styled.label`
  cursor: pointer;
`;
