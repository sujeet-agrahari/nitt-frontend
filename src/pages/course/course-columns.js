const columns = [
  { field: 'id', headerName: 'ID', width: 200 },
  { field: 'course', headerName: 'Course', width: 100 },
  {
    field: 'fees', type: 'number', headerName: 'Fees', width: 100,
    renderCell: (params) => `₹${params.row.fees}`
  },
  { field: 'duration', type: 'number', headerName: 'Duration (Days)', width: 130 },
  { field: 'fullForm', headerName: 'Full Form', width: 300 },
];

export default columns;