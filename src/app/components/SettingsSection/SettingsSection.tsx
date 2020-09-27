import React from 'react';
import { Section, useSetCurrentSection } from '../App';
import { DbSettings } from './DbSettings';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

const SettingsSection: React.FC = () => {
    const setCurrentSection = useSetCurrentSection();

    return (
        <Root>
            <Button variant="contained" color="primary" onClick={() => setCurrentSection(Section.MAIN)}>
                Начать сканирование
            </Button>
            <DbSettings />
        </Root>
    );
};

const Root = styled.div`
    margin: auto;
    flex-grow: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export { SettingsSection };
