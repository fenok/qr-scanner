import React from 'react';
import { SetCurrentSectionContext, Section } from '../App';

const SettingsSection: React.FC = () => {
    const setCurrentSection = React.useContext(SetCurrentSectionContext);

    return (
        <div>
            SETTINGS Section<button onClick={() => setCurrentSection(Section.MAIN)}>TO MAIN</button>
        </div>
    );
};

export { SettingsSection };
