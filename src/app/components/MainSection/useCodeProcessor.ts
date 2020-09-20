import { State } from './types';
import { getPersonsDb } from '../../lib/getPersonsDb';
import { useSettings } from '../../hooks/useSettings';
import { StateData } from './MainSection';

export function useCodeProcessor(setCurrentState: (state: StateData) => void) {
    const personsDb = getPersonsDb();
    const settings = useSettings();

    const process = (code: string) => {
        const person = personsDb
            .get('persons')
            .find({ [settings.idFieldName]: code })
            .value();

        if (person) {
            if (person[settings.scannedFieldName] === '1') {
                setCurrentState({ state: State.DUPLICATE, person });
            } else {
                personsDb
                    .get('persons')
                    .find({ [settings.idFieldName]: code })
                    .assign({ [settings.scannedFieldName]: '1' })
                    .write();
                setCurrentState({ state: State.SUCCESS, person });
            }
        } else {
            setCurrentState({ state: State.ERROR, person: { [settings.idFieldName]: code } });
        }
    };

    return { process };
}
