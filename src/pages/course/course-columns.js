const columns = [
  { field: 'id', headerName: 'ID', flex: 3 },
  { field: 'name', headerName: 'Course', flex: 1 },
  {
    field: 'fees',
    type: 'number',
    headerName: 'Fees',
    flex: 1,
    align: 'left',
    headerAlign: 'left',
    renderCell: (params) => `₹${params.row.price}`,
  },
  {
    field: 'discount',
    type: 'number',
    headerName: 'Discount',
    align: 'left',
    headerAlign: 'left',
    flex: 1,
    renderCell: (params) => `${params.row.discount}%`,
  },
  {
    field: 'duration',
    type: 'number',
    headerName: 'Duration',
    flex: 1,
    align: 'left',
    headerAlign: 'left',
    renderCell: (params) => `${params.row.duration} Days`,
  },
  { field: 'description', headerName: 'Description', minWidth: 300, flex: 2 },
];

export default columns;
