import styled from 'styled-components';

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.COLORS.PRIMARY};
  border-radius: 5px;
  height: 40px;
  padding: 5px 10px;

  &::placeholder {
    color: ${({ theme }) => theme.COLORS.PRIMARY};;
  }
`;

export default Input;
