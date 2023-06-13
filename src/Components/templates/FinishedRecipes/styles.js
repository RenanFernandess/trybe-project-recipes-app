import styled from 'styled-components';

const Container = styled.main`
  padding: 20px;
`;

export default Container;

export const Categories = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;

export const Cards = styled.section`
  display: flex;
  flex-direction: column;
  margin: 30px 0;
  gap: 10px;
`;
