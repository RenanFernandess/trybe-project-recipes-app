import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  align-items: center;
  background: none;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 70vh;
`;

export default Container;

const rotate = keyframes`
  to {
    transform: rotate(2turn);
  }
`;

export const Load = styled.div`
  animation: ${rotate} 1.2s infinite;
  border: 0.5rem solid #e5e5e5;
  border-radius: 50%;
  border-top-color: ${({ theme }) => theme.COLORS.PRIMARY};
  height: 10rem;
  transition: 200ms;
  width: 10rem;
`;
