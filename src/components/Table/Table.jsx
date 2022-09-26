import React from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, group, activities, role, career) {
    return { name, group, activities, role, career };
}

const rows = [
    createData('Jhon Doe', 159, 6, 'Promotor', 'Ingenierías'),
    createData('Jane Das', 237, 9, 'Promotor', 'Psicología'),
    createData('Jenner Mac', 262, 16, 'Promotor', 'Comunicación'),
    createData('Taya Smith', 305, 3, 'Promotor', 'Música'),
    createData('Brooke Ligert', 356, 16, 'Promotor', 'Música'),
];

const MyTable = () => {
    return (
        <article className="Card">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Group</TableCell>
                            <TableCell align="right">Activities</TableCell>
                            <TableCell align="right">Role</TableCell>
                            <TableCell align="right">Career</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.group}</TableCell>
                                <TableCell align="right">{row.activities}</TableCell>
                                <TableCell align="right">{row.role}</TableCell>
                                <TableCell align="right">{row.career}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </article>
    )
}

export default MyTable