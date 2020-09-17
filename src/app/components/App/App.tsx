import * as React from 'react';
import { GlobalStyle } from './globalStyles';
import { SectionRenderer } from './SectionRenderer';
import { CurrentSectionProvider } from './CurrentSectionProvider';

const App: React.FC = () => {
    return (
        <>
            <GlobalStyle />
            <CurrentSectionProvider>
                <SectionRenderer />
            </CurrentSectionProvider>
        </>
    );
};

export { App };
