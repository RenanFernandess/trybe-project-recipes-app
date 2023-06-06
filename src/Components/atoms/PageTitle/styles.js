import styled from 'styled-components';

const Title = styled.h2`
  align-items: center;
  display: grid;
  color: ${({ theme }) => theme.COLORS.PRIMARY};
  font-weight: 900;
  justify-content: center;
  gap: 10px;
  padding: 10px;

  img {
    margin: 0 auto;
  }
`;

export default Title;
