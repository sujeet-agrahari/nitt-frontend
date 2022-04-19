import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./addNewStudent.scss";
import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db, uploadFile } from "../../firebase";
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
  Stack,
} from "@mui/material";
import { Box } from "@mui/system";
import { styled } from "@mui/system";

import { pick } from "lodash";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const Input = styled("input")({
  display: "none",
});
const schema = yup
  .object({
    firstName: yup.string().required("Field is required!"),
    middleName: yup.string().required("Field is required!"),
    lastName: yup.string().required("Field is required!"),
    fatherName: yup.string().required("Field is required!"),
    motherName: yup.string().required("Field is required!"),
    paidFees: yup.number().positive().integer().required("Field is required!"),
    phone: yup.string().matches(/^[6-9]{1}[0-9]{9}$/, "Invalid phone number!").required("Field is required!"),
    dateOfBirth: yup.date().required("Field is required"),
    address: yup.string().required("Field is required"),
    discount: yup.number().integer().min(0),
    photo: yup.mixed().test("photo", "Photo is required!", (value) => value && value.length > 0),
    courseId: yup.string().required('Select course'),
    email: yup.string().email("Invalid email!").nullable().default(null),
    totalFees: yup.number().typeError("Total fees required, select course!").positive("Total fees required, select course!").required("Total fees required, select course!")
  })
  .required();

const AddNewStudent = () => {
  const [courses, setCourses] = useState([]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all"
  });
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "courses"),
      (snapshot) => {
        const list = [];
        snapshot.docs.forEach((doc) =>
          list.push({ id: doc.id, ...doc.data() })
        );
        setCourses(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => unsub();
  }, []);

  const navigate = useNavigate();

  const handleAdd = async (data) => {
    try {
      // upload the file
      data.photo = await uploadFile(data.photo[0], data.phone);
      const student = await addDoc(collection(db, "students"), {
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
        ]),
      });
      const enrollment = await addDoc(collection(db, "enrollments"), {
        studentId: student.id,
        ...pick(data, ["courseId"]),
        createdAt: new Date(),
        updatedAt: new Date(),
        totalFees: 1000
      });
      await addDoc(collection(db, "fees"), {
        createdAt: new Date(),
        updatedAt: new Date(),
        ...pick(data, ["paidFees"]),
        enrollmentId: enrollment.id,
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
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
          onSubmit={handleSubmit(handleAdd)}
        >
          <div className="photo">
            <Controller
              name="photo"
              control={control}
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <Stack gap={2}>
                  <Avatar
                    sx={{ width: 200, height: 200 }}
                    src={
                      value && value.length
                        ? URL.createObjectURL(value[0])
                        : 'https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg'
                    }
                    alt="files preview"
                  />
                  <label htmlFor="files">
                    <Input
                      {...fieldProps}
                      onChange={(event) => onChange(event.target.files)}
                      type="file"
                      accept="image/*"
                      id="files"
                      multiple
                    />
                    <Button variant="contained" component="span">
                      Upload
                    </Button>
                    {errors.photo && <Typography variant="caption" display="block" color="crimson" gutterBottom>
                      {errors.photo.message}
                    </Typography>
                    }
                  </label>
                </Stack>
              )}
            />
          </div>
          <div className="formInput">
            <Grid container spacing={4}>
              <Grid item xs={4}>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="First Name"
                      error={Boolean(errors["firstName"])}
                      helperText={errors["firstName"]?.message}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="middleName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Middle Name"
                      error={Boolean(errors["middleName"])}
                      helperText={errors["middleName"]?.message}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Last Name"
                      error={Boolean(errors["lastName"])}
                      helperText={errors["lastName"]?.message}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="fatherName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Father Name"
                      error={Boolean(errors["fatherName"])}
                      helperText={errors["fatherName"]?.message}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="motherName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Mother Name"
                      error={Boolean(errors["motherName"])}
                      helperText={errors["motherName"]?.message}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone"
                      error={Boolean(errors["phone"])}
                      helperText={errors["phone"]?.message}
                      inputProps={{ maxLength: 10 }}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      error={Boolean(errors["email"])}
                      helperText={errors["email"]?.message}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item sm={4}>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Date Of Birth"
                      type="date"
                      error={Boolean(errors["dateOfBirth"])}
                      helperText={errors["dateOfBirth"]?.message}
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item sm={4}>
                <Controller
                  name="courseId"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                      <InputLabel id="select-course">Course</InputLabel>
                      <Select
                        labelId="select-course"
                        label="Course"
                        {...field}
                        variant="standard"

                        error={Boolean(errors.courseId)}
                        onChange={(e) => {
                          const courseId = e.target.value;
                          const totalFees = courseId ? courses.find(({ id }) => id === courseId).fees : "";
                          setValue("totalFees", totalFees);
                          field.onChange(courseId)
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {courses.map((course) => (
                          <MenuItem key={course.id} value={course.id}>
                            {course.course}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />

              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="totalFees"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      name="totalFees"
                      label="Total Fees ₹"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                      readOnly
                      error={Boolean(errors["totalFees"])}
                      helperText={errors["totalFees"]?.message}
                      disabled
                      h={console.log("Here", field.value)}
                    />
                  )}
                />

              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="discount"
                  defaultValue={0}
                  control={control}
                  render={({ field }) => (

                    < TextField
                      {...field}
                      label="Discount %"
                      error={Boolean(errors["discount"])}
                      helperText={errors["discount"]?.message}
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="paidFees"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Paid Fees"
                      error={Boolean(errors["paidFees"])}
                      helperText={errors["paidFees"]?.message}
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item sm={6}>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Address"
                      error={Boolean(errors["address"])}
                      helperText={errors["address"]?.message}
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                      style={{ width: "80%" }}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={12} textAlign="center">
                <Button
                  variant="contained"
                  type="submit"
                // disabled={percentage < 100}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </div>
        </Box>
      </div >
    </div >
  );
};

export default AddNewStudent;
