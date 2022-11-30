import { DataGrid } from '@mui/x-data-grid';

import './DataTable.css'

function createData(id, name, username, activities, role) {
    return { id, name, username, activities, role };
}

const columns = [
    { field: 'id', headerName: 'Código', width: 100 },
    { field: 'name', headerName: 'Nombre', width: 130 },
    { field: 'username', headerName: 'Username', type: 'number', width: 90 },
    { field: 'activities', headerName: 'Actividades', type: 'number', width: 90 },
    { field: 'role', headerName: 'Rol', description: 'This column has a value getter and is not sortable.', width: 160 },
];

let rows = [];

export default function DataTable(props) {
    if (props.data)
        rows = props.data.map((user) => createData(user.id, user.first_name, user.email, user.id, user.role));
    return (
        <article className='Card' >
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
                checkboxSelection
                paginationMode="server"
                rowCount={props.total}
                onPageChange={(newPage) => props.loadPage(newPage + 1)}
            />
        </article>
    );
}
