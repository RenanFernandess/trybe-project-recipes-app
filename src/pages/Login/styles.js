import styled from 'styled-components';

const Container = styled.div`
  align-content: center;
  background-image: linear-gradient(
    to bottom,
    ${({ theme }) => theme.COLORS.PRIMARY} 50%,
    ${({ theme }) => theme.COLORS.BACKGROUND} 50%);
  display: grid;
  justify-content: center;
  padding: 20px 10px;
  height: 100vh;
`;
export default Container;

export const Title = styled.h1`
  color: ${({ theme }) => theme.COLORS.PRIMARY};
  font-style: italic;
  text-align: center;
`;

export const TomatoImage = styled.img`
  max-width: 100%;
  transform: translate(-50px) scale(1.3);
`;
