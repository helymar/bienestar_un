import { DataGrid } from '@mui/x-data-grid';

import './DataTable.css'


function createData(id, start_date, end_date, was_supervised, wake_up_calls, people_called, zone, supervisor) {
    return { id, start_date, end_date, was_supervised, wake_up_calls, people_called, zone, supervisor };
}

const columns = [
    { field: 'id', headerName: 'Id', width: 30 },
    { field: 'start_date', headerName: 'Fecha inicio', width: 200 },
    { field: 'end_date', headerName: 'fecha fin',  width: 200 },
    { field: 'was_supervised', headerName: 'Supervisado', width: 100 },
    { field: 'wake_up_calls', headerName: 'Llamados de atencion', width: 150 },
    { field: 'people_called', headerName: 'Numero de personas', width: 150 },
    { field: 'zone', headerName: 'Zona', width: 150 },
    { field: 'supervisor', headerName: 'Supervisor', width: 30 },
];
let rows = [];


export default function DataTable(props) {
    rows = props.data.map((elem) => createData(elem.id, elem.start_date, elem.end_date, elem.was_supervised, elem.wake_up_calls, elem.people_called, elem.zone, elem.supervisor));
    return (
        <article className='Card' >
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                paginationMode="server"
                rowCount={props.total}
                onPageChange={(newPage) => props.loadPage(newPage + 1)}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </article>
    );
}
