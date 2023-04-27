import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	* {
		box-sizing: border-box;
		-ms-overflow-style: none;
        scrollbar-width: none;  
        overflow: -moz-scrollbars-none;
	}
	body {
		background: #171717;
		font-family: "Lexend Deca", sans-serif;
		color: #fafafa;
	}
	::-webkit-scrollbar {
         display: none;
    }
`;

export default GlobalStyle;
