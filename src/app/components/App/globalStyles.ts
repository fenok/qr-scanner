import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html {
        min-height: 100%;
        display: flex;
        flex-grow: 1;
        align-items: stretch;
    }

    body {
        min-width: 320px;
        margin: 0;
        display: flex;
        flex-grow: 1;
        align-items: stretch;
        font-family: sans-serif;
    }
    
    #root {
        display: flex;
        flex-grow: 1;
        align-items: stretch;
    }
`;
