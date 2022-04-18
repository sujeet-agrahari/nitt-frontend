import "./datatable.scss";
import { DataGrid, GridActionsCellItem, GridToolbar } from '@mui/x-data-grid';
import { Link, useNavigate } from "react-router-dom";

import { capitalizeFirstLetter } from "../../utils";
import { Add, Delete, Edit, Visibility } from "@mui/icons-material";
import { Fab, LinearProgress } from "@mui/material";

const Datatable = ({ entity, rows, columns, deleteRow }) => {

  const nvaigate = useNavigate();

  const actions = [{
    field: 'actions',
    type: 'actions',
    headerName: 'Actions',
    getActions: (params) => [
      <GridActionsCellItem icon={<Visibility />} onClick={() => nvaigate(`/${entity}/${params.row.id}`)} label="View" color="secondary" />,
      <GridActionsCellItem icon={<Edit />} onClick={() => deleteRow(params.row.id)} label="Delete" color="warning" />,
      <GridActionsCellItem icon={<Delete />} onClick={() => deleteRow(params.row.id)} label="Delete" color="error" />,

    ]
  }]
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {capitalizeFirstLetter(entity)}
        <Link to={`/${entity}/new`} style={{ textDecoration: "none" }} >
          <Fab color="success" aria-label="add">
            <Add />
          </Fab>
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={rows}
        columns={columns.concat(actions)}
        pageSize={15}
        rowsPerPageOptions={[15]}
        components={{
          Toolbar: GridToolbar,
          LoadingOverlay: LinearProgress
        }}
        density="comfortable"
        checkboxSelection
        rowHeight={70}
      />
    </div>
  )
}

export default Datatable;