import React from 'react';
import styled from 'styled-components';
import { useEnteredCode } from './useEnteredCode';
import { useCodeProcessor } from './useCodeProcessor';
import { State, StateData } from './types';
import { useSettingsOnEsc } from './useSettingsOnEsc';
import { useSettings } from '../../hooks/useSettings';
import { SettingsDb } from '../../lib/getSettingsDb';
import { getFileLink } from '../../lib/getFileLink';
import { Card } from '@material-ui/core';

const MainSection: React.FC = () => {
    const [currentState, setCurrentState] = React.useState<StateData>({ state: State.WAITING });

    const settings = useSettings();

    const { process } = useCodeProcessor(setCurrentState);
    useEnteredCode(process, currentState.state !== State.WAITING);

    useAutoStateReset(currentState, setCurrentState, settings.messageTimeoutSeconds * 1000);

    useSettingsOnEsc();

    return (
        <Root backgroundImageUrl={getFileLink(settings.backgroundImagePath)}>
            <Card>
                <Message>{getMessage(currentState, settings)}</Message>
            </Card>
        </Root>
    );
};

function useAutoStateReset(
    currentState: StateData,
    setCurrentState: React.Dispatch<React.SetStateAction<StateData>>,
    timeout: number,
) {
    React.useEffect(() => {
        let timerId: number;

        if (currentState.state !== State.WAITING) {
            timerId = window.setTimeout(() => {
                setCurrentState({ state: State.WAITING });
            }, timeout);
        }

        return () => {
            window.clearTimeout(timerId);
        };
    }, [currentState, setCurrentState, timeout]);
}

function getMessage(state: StateData, settings: SettingsDb): string {
    switch (state.state) {
        case State.WAITING:
            return insertValues(settings.waitingMessageText, state.person);
        case State.SUCCESS:
            return insertValues(settings.successMessageText, state.person);
        case State.ERROR:
            return insertValues(settings.errorMessageText, state.person);
        case State.DUPLICATE:
            return insertValues(settings.duplicateMessageText, state.person);
    }
}

function insertValues(message: string, values: Record<string, string> = {}) {
    let result = message;

    for (const valueKey in values) {
        result = result.replace(new RegExp(`{{${valueKey}}}`, 'g'), values[valueKey]);
    }

    return result;
}

const Root = styled.div<{ backgroundImageUrl?: string }>`
    padding: 20px;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: ${({ backgroundImageUrl }) => backgroundImageUrl && `url(${backgroundImageUrl})`};
    background-size: cover;
    background-position: center;
`;

const Message = styled.p`
    margin: 0;
    padding: 20px;
    font-weight: bold;
    text-align: center;
`;

export { MainSection };
