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
    const [open, onOpen, onClose] = useOpenState();

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files[0];
        const fileContent = fs.readFileSync(file.path, { encoding: 'utf8' });
        const persons = parseCsv(fileContent, { columns: true });
        db.set('persons', persons).write();
        onOpen();
    };

    const onExportDb = () => {
        download(stringifyCsv(db.get('persons').value(), { header: true }));
    };

    return (
        <Root>
            <Header>Настройки БД</Header>
            <HeaderDivider />
            <FileInput type={'file'} onChange={onFileChange} value={''} />
            <Button onClick={onExportDb}>Экспортировать БД</Button>
            <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
                <SnackbarContent message={'БД обновлена'} />
            </Snackbar>
        </Root>
    );
};

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

const FileInput = styled.input``;

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
