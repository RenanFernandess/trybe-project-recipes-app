import styled from 'styled-components';

const Text = styled.p`
  color: ${({ theme }) => theme.COLORS.SECONDARY};
  font-weight: 700;

  img {
    margin-right: 5px;
  }
`;

export default Text;
