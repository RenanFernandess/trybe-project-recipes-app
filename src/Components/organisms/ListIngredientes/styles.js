import styled from 'styled-components';

const List = styled.article`
  border: 1px solid ${({ theme }) => theme.COLORS.BORDER};
  border-radius: 5px;
  padding: 20px;
  list-style: none;
`;

export default List;

export const Title = styled.h2`
  padding: 5px 10px;
`;

export const Container = styled.article`
  margin-bottom: 20px;
`;
