export enum State {
    WAITING = 'waiting',
    SUCCESS = 'success',
    ERROR = 'error',
    DUPLICATE = 'duplicate',
}

export interface StateData {
    messageId: number;
    state: State;
    person?: Record<string, string>;
}
