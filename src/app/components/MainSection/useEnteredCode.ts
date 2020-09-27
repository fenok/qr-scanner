import React from 'react';

export function useEnteredCode(onCodeEntered: (code: string) => void, block: boolean) {
    const currentInputRef = React.useRef('');

    React.useEffect(() => {
        if (block) {
            currentInputRef.current = '';
        }
    }, [block]);

    React.useEffect(() => {
        function onKeyPress(event: KeyboardEvent) {
            if (!block) {
                if (!isEnter(event)) {
                    const symbol = getAlphanumericSymbol(event);

                    if (symbol) {
                        currentInputRef.current += symbol;
                    } else {
                        currentInputRef.current = '';
                        throw new Error('Encountered non-alphanumeric symbol');
                    }
                } else {
                    if (currentInputRef.current) {
                        onCodeEntered(currentInputRef.current);
                    } else {
                        throw new Error('Unexpected submit of empty string');
                    }
                    currentInputRef.current = '';
                }
            }
        }

        window.addEventListener('keypress', onKeyPress);

        return () => {
            window.removeEventListener('keypress', onKeyPress);
        };
    }, [onCodeEntered, block]);
}

function isEnter(event: KeyboardEvent) {
    return event.key.toLowerCase() === 'enter';
}

function getAlphanumericSymbol(event: KeyboardEvent): string | undefined {
    const key = event.key.toLowerCase();

    if (key.length !== 1) {
        return undefined;
    }

    const isLetter = key >= 'a' && key <= 'z';
    const isNumber = key >= '0' && key <= '9';
    if (isLetter || isNumber) {
        return event.key;
    }

    return undefined;
}
