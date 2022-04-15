import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar } from '@mui/material';
import { display } from '@mui/system';

function createData(photo, phone, firstName, lastName, admissionDate, course, feePaid, feeDue) {
  return {
    photo, phone, firstName, lastName, admissionDate, course, feePaid, feeDue
  };
}

const rows = [
  createData('https://i.pravatar.cc', '9234823499', 'Aryan', 'Agrahari', '01-04-2022 9:45pm', 'CCC', 2500, 500),
  createData('https://i.pravatar.cc', '9234823499', 'Aryan', 'Agrahari', '01-04-2022 9:45pm', 'CCC', 2500, 500),
  createData('https://i.pravatar.cc', '9234823499', 'Aryan', 'Agrahari', '01-04-2022 9:45pm', 'CCC', 2500, 500),
  createData('https://i.pravatar.cc', '9234823499', 'Aryan', 'Agrahari', '01-04-2022 9:45pm', 'CCC', 2500, 500),
  createData('https://i.pravatar.cc', '9234823499', 'Aryan', 'Agrahari', '01-04-2022 9:45pm', 'CCC', 2500, 500),
  createData('https://i.pravatar.cc', '9234823499', 'Aryan', 'Agrahari', '01-04-2022 9:45pm', 'CCC', 2500, 500),
  createData('https://i.pravatar.cc', '9234823499', 'Aryan', 'Agrahari', '01-04-2022 9:45pm', 'CCC', 2500, 500),
  createData('https://i.pravatar.cc', '9234823499', 'Aryan', 'Agrahari', '01-04-2022 9:45pm', 'CCC', 2500, 500),
  createData('https://i.pravatar.cc', '9234823499', 'Aryan', 'Agrahari', '01-04-2022 9:45pm', 'CCC', 2500, 500),
  createData('https://i.pravatar.cc', '9234823499', 'Aryan', 'Agrahari', '01-04-2022 9:45pm', 'CCC', 2500, 500),

];

export default function BasicTable() {
  return (
    <div className="table">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650, padding: '10px' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Sr</TableCell>
              <TableCell align="right">Photo</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">First Name</TableCell>
              <TableCell align="right">Last Name</TableCell>
              <TableCell align="right">Admission Date</TableCell>
              <TableCell align="right">Course</TableCell>
              <TableCell align="right">Fee Paid</TableCell>
              <TableCell align="right">Fee Due</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ fontWeight: '200' }}>
            {rows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="right" component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="right"><Avatar src={row.photo} sx={{ height: '80px', width: '80px', display: 'inline-block' }} /></TableCell>
                <TableCell align="right" sx={{ fontWeight: 200 }}>{row.phone}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 200 }}>{row.firstName}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 200 }}>{row.lastName}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 200 }}>{row.admissionDate}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 200 }}>{row.course}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 200, color: 'green' }}>{row.feePaid}</TableCell>
                <TableCell align="right" sx={{ fontWeight: 200, color: 'crimson' }}>{row.feeDue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}