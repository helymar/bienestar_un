import { Link } from 'react-router-dom';

import { DataGrid } from '@mui/x-data-grid';

import './DataTable.css'


function createData(id, name, description, group_id, start_date, end_date, category, status) {
    return { id, name, description, group_id, start_date, end_date, category, status };
}

const columns = [
    {
        field: 'id', headerName: 'Id', width: 60, renderCell: (activity) => (
            <Link to={`./${activity.value}/`} className="gradient-link">{activity.value}</Link>
        )
    },
    { field: 'name', headerName: 'Nombre', width: 200 },
    { field: 'description', headerName: 'Descripción' },
    { field: 'group_id', headerName: 'Grupo', width: 100 },
    { field: 'start_date', headerName: 'Fecha de inicio', width: 150 },
    { field: 'end_date', headerName: 'Fecha de finalización', width: 150 },
    { field: 'category', headerName: 'Categoría', width: 100 },
    { field: 'status', headerName: 'Estado', width: 100 },
];
let rows = [];


export default function DataTable(props) {
    rows = props.data.map((elem) => createData(elem.id, elem.name, elem.description, elem.group, elem.start_date, elem.end_date, elem.category, elem.status));
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
