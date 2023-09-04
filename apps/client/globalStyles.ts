import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle<{}>`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    font-weight: 400;
    overflow-x: hidden;

    height: 100vh;
    width: 100%;
    
    > div:first-child {
      height: 100vh;
    }
  }

  ul[role='list'],
  ol[role='list'],
  menu {
    list-style: none;
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
    outline: none;
    cursor: pointer;
  }
  
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }
  }
`;
