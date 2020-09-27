import * as React from 'react';
import styled from 'styled-components';
import fs from 'fs';
import parseCsv from 'csv-parse/lib/sync';
import stringifyCsv from 'csv-stringify/lib/sync';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { useOpenState } from '../../../hooks/useOpenState';
import { getPersonsDb } from '../../../lib/getPersonsDb';
import { Card, Divider } from '@material-ui/core';

const DbSettings: React.FC = () => {
    const db = getPersonsDb();
    const [replacingNoteOpen, onReplacingNoteOpen, onReplacingNoteClose] = useOpenState();
    const [appendingNoteOpen, onAppendingNoteOpen, onAppendingNoteClose] = useOpenState();

    const onReplacingFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const replacingPersons = getPersonsFromFile(event.target.files[0]);
        db.set('persons', replacingPersons).write();
        onReplacingNoteOpen();
    };

    const onAppendingFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const appendingPersons = getPersonsFromFile(event.target.files[0]);
        db.get('persons')
            .push(...appendingPersons)
            .write();
        onAppendingNoteOpen();
    };

    const onExportDb = () => {
        download(stringifyCsv(db.get('persons').value(), { header: true }));
    };

    return (
        <Root>
            <Header>Настройки БД</Header>
            <HeaderDivider />
            <ButtonGroup>
                <Button variant="outlined" color={'primary'} onClick={onExportDb}>
                    Экспортировать в CSV
                </Button>
                <Button variant="outlined" color={'primary'} component={'label'}>
                    Дополнить из CSV
                    <FileInput type={'file'} accept={'.csv, text/csv'} onChange={onAppendingFileChange} value={''} />
                </Button>
                <Button variant="outlined" color={'secondary'} component={'label'}>
                    Импортировать из CSV
                    <FileInput type={'file'} accept={'.csv, text/csv'} onChange={onReplacingFileChange} value={''} />
                </Button>
            </ButtonGroup>
            <Snackbar open={replacingNoteOpen} autoHideDuration={3000} onClose={onReplacingNoteClose}>
                <SnackbarContent message={'БД импортирована'} />
            </Snackbar>
            <Snackbar open={appendingNoteOpen} autoHideDuration={3000} onClose={onAppendingNoteClose}>
                <SnackbarContent message={'БД дополнена'} />
            </Snackbar>
        </Root>
    );
};

function getPersonsFromFile(file: File): Record<string, string>[] {
    const fileContent = fs.readFileSync(file.path, { encoding: 'utf8' });
    return parseCsv(fileContent, { columns: true });
}

const Root = styled(Card)`
    margin-top: 20px;
    padding: 20px;
`;

const Header = styled.h2`
    margin: 0 0 4px;
    font-size: 20px;
`;

const HeaderDivider = styled(Divider)`
    && {
        margin-bottom: 20px;
    }
`;

const ButtonGroup = styled.div`
    display: grid;
    grid-row-gap: 8px;
`;

const FileInput = styled.input`
    display: none;
`;

function download(data: string) {
    const file = new Blob([data], { type: 'text/csv' });
    const a = document.createElement('a');
    const url = URL.createObjectURL(file);
    a.href = url;
    a.download = 'db.csv';
    document.body.appendChild(a);
    a.click();
    setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 0);
}

export { DbSettings };
