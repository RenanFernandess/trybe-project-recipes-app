import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  border: 1px solid ${({ theme }) => theme.COLORS.BORDER};
  border-radius: 5px;
  display: grid;
  grid-template-columns: 12fr 1fr;
  grid-template-areas: "Link Share"
  "Link Share";
`;

export default Container;

export const Share = styled.div`
  grid-area: Share;
  padding: 10px;
`;

export const SectionLink = styled(Link)`
  color: ${({ theme }) => theme.COLORS.TEXT_PRIMARY};
  display: grid;
  grid-area: Link;
  grid-template-columns: 2fr 2fr;
  grid-template-areas: "Image About"
  "Image About"
  "Image About";
  text-decoration: none;

  img {
    grid-area: Image;
  }
`;

export const About = styled.p`
  grid-area: About;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0 20px 20px;
  font-size: 0.8rem;
`;

export const Tags = styled.div`
  display: flex;
  gap: 5px;
`;