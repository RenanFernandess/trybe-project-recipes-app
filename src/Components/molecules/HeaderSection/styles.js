import styled from 'styled-components';

export const Div = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Container = styled(Div)`
  background-color: ${({ theme }) => theme.COLORS.SECONDARY};
  justify-content: space-between;
  min-height: 50px;
  padding: 5px 15px;
`;

export default Container;

export const Title = styled.h1`
  color: ${({ theme }) => theme.COLORS.PRIMARY};
  font-size: 1.5rem;
  font-weight: 400;
  font-style: italic;
  margin: auto 0;

  span {
    font-weight: 800;
    margin-left: 5px;
  }
`;
