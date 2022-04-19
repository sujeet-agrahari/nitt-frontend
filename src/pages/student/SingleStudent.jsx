import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./singleStudent.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import dayjs from "dayjs";

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
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, styled } from "@mui/system";
import { getDocuments } from "../../firebase";

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
    phone: yup
      .string()
      .matches(/^[6-9]{1}[0-9]{9}$/, "Invalid phone number!")
      .required("Field is required!"),
    dateOfBirth: yup.date().required("Field is required"),
    address: yup.string().required("Field is required"),
    discount: yup.number().integer().min(0),
    photo: yup
      .mixed()
      .test(
        "photo",
        "Photo is required!",
        (value) => value && value.length > 0
      ),
    courseId: yup.string().required("Select course"),
    email: yup.string().email("Invalid email!").nullable().default(null),
    totalFees: yup
      .number()
      .typeError("Total fees required, select course!")
      .positive("Total fees required, select course!")
      .required("Total fees required, select course!"),
  })
  .required();

const SingleStudent = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });
  const { studentId } = useParams();
  const [courses, setCourses] = useState([]);
  const [fees, setFees] = useState([]);

  useEffect(() => {
    const fetchCourse = async () => {
      const allCourse = await getDocuments({
        collectionName: "courses",
      });
      setCourses(allCourse);
    };
    fetchCourse();
  }, []);

  useEffect(() => {
    // LISTEN(REALTIME)
    const fetchStudent = async () => {
      const enrollment = await getDocuments({
        whereConditions: {
          studentId,
        },
        collectionName: "enrollments",
        fetchSingle: true,
      });
      const student = await getDocuments({
        whereConditions: {
          id: studentId,
        },
        collectionName: "students",
        fetchSingle: true,
      });
      student.enrollment = enrollment;
      student.course = await getDocuments({
        whereConditions: {
          id: enrollment.courseId,
        },
        collectionName: "courses",
        fetchSingle: true,
      });
      student.fees = await getDocuments({
        whereConditions: {
          enrollmentId: enrollment.id,
        },
        collectionName: "fees",
      });
      setFees(student.fees);
      const studentFields = [
        "firstName",
        "middleName",
        "lastName",
        "photo",
        "address",
        "phone",
        "fatherName",
        "motherName",
        "email",
      ];
      setValue(
        "dateOfBirth",
        dayjs(student.dateOfBirth.toDate()).format("YYYY-MM-DD")
      );
      const enrollmentFields = ["totalFees", "courseId"];
      studentFields.forEach((field) => setValue(field, student[field]));

      const totalPaidFees = student.fees.reduce(
        (prev, current) => prev + +current.paidFees,
        0
      );
      setValue("paidFees", totalPaidFees);
      enrollmentFields.forEach((field) =>
        setValue(field, student.enrollment[field])
      );
    };
    fetchStudent();
  }, [studentId, setValue, setFees, fees]);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
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
          onSubmit={handleSubmit()}
        >
          <div className="photo">
            <Controller
              name="photo"
              control={control}
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <Stack gap={2}>
                  <Avatar
                    sx={{ width: 200, height: 200 }}
                    src={value}
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
                    {errors.photo && (
                      <Typography
                        variant="caption"
                        display="block"
                        color="crimson"
                        gutterBottom
                      >
                        {errors.photo.message}
                      </Typography>
                    )}
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
                  defaultValue={""}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="First Name"
                      error={Boolean(errors.firstName)}
                      helperText={errors.firstName?.message}
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="middleName"
                  defaultValue={""}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Middle Name"
                      error={Boolean(errors.middleName)}
                      helperText={errors.middleName?.message}
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="lastName"
                  defaultValue={""}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Last Name"
                      error={Boolean(errors.lastName)}
                      helperText={errors.lastName?.message}
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="fatherName"
                  defaultValue={""}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Father Name"
                      error={Boolean(errors.fatherName)}
                      helperText={errors.fatherName?.message}
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="motherName"
                  defaultValue={""}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Mother Name"
                      error={Boolean(errors.motherName)}
                      helperText={errors.motherName?.message}
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="phone"
                  defaultValue={""}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone"
                      error={Boolean(errors.phone)}
                      helperText={errors.phone?.message}
                      inputProps={{ maxLength: 10 }}
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="email"
                  defaultValue={""}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      error={Boolean(errors.email)}
                      helperText={errors.email?.message}
                      variant="standard"
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                />
              </Grid>
              <Grid item sm={4}>
                <Controller
                  name="dateOfBirth"
                  defaultValue={""}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Date Of Birth"
                      type="date"
                      error={Boolean(errors.dateOfBirth)}
                      helperText={errors.dateOfBirth?.message}
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item sm={4}>
                <Controller
                  name="courseId"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120 }}
                    >
                      <InputLabel id="select-course">Course</InputLabel>
                      <Select
                        labelId="select-course"
                        label="Course"
                        {...field}
                        variant="standard"
                        error={Boolean(errors.courseId)}
                        onChange={(e) => {
                          const courseId = e.target.value;
                          const totalFees = courseId
                            ? courses.find(({ id }) => id === courseId).fees
                            : "";
                          setValue("totalFees", totalFees);
                          field.onChange(courseId);
                        }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {courses.map((course) => (
                          <MenuItem
                            key={course.id}
                            value={course.id}
                            selected={course.id === field.value}
                          >
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
                  defaultValue={""}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      name="totalFees"
                      label="Total Fees ₹"
                      type="number"
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                      readOnly
                      error={Boolean(errors.totalFees)}
                      helperText={errors.totalFees?.message}
                      disabled
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
                    <TextField
                      {...field}
                      label="Discount %"
                      error={Boolean(errors.discount)}
                      helperText={errors.discount?.message}
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  name="paidFees"
                  defaultValue={0}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Paid Fees"
                      error={Boolean(errors.paidFees)}
                      helperText={errors.paidFees?.message}
                      InputLabelProps={{ shrink: true }}
                      variant="standard"
                    />
                  )}
                />
              </Grid>
              <Grid item sm={6}>
                <Controller
                  name="address"
                  defaultValue={""}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Address"
                      error={Boolean(errors.address)}
                      helperText={errors.address?.message}
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
                  Update
                </Button>
              </Grid>
            </Grid>
          </div>
        </Box>
        <Box>
          <div className="top">
            <Typography variant="h5" component="div" color="gray">
              Fees History
            </Typography>
          </div>
          <TableContainer sx={{ height: "600px" }}>
            <Table
              sx={{ minWidth: 650, padding: "50px" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="right">Sr</TableCell>
                  <TableCell align="right">Fees Paid</TableCell>
                  <TableCell align="right">Due Fees</TableCell>
                  <TableCell align="right">Paid On</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ fontWeight: "200" }}>
                {fees.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right" component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="right" sx={{ color: "green" }}>
                      {row.paidFees}
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 200 }}>
                      {+getValues("totalFees") - +getValues("paidFees")}
                    </TableCell>
                    <TableCell align="right" sx={{ fontWeight: 200 }}>
                      {dayjs(row.createdAt.toDate()).format("DD-MM-YY")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </div>
  );
};

export default SingleStudent;
