import { Box } from '@mui/system';
import Layout from 'src/components/layout/Layout';
import PageTitle from 'src/components/page-title/PageTitle';
import ApiConfig from 'src/api/api-config';
import moment from 'moment';
import MuiDataTable from 'mui-datatables';
import { Avatar, IconButton, Tooltip } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useState } from 'react';

import axiosHook from '../../api/axios-hook';
import { AddFees } from './AddFees';

const columns = [
  {
    name: 'id',
    label: 'ID',
    options: {
      display: false,
      filter: true,
      sort: true,
    },
  },

  {
    name: 'photo',
    label: 'Photo',
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => <Avatar src={value} sx={{ height: '60px', width: '60px' }} />,
    },
  },
  {
    name: 'studentName',
    label: 'Student',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'phone',
    label: 'Phone',
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: 'course',
    label: 'Course',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'paidFees',
    label: 'Paid Fees',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'medium',
    label: 'Payment Medium',
    options: {
      filter: false,
      sort: true,
    },
  },
  {
    name: 'receiptNo',
    label: 'Receipt No',
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: 'paidOn',
    label: 'Paid On',
    options: {
      filter: true,
      sort: true,
    },
  },
];

const getEnrolledStudents = (fees) =>
  fees.map((fee) => ({
    id: fee.id,
    studentName: `${fee.Enrollment.Student.firstName} ${fee.Enrollment.Student.lastName}`,
    phone: fee.Enrollment.Student.User?.phone,
    course: fee.Enrollment.Course.name,
    paidFees: fee.paidFees,
    medium: fee.medium,
    receiptNo: fee.receiptNo,
    paidOn: moment(fee.paidOn).format('DD-MM-YYYY'),
    photo: fee.Enrollment.Student.photo,
  }));
export default function Fees() {
  const [{ data: fees = [] }, refetchFees] = axiosHook(ApiConfig.FEES.GET_FEES.url);

  const [addFeesDialogOpen, setAddFeesDialogOpen] = useState(false);

  return (
    <Layout>
      <Box padding={2} width="100%">
        <PageTitle pageTitle="Fees" />
        <AddFees open={addFeesDialogOpen} setOpen={setAddFeesDialogOpen} title="Add Course" refetchFees={refetchFees} />
        <MuiDataTable
          data={getEnrolledStudents(fees)}
          columns={columns}
          options={{
            filterType: 'checkbox',
            selectableRows: 'none',
            customToolbar: () => (
              <Tooltip title={'Collect Fees'}>
                <IconButton onClick={() => setAddFeesDialogOpen(true)}>
                  <Add />
                </IconButton>
              </Tooltip>
            ),
          }}
        />
      </Box>
    </Layout>
  );
}
