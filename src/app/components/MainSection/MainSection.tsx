import React from 'react';
import { SetCurrentSectionContext } from '../App/CurrentSectionProvider';
import styled from 'styled-components';
import { useEnteredCode } from './useEnteredCode';
import { useCodeProcessor } from './useCodeProcessor';
import { State } from './types';

const MainSection: React.FC = () => {
    const setCurrentSection = React.useContext(SetCurrentSectionContext);
    const [currentState, setCurrentState] = React.useState<State>(State.WAITING);

    const { process } = useCodeProcessor(setCurrentState);

    useEnteredCode(process, currentState !== State.WAITING);

    React.useEffect(() => {
        let timerId: number;

        if (currentState !== State.WAITING) {
            timerId = window.setTimeout(() => {
                setCurrentState(State.WAITING);
            }, 3000);
        }

        return () => {
            window.clearTimeout(timerId);
        };
    }, [currentState]);

    return (
        <Root>
            <div>{getMessage(currentState)}</div>
            {/*<button onClick={() => setCurrentSection(Section.SETTINGS)}>TO SETTINGS</button>*/}
        </Root>
    );
};

function getMessage(state: State): string {
    switch (state) {
        case State.WAITING:
            return 'Просканируйте код';
        case State.SUCCESS:
            return 'Успех';
        case State.ERROR:
            return 'Ошибка';
        case State.DUPLICATE:
            return 'Уже просканирован';
    }
}

const Root = styled.div`
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

export { MainSection };
