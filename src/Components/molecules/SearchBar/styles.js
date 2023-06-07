import styled from 'styled-components';

const Form = styled.section`
  align-items: start;
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
  border-radius: 10px;
  display: grid;
  color: ${({ theme }) => theme.COLORS.TEXT_SECONDARY};
  flex-direction: column;
  gap: 5px;
  grid-template-columns: 1fr 4fr 1fr;
  grid-template-areas: "input input input"
  ". categories ."
  ". button .";
  justify-content: center;
  margin: 0 10px;
  min-height: 100px;
  padding-bottom: 15px;

  input[type="text"] {
    border-color: ${({ theme }) => theme.COLORS.TEXT_TERTIARY};
    grid-area: input;

    &::placeholder {
      color: ${({ theme }) => theme.COLORS.TEXT_TERTIARY};
    }
  }

  button {
    grid-area: button;
  }
`;

export default Form;

export const Categories = styled.div`
  grid-area: categories;
  align-items: center;
  display: flex;
  justify-content: space-around;
  gap: 10px;
`;
