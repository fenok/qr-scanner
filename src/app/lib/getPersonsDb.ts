import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

export interface PersonsDb {
    persons: Record<string, string>[];
}

let PERSONS_DB: low.LowdbSync<PersonsDb> | undefined;

export function getPersonsDb(): low.LowdbSync<PersonsDb> {
    if (PERSONS_DB) {
        return PERSONS_DB;
    }

    const adapter = new FileSync<PersonsDb>('db.json');
    const db = low(adapter);

    db.defaults({
        persons: [],
    }).write();

    return (PERSONS_DB = db);
}
