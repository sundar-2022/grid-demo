import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

export default function AppFloatingTable({data,header,columns}:any) {
    const [tableData, setTableData] = useState<any[]>([]);
    const [tableColumns, setTableColumns] = useState<any[]>([]);
    const [dialogVisible, setDialogVisible] = useState<boolean>(false);

    useEffect(() => {
        setTableData(data);
        setTableColumns(columns)
        console.log("tableData",tableData)
    }, [data,columns]);

    const dialogFooterTemplate = () => {
        return <Button label="Ok"outlined icon="pi pi-check" onClick={() => setDialogVisible(false)} />;
    };

    return (
        <div className="">
            <Button label="Show Table" icon="pi pi-external-link" size='small' severity='secondary' onClick={() => setDialogVisible(true)} />
            <Dialog header={"Nobel Prizes - " + header} visible={dialogVisible} style={{ width: '75vw' }} maximizable
                    modal contentStyle={{ height: '300px' }} onHide={() => setDialogVisible(false)} footer={dialogFooterTemplate}>
               <DataTable value={tableData} tableStyle={{ minWidth: '50rem' }} >
                {
                tableColumns.map((col, i) => {
                        return <Column key={col.field} alignHeader={'left'} align={'left'} field={col.field} header={col.header} />
                }       
                )}
               </DataTable>
            </Dialog>
        </div>
    );
}