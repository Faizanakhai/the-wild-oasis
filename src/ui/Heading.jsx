import styled, { css } from "styled-components";

// const test = css`
//   text-align: center;
//   ${10 > 5 && "background-color: yellow"}
// `;

const Heading = styled.h1`
  ${(prop) =>
    prop.as === "h1" &&
    css`
      font-size: 3rem;
      font-weight: 600;
    `}

  ${(prop) =>
    prop.as === "h2" &&
    css`
      font-size: 2rem;
      font-weight: 600;
    `}

    ${(prop) =>
    prop.as === "h3" &&
    css`
      font-size: 2rem;
      font-weight: 500;
    `}

    ${(prop) =>
    prop.as === "h4" &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
    `}

    line-height: 1.4
`;

export default Heading;
