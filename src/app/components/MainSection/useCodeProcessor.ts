import { State } from './types';

export function useCodeProcessor(setCurrentState: (state: State) => void) {
    const process = (code: string) => {
        console.log('Scanned code:', code);

        const rand = Math.random();

        if (rand > 0.6) {
            setCurrentState(State.SUCCESS);
        } else if (rand > 0.3) {
            setCurrentState(State.ERROR);
        } else {
            setCurrentState(State.DUPLICATE);
        }
    };

    return { process };
}
