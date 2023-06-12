import styled from 'styled-components';

const Container = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  gap: 20px;
  padding: 20px;
`;

export default Container;

export const Line = styled.div`
  background-color: ${({ theme }) => theme.COLORS.LINE};
  font-weight: 500;
  height: 1px;
  width: 100%;
`;
