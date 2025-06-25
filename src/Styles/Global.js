// // import { createGlobalStyle } from "styled-components";

// // export const GlobalStyle = createGlobalStyle`
// //   body {
// //     background-color: black;
// //   }
// //     .current{

// // }
// //     .current-right{
// //     }
// // `;
// import { createGlobalStyle } from "styled-components";

// export const GlobalStyle = createGlobalStyle`
//   body {
//     font-family: sans-serif;
//     background: #f0f2f5;
//     margin: 0;
//     padding: 0;
//   }
//   .App {
//     max-width: 800px;
//     margin: 2rem auto;
//     background: white;
//     padding: 2rem;
//     border-radius: 8px;
//     box-shadow: 0 2px 8px rgba(0,0,0,0.1);
//   }
//   .mode {
//     display: flex;
//     justify-content: center;
//     gap: 1rem;
//     margin-top: 0.5rem;
//   }
//   .time-mode {
//     cursor: pointer;
//     padding: 0.5rem 1rem;
//     border: 1px solid #ccc;
//     border-radius: 4px;
//   }
//   .time-mode.selected {
//     background: #007bff;
//     color: white;
//     border-color: #007bff;
//   }
//   .word-container {
//     margin-bottom: 1rem;
//     font-size: 1.2rem;
//     line-height: 2rem;
//     user-select: none;
//   }
//   .current-word {
//     text-decoration: underline;
//   }
//   input {
//     width: 100%;
//     padding: 0.5rem;
//     font-size: 1rem;
//     box-sizing: border-box;
//   }
//   .result {
//     margin-top: 1rem;
//     text-align: center;
//   }
// `;
// global.js
// global.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  /* Reset some default styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    // background-color: #f4f4f4;
    background-color: black;

    color: #333;
    line-height: 1.6;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: normal;
  }

  /* Additional styling for components, e.g., TypingBox */
  .typing-box {
    background-color: white;
    padding: 20px;
    max-width: 800px;
    margin: 20px auto;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .typing-box textarea {
    width: 100%;
    height: 150px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: none;
  }

  .upper-menu {
    // background-color: #007BFF;
    color: white;
    padding: 15px;
    text-align: center;
  }
`;

export default GlobalStyle;
