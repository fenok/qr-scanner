import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

export interface SettingsDb {
    idFieldName: string;
    scannedFieldName: string;
    scannedFieldValue: string;
    waitingMessageText: string;
    successMessageText: string;
    errorMessageText: string;
    duplicateMessageText: string;
    messageTimeoutSeconds: number;
    backgroundImagePath: string;
}

export const DEFAULT_SETTINGS: SettingsDb = {
    idFieldName: 'id',
    scannedFieldName: 'scanned',
    scannedFieldValue: '1',
    waitingMessageText: 'Ожидание сканирования',
    successMessageText: 'Регистрация {{name}} проведена успешно',
    errorMessageText: 'Для id {{id}} запись не найдена',
    duplicateMessageText: 'Регистрация {{name}} уже выполнена',
    messageTimeoutSeconds: 3,
    backgroundImagePath: '',
};

let SETTINGS_DB: low.LowdbSync<SettingsDb> | undefined;

export function getSettingsDb(): low.LowdbSync<SettingsDb> {
    if (SETTINGS_DB) {
        return SETTINGS_DB;
    }

    const adapter = new FileSync<SettingsDb>('settings.json');
    const db = low(adapter);

    db.defaults(DEFAULT_SETTINGS).write();

    return (SETTINGS_DB = db);
}
