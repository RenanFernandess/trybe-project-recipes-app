import styled from 'styled-components';

const DefaultCard = styled.aside`
  background-color: white;
  border: 1px solid ${({ theme: { white } }) => white.colors.border};
  border-radius: 5px;
  height: 166px;
  text-decoration: none;
  width: 163px;

  img {
    border-radius: 5px 5px 0 0;
    height: 134px;
    width: 100%;
  }

  p {
    padding: 5px 10px;
    color: ${({ theme: { white } }) => white.colors.text.primary};
  }
`;
export default DefaultCard;

export const RecipesContainer = styled.section`
  align-items: center;
  display: flex;
  flex-flow: row wrap;
  gap: 6px;
  padding: 5px;
`;
