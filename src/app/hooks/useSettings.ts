import { getSettingsDb } from '../lib/getSettingsDb';
import React from 'react';

export function useSettings() {
    const settingsDb = getSettingsDb();

    const [settings] = React.useState(() => settingsDb.read().value());

    return settings;
}
