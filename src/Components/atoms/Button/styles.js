import styled from 'styled-components';

const PrimaryButton = styled.button`
  background-color: ${({ theme }) => theme.COLORS.SECONDARY};
  border: none;
  border-radius: 5px;
  color: ${({ theme }) => theme.COLORS.TEXT_SECONDARY};
  font-weight: 700;
  height: 40px;
  min-width: 240px;
  text-align: center;
  text-transform: uppercase;
`;

export default PrimaryButton;
