import "./datatable.scss";
import { DataGrid } from '@mui/x-data-grid';
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDocs, collection, doc, deleteDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'profileImage', sortable: false, headerName: 'Profile', width: 120, renderCell: (params) => <Avatar src={params.row.profileImage} sx={{ height: '50px', width: '50px' }}></Avatar> },
  { field: 'phone', headerName: 'Mobile No', width: 130 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
  { field: 'email', headerName: 'Email', width: 180 },

  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'status', headerName: 'Status', width: 180,
    renderCell: (params) =>
      <div className={`cellWithStatus ${params.row.status}`}>
        {params.row.status ? params.row.status.charAt(0).toUpperCase() + params.row.status.slice(1) : ''}
      </div>
  },


];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, profileImage: 'https://i.pravatar.cc', phone: "98923849284", email: "hello@gmail.com", status: 'approved' },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, profileImage: 'https://i.pravatar.cc', phone: "98923849284", email: "hello@gmail.com", status: 'pending' },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, profileImage: 'https://i.pravatar.cc', phone: "98923849284", email: "hello@gmail.com" },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, profileImage: 'https://i.pravatar.cc', phone: "98923849284", email: "hello@gmail.com" },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, profileImage: 'https://i.pravatar.cc', phone: "98923849284", email: "hello@gmail.com", status: 'rejected' },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150, profileImage: 'https://i.pravatar.cc', phone: "98923849284", email: "hello@gmail.com" },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, profileImage: 'https://i.pravatar.cc', phone: "98923849284", email: "hello@gmail.com" },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, profileImage: 'https://i.pravatar.cc', phone: "98923849284", email: "hello@gmail.com" },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, profileImage: 'https://i.pravatar.cc', phone: "98923849284", email: "hello@gmail.com" },
];

const Datatable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   //   try {
    //   //     const querySnapshot = await getDocs(collection(db, "students"));
    //   //     const list = [];
    //   //     querySnapshot.forEach((doc) => list.push({ id: doc.id, ...doc.data() }))
    //   //     setData(list)
    //   //   } catch (error) {
    //   //     console.log(error);
    //   //   }
    // }
    // fetchData();
    // LISTEN(REALTIME)
    const unsub = onSnapshot(collection(db, "students"), (snapshot) => {
      const list = [];
      snapshot.docs.forEach((doc) => list.push({ id: doc.id, ...doc.data() }))
      setData(list)
    }, (error) => {
      console.log(error)
    });
    return () => unsub();
  }, [])

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "students", id));
    setData(data.filter(item => item.id !== id))
  }
  const actionColumn = [{
    field: 'action',
    headerName: 'Action',
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to={`/students/${params.row.id}`} style={{ textDecoration: "none" }}>
            <div className="viewButton">View</div>
          </Link>
          <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>Delete</div>
        </div>
      )
    }
  }]
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Students
        <Link to="/students/new" style={{ textDecoration: "none" }} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  )
}

export default Datatable;