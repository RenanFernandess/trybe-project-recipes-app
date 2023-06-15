import styled from 'styled-components';

const Input = styled.input`
  height: 12px;
  width: 12px;
  margin: 0 5px 0 0;
  position: relative;

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
  font-size: 0.8rem;
  padding: 5px 0;
`;
