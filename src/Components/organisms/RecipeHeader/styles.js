import styled from 'styled-components';

const Header = styled.header`
  align-items: start;
  background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
    url(${(props) => props.background});
  background-position: center;
  background-repeat: no-repeat;
  display: grid;
  height: 25vh;
  justify-content: baseline;
  position: relative;
  width: 100%;
`;

export default Header;

export const Div = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.COLORS.TEXT_SECONDARY};
  font-weight: 900;
  text-transform: uppercase;
  text-align: center;
`;
