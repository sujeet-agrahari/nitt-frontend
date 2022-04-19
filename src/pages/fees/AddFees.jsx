import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";

import { useEffect, useState } from "react";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Add } from "@mui/icons-material";
import { addDocument, getDocuments } from "../../firebase";
import ControlledAutoComplete from "../../components/mui-react-hook-form/ControlledAutoComplete";

const schema = yup
  .object({
    paidFees: yup
      .number()
      .typeError("")
      .positive()
      .integer()
      .required("Field is required!"),
    enrollmentId: yup.mixed().required("Please select student!"),
  })
  .required();

export default function AddFees() {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const [enrollments, setEnrollments] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      const enrollments = await getDocuments({
        collectionName: "enrollments",
      });
      for (const enrollment of enrollments) {
        enrollment.student = await getDocuments({
          collectionName: "students",
          fetchSingle: true,
          whereConditions: {
            id: enrollment.studentId,
          },
        });
      }
      setEnrollments(enrollments);
    };
    fetchStudents();
  }, []);

  const handleFeesAdd = async (data) => {
    await addDocument({
      collectionName: "fees",
      fields: {
        paidFees: data.paidFees,
        enrollmentId: data.enrollmentId.id,
      },
    });
    setOpen(false);
  };

  return (
    <Box>
      <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
        <Add />
      </Fab>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Submit Fees</DialogTitle>
        <DialogContent>
          <ControlledAutoComplete
            control={control}
            name="enrollmentId"
            options={enrollments}
            getOptionLabel={(option) => `${option.student.firstName}`}
            label="Select Students"
            errors={errors}
            defaultValue={null}
          />
          <Controller
            name="paidFees"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">
                  Paid Fees
                </InputLabel>
                <Input
                  {...field}
                  name="paidFees"
                  id="standard-adornment-amount"
                  error={Boolean(errors.paidFees)}
                  startAdornment={
                    <InputAdornment position="start">₹</InputAdornment>
                  }
                />
              </FormControl>
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit(handleFeesAdd)}>Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
