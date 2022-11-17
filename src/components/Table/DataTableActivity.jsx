import { Link } from 'react-router-dom';

import { DataGrid } from '@mui/x-data-grid';

import './DataTable.css'


function createData(id, title, description, group_id, date_start, date_end, category, status) {
    return { id, title, description, group_id, date_start, date_end, category, status };
}

const columns = [
    {
        field: 'id', headerName: 'Id', width: 150, renderCell: (activity) => (
            <Link to={`./${activity.value}/`}>{activity.value}</Link>
        )
    },
    { field: 'name', headerName: 'Nombre', width: 150 },
    { field: 'description', headerName: 'Descripción' },
    { field: 'group_id', headerName: 'group', width: 100 },
    { field: 'date_start', headerName: 'date start', width: 150 },
    { field: 'date_end', headerName: 'date end', width: 150 },
    { field: 'category', headerName: 'category', width: 100 },
    { field: 'status', headerName: 'status', width: 30 },
];
let rows = [];


export default function DataTable(props) {
    rows = props.data.map((elem) => createData(elem.id, elem.name, elem.description, elem.group, elem.start_time, elem.date_end, elem.category, elem.status));
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
