import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
 * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: ${({ theme: { white } }) => white.colors.background};
    color: ${({ theme: { white } }) => white.colors.text.primary};
    font-family: 'Epilogue', sans-serif;
  }

  a {
    text-decoration: none;
  }
`;
