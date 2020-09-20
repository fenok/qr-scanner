import * as React from 'react';

export const useOpenState = (): [boolean, () => void, () => void] => {
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const onModalOpen = React.useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const onModalClose = React.useCallback(() => {
        setIsModalOpen(false);
    }, []);

    return [isModalOpen, onModalOpen, onModalClose];
};
