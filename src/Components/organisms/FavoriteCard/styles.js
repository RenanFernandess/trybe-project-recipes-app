import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  border: 1px solid ${({ theme }) => theme.COLORS.BORDER};
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "Image About"
  "Image Buttons";
  max-width: 500px;
  max-height: 250px;
`;

export default Container;

export const Div = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-around;
  grid-area: Buttons;
  padding: 0 20px 20px 20px;
`;

export const DivLink = styled(Link)`
  display: grid;
  grid-area: Image;
`;

export const About = styled(Link)`
  color: ${({ theme }) => theme.COLORS.TEXT_PRIMARY};
  display: flex;
  font-size: 0.8rem;
  flex-direction: column;
  grid-area: About;
  justify-content: space-between;
  padding: 20px;
  text-decoration: none;
`;
