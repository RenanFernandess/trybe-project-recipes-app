import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ContainerLink = styled(Link)`
  flex: 1 1 172;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
  border: 1px solid ${({ theme }) => theme.COLORS.BORDER};
  border-radius: 5px;
  min-width: 172px;
  max-width: 300px;
  text-decoration: none;
`;

export default ContainerLink;

export const Text = styled.p`
  color: ${({ theme }) => theme.COLORS.TEXT_PRIMARY};
  margin: 0;
  padding: 5px;
`;
