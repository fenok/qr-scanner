import { State, StateData } from './types';
import { getPersonsDb } from '../../lib/getPersonsDb';
import { useSettings } from '../../hooks/useSettings';
import React from 'react';

export function useCodeProcessor(setCurrentState: (state: StateData) => void) {
    const personsDb = getPersonsDb();
    const settings = useSettings();

    const messageIdRef = React.useRef(0);

    const process = (code: string) => {
        const person = personsDb
            .get('persons')
            .find({ [settings.idFieldName]: code })
            .value();

        if (person) {
            if (person[settings.scannedFieldName] === settings.scannedFieldValue) {
                setCurrentState({ messageId: messageIdRef.current++, state: State.DUPLICATE, person });
            } else {
                personsDb
                    .get('persons')
                    .find({ [settings.idFieldName]: code })
                    .assign({ [settings.scannedFieldName]: settings.scannedFieldValue })
                    .write();
                setCurrentState({ messageId: messageIdRef.current++, state: State.SUCCESS, person });
            }
        } else {
            setCurrentState({
                messageId: messageIdRef.current++,
                state: State.ERROR,
                person: { [settings.idFieldName]: code },
            });
        }
    };

    return { process };
}
