import './datatable.scss';
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

import { Delete, Edit, Visibility } from '@mui/icons-material';
import { Box, Fab, LinearProgress } from '@mui/material';

const Datatable = ({ entity, rows, columns, deleteRow }) => {
  const nvaigate = useNavigate();

  const actions = [
    {
      field: 'actions',
      type: 'actions',
      flex: 2,
      headerName: 'Actions',
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Visibility />}
          onClick={() => nvaigate(`/${entity}/${params.row.id}`)}
          label="View"
          color="secondary"
          key={params.row.id}
        />,
        <GridActionsCellItem
          icon={<Edit />}
          onClick={() => deleteRow(params.row.id)}
          label="Delete"
          color="warning"
          key={params.row.name}
        />,
        <GridActionsCellItem
          icon={<Delete />}
          onClick={() => deleteRow(params.row.id)}
          label="Delete"
          color="error"
          key={params.row.description}
        />,
      ],
    },
  ];
  return (
    <Box
      sx={{
        boxShadow: '2px 4px 10px 1px rgba(201, 201, 201, 0.47)',
        borderRadius: '10px',
        padding: '20px',
      }}
    >
      <DataGrid
        sx={{
          padding: 2,
        }}
        className="datagrid"
        rows={rows}
        columns={columns.concat(actions)}
        pageSize={15}
        rowsPerPageOptions={[15]}
        autoHeight
        components={{
          Toolbar: GridToolbar,
          LoadingOverlay: LinearProgress,
        }}
        density="comfortable"
        checkboxSelection
        rowHeight={70}
      />
    </Box>
  );
};

export default Datatable;
