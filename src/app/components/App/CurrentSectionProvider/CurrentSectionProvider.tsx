import * as React from 'react';

enum Section {
    MAIN = 'main',
    SETTINGS = 'settings',
}

const CurrentSectionContext = React.createContext<Section>(Section.MAIN);
const SetCurrentSectionContext = React.createContext<React.Dispatch<React.SetStateAction<Section>>>(() => {});

const CurrentSectionProvider: React.FC = ({ children }) => {
    const [currentSection, setCurrentSection] = React.useState(Section.MAIN);

    return (
        <CurrentSectionContext.Provider value={currentSection}>
            <SetCurrentSectionContext.Provider value={setCurrentSection}>{children}</SetCurrentSectionContext.Provider>
        </CurrentSectionContext.Provider>
    );
};

export { Section, CurrentSectionProvider, CurrentSectionContext, SetCurrentSectionContext };
