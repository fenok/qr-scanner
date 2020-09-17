import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html {
        min-height: 100%;
        display: flex;
        flex-grow: 1;
        align-items: stretch;
    }

    body {
        margin: 0;
        display: flex;
        flex-grow: 1;
        align-items: stretch;
    }
    
    #root {
        display: flex;
        flex-grow: 1;
        align-items: stretch;
    }
`;
