import styled from 'styled-components';

const Container = styled.footer`
  background-color: ${({ theme }) => theme.COLORS.PRIMARY};
  bottom: 0;
  display: flex;
  justify-content: space-between;
  height: 40px;
  padding: 5px 30px;
  position: fixed;
  width: 100%;
`;

export default Container;
