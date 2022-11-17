import { DataGrid } from '@mui/x-data-grid';

import './DataTable.css'

function createData(id, title, description, group_id, date_start, date_end, category, status) {
    return { id, title, description, group_id, date_start, date_end, category, status };
}

const columns = [
    { field: 'id', headerName: 'id', width: 150 },
    { field: 'title', headerName: 'title', width: 150 },
    { field: 'description', headerName: 'description' },
    { field: 'group_id', headerName: 'group', width: 100 },
    { field: 'date_start', headerName: 'date start', width: 150 },
    { field: 'date_end', headerName: 'date end', width: 150 },
    { field: 'category', headerName: 'category', width: 100 },
    { field: 'status', headerName: 'status', width: 30 },
];
let rows = [
    createData(1, 'Jon Snow', 35, 10, 'Promotor', 'Ing. Civil'),
    createData(2, 'Cersei Lannister', 42, 10, 'Estudiante', 'Admon'),
    createData(3, 'Jaime Lannister', 45, 10, 'Promotor', 'Derecho'),
    createData(4, 'Arya Stark', 16, 10, 'Estudiante', 'Derecho'),
    createData(5, 'Daenerys Targaryen', null, 10, 'Estudiante', 'Derecho'),
    createData(6, 'Marie Melisandre', 150, 10, 'Promotor', 'Medicina'),
    createData(7, 'Ferrara Clifford', 44, 10, 'Promotor', 'Derecho'),
    createData(8, 'Rossini Frances', 36, 10, 'Estudiante', 'Psicología'),
    createData(9, 'Harvey Roxie', 65, 10, 'Promotor', 'Derecho'),
    createData(10, 'Taya Kno', 65, 10, 'Estudiante', 'Música'),
    createData(11, 'Brooke Liger', 65, 10, 'Promotor', 'Música'),
];


export default function DataTable(props) {
    if (props.data)
        rows = props.data.map((elem) => createData(elem.id, elem.name, elem.description, elem.group_id, elem.date_start, elem.date_end, elem.category, elem.status));
    return (
        <article className='Card' >
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </article>
    );
}
