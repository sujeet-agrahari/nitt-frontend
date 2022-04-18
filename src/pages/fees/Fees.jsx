import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar } from '@mui/material';
import { collection, doc, getDoc, query, where } from 'firebase/firestore';
import { db, getResult } from '../../firebase';
import Sidebar from '../../components/sidebar/Sidebar';
import Navbar from '../../components/navbar/Navbar';
import { getDate } from "../../utils";

import "./fees.scss";
import { Box } from '@mui/system';


export default function Fees() {
  const [feesDetail, setFeesDetail] = React.useState([]);

  React.useEffect(() => {
    const fetchFees = async () => {
      const enrollments = await getResult(query(collection(db, "enrollments")));
      for (const enrollment of enrollments) {
        enrollment.student = (await getDoc(doc(db, "students", enrollment.studentId))).data();
        enrollment.course = (await getDoc(doc(db, "courses", enrollment.courseId))).data();
        enrollment.fees = (await getResult(query(collection(db, "fees"), where("enrollmentId", "==", enrollment.id))))[0];
      }
      console.log(enrollments);

      setFeesDetail(enrollments);
    }
    fetchFees();
  }, []);


  const rows = feesDetail.map((enrollment) => ({
    photo: enrollment.student?.photo,
    fullName: enrollment.student?.firstName,
    totalFees: enrollment.totalFees,
    paidFees: enrollment.fees?.paidFees,
    course: enrollment.course?.course,
    feePaidDate: getDate(enrollment.fees?.createdAt?.toDate()),
    medium: "Cash"
  }))

  console.log(rows);

  return (
    <div className="fees">
      <Sidebar />
      <div className="feesContainer">
        <Navbar />
        <Box>
          <TableContainer>
            <Table sx={{ minWidth: 650, padding: '50px' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right">Sr</TableCell>
                  <TableCell align="right">Photo</TableCell>
                  <TableCell align="right">Full Name</TableCell>
                  <TableCell align="right">Course</TableCell>
                  <TableCell align="right">Total Fees</TableCell>
                  <TableCell align="right">Fee Paid</TableCell>
                  <TableCell align="right">Paid On</TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ fontWeight: '200' }}>
                {rows.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="right" component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="right"><Avatar src={row.photo} sx={{ height: '80px', width: '80px', display: 'inline-block' }} /></TableCell>
                    <TableCell align="right" sx={{ fontWeight: 200 }}>{row.fullName}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 200 }}>{row.course}</TableCell>
                    <TableCell align="right" >{row.totalFees}</TableCell>
                    <TableCell align="right" sx={{ color: 'green' }}>{row.paidFees}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 200 }}>{row.feePaidDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </div>
    </div>

  );
}