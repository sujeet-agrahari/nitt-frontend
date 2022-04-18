import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./add-new-course.scss";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";

import { useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

const New = ({ inputs, title }) => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      // Add a new document in collection "students"
      await addDoc(collection(db, "courses"), {
        ...data,
        timeStamp: serverTimestamp()
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  }

  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setData({ ...data, [id]: value });
  };

  return <div className="new">
    <Sidebar></Sidebar>
    <div className="newContainer">
      <Navbar></Navbar>
      <div className="top">
        <Typography variant="h5" component="div" color="gray">Add New Course</Typography>
      </div>
      <Box
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column"
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleAdd}
      >
        <div className="formInput">
          <Grid container spacing={4} >
            <Grid item xs={4}>
              <TextField id="course" label="Course" variant="standard" required onChange={handleInput} />
            </Grid>
            <Grid item xs={8}>
              <TextField id="fullForm" label="Full Form" variant="standard" sx={{
                width: "70%"
              }} onChange={handleInput} />
            </Grid>
            <Grid item xs={4}>
              <TextField id="duration" label="Duration(days)" variant="standard" type="number" required onChange={handleInput} />
            </Grid>

            <Grid item xs={4}>
              <TextField id="fees" label="Fees ₹" type="number" variant="standard" onChange={handleInput} />
            </Grid>
            <Grid item sm={12} textAlign="center">
              <Button variant="contained" type="submit">Submit</Button>
            </Grid>
          </Grid>
        </div>
      </Box>
    </div>
  </div>;
};

export default New;
