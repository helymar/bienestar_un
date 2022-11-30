import { Link } from 'react-router-dom';

import { DataGrid } from '@mui/x-data-grid';

import './DataTable.css'


function createData(id, name, email, active) {
    return {id, name, email, active};
}

const columns = [
    { field: 'id', headerName: 'Id', width: 50 },
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'active', headerName: 'Activo', type: 'boolean', width: 100 },
];
let rows = [];


export default function DataTable(props) {
    rows = props.data.map((elem) => createData(elem.id, elem.first_name, elem.email, elem.is_active));
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
