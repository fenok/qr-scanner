import React from 'react';
import { Section, useSetCurrentSection } from '../App/CurrentSectionProvider';

export function useSettingsOnEsc() {
    const setCurrentSection = useSetCurrentSection();

    React.useEffect(() => {
        function onKeyPress(event: KeyboardEvent) {
            if (event.key.toLowerCase() === 'escape') {
                setCurrentSection(Section.SETTINGS);
            }
        }

        window.addEventListener('keydown', onKeyPress);

        return () => {
            window.removeEventListener('keydown', onKeyPress);
        };
    }, [setCurrentSection]);
}
