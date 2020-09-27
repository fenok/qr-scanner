import React from 'react';
import styled, { keyframes, css } from 'styled-components';
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

    const imageLink = getImageLink(currentState, settings);

    return (
        <Root backgroundImageUrl={getFileLink(settings.backgroundImagePath)}>
            <MessageCard state={currentState.state}>
                <MessageContent>
                    <MessageText>{getMessage(currentState, settings)}</MessageText>
                    {imageLink ? <MessageImage src={imageLink} /> : null}
                </MessageContent>
            </MessageCard>
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

function getImageLink(state: StateData, settings: SettingsDb) {
    switch (state.state) {
        case State.WAITING:
            return undefined;
        case State.SUCCESS:
            return getFileLink(settings.successImagePath);
        case State.ERROR:
            return getFileLink(settings.errorImagePath);
        case State.DUPLICATE:
            return getFileLink(settings.duplicateImagePath);
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
    background: ${({ backgroundImageUrl }) => backgroundImageUrl && `url("${backgroundImageUrl}")`};
    background-size: cover;
    background-position: center;
`;

const nodeAnimation = keyframes`
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(10px);
    }

    100% {
        transform: translateY(0);
    }
`;

const intensiveShakeAnimation = keyframes`
    10%, 90% {
        transform: translate3d(-1px, 0, 0);
    }
  
    20%, 80% {
        transform: translate3d(2px, 0, 0);
    }

    30%, 50%, 70% {
        transform: translate3d(-4px, 0, 0);
    }

    40%, 60% {
        transform: translate3d(4px, 0, 0);
    }
`;

const shakeAnimation = keyframes`
    0% {
        transform: translateX(0);
    }

    50% {
        transform: translateX(10px);
    }

    100% {
        transform: translateY(0);
    }
`;

const successCardCss = css`
    && {
        animation: ${nodeAnimation} 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        background-color: #afd5aa;
    }
`;

const errorCardCss = css`
    && {
        animation: ${intensiveShakeAnimation} 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        background-color: #f4998d;
    }
`;

const duplicateCss = css`
    && {
        animation: ${shakeAnimation} 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        background-color: #ffdda1;
    }
`;

function getMessageCardCss(state: State) {
    switch (state) {
        case State.ERROR:
            return errorCardCss;
        case State.SUCCESS:
            return successCardCss;
        case State.DUPLICATE:
            return duplicateCss;
        default:
            return '';
    }
}

const MessageCard = styled(Card)<{ state: State }>`
    && {
        max-width: 500px;
    }
    ${({ state }) => getMessageCardCss(state)};
`;

const MessageContent = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MessageText = styled.p`
    white-space: pre-line;
    margin: 0;
    font-weight: bold;
    text-align: center;
    font-size: 24px;
    line-height: 30px;
`;

const MessageImage = styled.img`
    margin-top: 20px;
    width: 60px;
    height: 60px;
`;

export { MainSection };
