import { Avatar } from "@mui/material";

const columns = [
  { field: 'id', headerName: 'ID', width: 200 },
  {
    field: 'photo', headerName: 'Photo',
    renderCell: (params) => <Avatar src={params.row.photo} sx={{ height: "80px", width: "80px" }} />
  },
  {
    field: 'fullName', headerName: 'Full Name', width: 200,
    renderCell: (params) => `${params.row.firstName} ${params.row.middleName || ""} ${params.row.lastName}`
  },
  {
    field: 'phone', type: 'string', headerName: 'Phone', width: 120,
  },
  {
    field: 'email', type: 'string', headerName: 'Email', width: 200,
  },
  {
    field: 'dateOfBirth', type: 'date', headerName: 'Date Of Birth', width: 200
  },
];

export default columns;