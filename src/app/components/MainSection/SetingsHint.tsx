import SnackbarContent from '@material-ui/core/SnackbarContent';
import Snackbar from '@material-ui/core/Snackbar';
import React from 'react';
import { useOpenState } from '../../hooks/useOpenState';

const SettingsHint = () => {
    const [isSettingsHintOpen, onSettingsHintOpen, onSettingsHintClose] = useOpenState();

    React.useEffect(() => {
        onSettingsHintOpen();

        return () => {
            onSettingsHintClose();
        };
    }, [onSettingsHintClose, onSettingsHintOpen]);

    return (
        <Snackbar open={isSettingsHintOpen} autoHideDuration={3000} onClose={onSettingsHintClose}>
            <SnackbarContent message={'Нажмите ESC, чтобы перейти к настройкам'} />
        </Snackbar>
    );
};

export { SettingsHint };
