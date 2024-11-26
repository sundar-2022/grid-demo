import React, { useState, useEffect } from 'react';
import { DataTable, DataTableFilterMeta, DataTableOperatorFilterMetaData } from 'primereact/datatable';
import { Column, ColumnBodyOptions } from 'primereact/column';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Button } from 'primereact/button';
import { FilterMatchMode } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import AppFloatingTable from '../floating-table/AppFloatingTable';

export default function AppTable({data}:any) {
    const [laureates, setLaureates] = useState([]);
    const [globalFilter, setGlobalFilter] = useState<string[]>([]);
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        id: { value: null, matchMode: FilterMatchMode.CONTAINS },
        fullName: { value: null, matchMode: FilterMatchMode.CONTAINS },
        familyName: { value: null, matchMode: FilterMatchMode.CONTAINS },
        gender: { value: null, matchMode: FilterMatchMode.CONTAINS },
        birthdate: { value: null, matchMode: FilterMatchMode.CONTAINS },
        birthplacecountry: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const dialogColumns = [
        {field: 'category', header: 'Category'},
        {field: 'categoryFullName', header: 'Category Fullname'},
        {field: 'awardYear', header: 'Award Year'},
        {field: 'dateAwarded', header: 'Date Awarded'},
        {field: 'prizeAmount', header: 'Reward Prize'}
    ];

    const columns = [
        {field: 'id', header: 'Id'},
        {field: 'fullName', header: 'Name'},
        {field: 'familyName', header: 'Family Name'},
        {field: 'gender', header: 'Gender'},
        {field: 'birthdate', header: 'D.O.B'},
        {field: 'birthplacecountry', header: 'Country'},
        {field: 'nobelPrizes', header: 'Nobel Prize View', type: 'dialog' },
        {field: 'wikipediaenglish', header: 'Wiki', type: 'linkbutton', linkField: []},
    ];

    useEffect(() => {
        const globalFilterCols: string[] = columns.filter((col) => col.field !== 'global').map((col)=> col.field);
        setLaureates(data);
        setGlobalFilter(globalFilterCols);
        initFilters();
    }, [data]);

    const onGlobalFilterChange = (e:any) => {
        const value = e?.target?.value || '';
        let _filters: any = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        console.log("Filters ",filters)
        setGlobalFilterValue(value);
    };

    const clearFilter = () => {
        initFilters();
    };

    const initFilters = () => {
        setFilters(
            {
                global: { value: null, matchMode: FilterMatchMode.CONTAINS },
                id: { value: null, matchMode: FilterMatchMode.CONTAINS },
                fullName: { value: null, matchMode: FilterMatchMode.CONTAINS },
                familyName: { value: null, matchMode: FilterMatchMode.CONTAINS },
                gender: { value: null, matchMode: FilterMatchMode.CONTAINS },
                birthdate: { value: null, matchMode: FilterMatchMode.CONTAINS },
                birthplacecountry: { value: null, matchMode: FilterMatchMode.CONTAINS },
            }
        )
        setGlobalFilterValue('')
    }


    const renderHeader = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder=" Search" />
                </IconField>
        </div>
        );
    };

    const header = renderHeader();

    const dialogBodyTemplate = (rowData: any,  options: ColumnBodyOptions) => {
        return <AppFloatingTable data={rowData[options['field']]} header={rowData['fullName']} columns={dialogColumns} />
    };

    const linkBodyTemplate = (rowData: any, options: ColumnBodyOptions) => {
        return <Button icon="pi pi-link" severity="info" aria-label="User" onClick={() =>  window.open(rowData[options['field']], '_blank')}/>
    }


    return (
            <>
               <DataTable paginator  rows={6}  filterDisplay="menu" globalFilterFields={globalFilter} globalFilter={globalFilterValue} value={laureates} tableStyle={{ minWidth: '50rem' }} header={header} >
                {columns.map((col, i) => {

                    if(col?.type === 'dialog')
                        return <Column key={col.field} alignHeader={'left'} align={'left'} body={dialogBodyTemplate} field={col.field} header={col.header} />
                    else if(col?.type === 'linkbutton')
                        return <Column key={col.field} alignHeader={'left'} align={'left'} body={linkBodyTemplate} field={col.field} header={col.header} />
                    else
                        return <Column key={col.field} sortable filter alignHeader={'left'} align={'left'} field={col.field} header={col.header} />

                }       
                )}
               </DataTable>
            </>
    );
}