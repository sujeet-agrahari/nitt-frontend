import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./addNewStudent.scss";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Avatar,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/system";

import { pick } from "lodash";

const Input = styled("input")({
  display: "none",
});

const AddNewStudent = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [data, setData] = useState({});
  const [percentage, setPercentage] = useState(0);
  const [courses, setCourses] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState("");

  const handleCourseSelect = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value.id }));
    setSelectedCourse({ ...e.target.value, fees: +e.target.value.fees });
  }

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "courses"), (snapshot) => {
      const list = [];
      snapshot.docs.forEach((doc) => list.push({ id: doc.id, ...doc.data() }))
      setCourses(list)
    }, (error) => {
      console.log(error)
    });
    return () => unsub();
  }, []);

  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name + new Date());
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setPercentage(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, photo: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const student = await addDoc(
        collection(db, "students"),
        {
          createdAt: new Date(),
          updatedAt: new Date(),
          ...pick(data, [
            "email",
            "photo",
            "phone",
            "address",
            "lastName",
            "firstName",
            "fatherName",
            "middleName",
            "motherName",
            "dateOfBirth",
          ])
        }
      );
      const enrollment = await addDoc(collection(db, "enrollments"), {
        studentId: student.id,
        ...pick(data, ["courseId"]),
        createdAt: new Date(),
        updatedAt: new Date(),
        totalFees: selectedCourse.fees - (selectedCourse.fees * (+data.discount) / 100)
      });
      await addDoc(collection(db, "fees"), {
        createdAt: new Date(),
        updatedAt: new Date(),
        ...pick(data, ['paidFees']),
        enrollmentId: enrollment.id,
      })
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };


  return (
    <div className="new">
      <Sidebar></Sidebar>
      <div className="newContainer">
        <Navbar></Navbar>
        <div className="top">
          <Typography variant="h5" component="div" color="gray">
            Add New Student
          </Typography>
        </div>
        <Box
          component="form"
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleAdd}
        >
          <div className="photo">
            <Avatar
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="photo preview"
              sx={{ width: "200px", height: "200px" }}
            />
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label>
          </div>
          <div className="formInput">
            <Grid container spacing={4}>
              <Grid item xs={4}>
                <TextField
                  name="firstName"
                  label="First Name"
                  variant="standard"
                  onChange={handleInput}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="middleName"
                  label="Middle Name"
                  variant="standard"
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="lastName"
                  label="Last Name"
                  variant="standard"
                  onChange={handleInput}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="fatherName"
                  label="Father Name"
                  variant="standard"
                  onChange={handleInput}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="motherName"
                  label="Mother Name"
                  variant="standard"
                  onChange={handleInput}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="phone"
                  label="Phone"
                  variant="standard"
                  onChange={handleInput}
                  InputLabelProps={{ required: true }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  variant="standard"
                  onChange={handleInput}
                />
              </Grid>
              <Grid item sm={4}>
                <TextField
                  name="dateOfBirth"
                  label="Date Of Birth"
                  type="date"
                  variant="standard"
                  onChange={handleInput}
                  InputLabelProps={{ shrink: true, required: true }}
                />
              </Grid>
              <Grid item sm={4}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="select-course">Course</InputLabel>
                  <Select
                    labelId="select-course"
                    name="courseId"
                    onChange={handleCourseSelect}
                    label="Course"
                    value={selectedCourse}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {
                      courses.map((course) => <MenuItem key={course.id}
                        value={course}>{course.course}</MenuItem>)
                    }
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="totalFees"
                  label="Total Fees ₹"
                  type="number"
                  variant="standard"
                  readOnly
                  disabled
                  value={selectedCourse?.fees || ""}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="discount"
                  label="Discount %"
                  type="number"
                  variant="standard"
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="paidFees"
                  label="Paid Fees ₹"
                  type="number"
                  variant="standard"
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  variant="standard"
                  onChange={handleInput}
                />
              </Grid>
              <Grid item sm={6}>
                <TextField
                  name="address"
                  label="Address"
                  variant="standard"
                  onChange={handleInput}
                  InputLabelProps={{ required: true }}
                  fullWidth
                />
              </Grid>
              <Grid item sm={12} textAlign="center">
                <Button variant="contained" type="submit" disabled={percentage < 100}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default AddNewStudent;
