import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';

const NewTable = ({ rowTitles, rowData }) => (
  <Box p={5}>
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: '2px 4px 10px 1px rgba(201, 201, 201, 0.47)',
        borderRadius: '10px',
        paddingLeft: '10px',
        paddingRight: '10px',
      }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {rowTitles.map((title) => (
              <TableCell
                align="right"
                key={title}
                sx={{
                  fontWeight: '600',
                }}
              >
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData.map((row) => (
            <TableRow key={row.name}>
              {Object.entries(row).map(([key, value]) => (
                <TableCell align="right" key={key}>
                  {value}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

export default NewTable;
