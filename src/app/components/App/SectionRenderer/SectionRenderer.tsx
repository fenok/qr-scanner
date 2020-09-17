import React from 'react';
import { CurrentSectionContext, Section } from '../CurrentSectionProvider';
import { SettingsSection } from '../../SettingsSection';
import { MainSection } from '../../MainSection';

const SectionRenderer: React.FC = () => {
    const currentSection = React.useContext(CurrentSectionContext);

    if (currentSection === Section.MAIN) {
        return <MainSection />;
    }

    if (currentSection === Section.SETTINGS) {
        return <SettingsSection />;
    }

    return <div>Unknown section</div>;
};

export { SectionRenderer };
