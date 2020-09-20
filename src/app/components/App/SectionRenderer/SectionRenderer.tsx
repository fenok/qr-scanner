import React from 'react';
import { Section, useCurrentSection } from '../CurrentSectionProvider';
import { SettingsSection } from '../../SettingsSection';
import { MainSection } from '../../MainSection';

const SectionRenderer: React.FC = () => {
    const currentSection = useCurrentSection();

    if (currentSection === Section.MAIN) {
        return <MainSection />;
    }

    if (currentSection === Section.SETTINGS) {
        return <SettingsSection />;
    }

    return <div>Unknown section</div>;
};

export { SectionRenderer };
