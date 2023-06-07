import styled from 'styled-components';

const Header = styled.header`
  align-items: start;
  background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)),
    url(${(props) => props.background});
  background-position: center;
  background-repeat: no-repeat;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 40% 60%;
  grid-template-areas: "category category div"
    ". title .";
  height: 25vh;
  padding: 15px;
  position: relative;
  width: 100%;

  p {
    grid-area: category;
  }
`;

export default Header;

export const Div = styled.div`
  align-items: center;
  display: flex;
  grid-area: div;
  justify-content: space-between;
`;

export const Title = styled.h1`
  color: ${({ theme }) => theme.COLORS.TEXT_SECONDARY};
  font-weight: 900;
  grid-area: title;
  text-transform: uppercase;
  text-align: center;
`;
