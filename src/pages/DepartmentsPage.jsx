import { Box, CircularProgress } from '@mui/material';
import { useDisclosure } from '../hooks/useDisclosure';
import Modal from '../components/ui/Modal';
import DataTable from '../components/ui/DataTable';
import { colors } from '../assets/theme/theme';
import { useGetAllDepartments } from '../api';
import DepartmentRow from '../components/row/DepartmentRow';
import { DepartmentColumn } from '../components/column';
import DepartmentForm from '../components/form/DepartmentForm';
import { useState } from 'react';
import { AddOutlined } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import ModalButton from '../components/ui/ModalButton';
import CustomPagination from '../components/shared/CustomPagination';
import { usePageTitle } from '../hooks';

const DepartmentsPage = () => {
  // eslint-disable-next-line no-unused-vars
  const { pageTitle, setPageTitle } = usePageTitle('Departments');

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [page, setPage] = useState(1);

  const { isError, error, data, isFetching } = useGetAllDepartments({
    sort: '-createdAt',
    page,
    limit: 10,
  });

  if (isError) return <p>Error: {error?.response?.data?.message}</p>;

  return (
    <Box m={2} borderRadius="1rem" bgcolor={colors.white[100]}>
      <Navbar />
      <Box p={3}>
        <ModalButton
          mb={1}
          width="220px"
          color="primary"
          innerText="Create New Department"
          onOpen={onOpen}
          icon={<AddOutlined sx={{ ml: 1 }} />}
        />
        <>
          {isFetching ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress size={56} />
            </Box>
          ) : (
            <>
              <DataTable
                columns={DepartmentColumn}
                rows={<DepartmentRow payload={data?.payload} />}
                hasAction={false}
              />
              <CustomPagination
                count={Math.ceil(data?.total / 10)}
                page={page}
                onChange={(_e, value) => {
                  setPage(value);
                }}
              />
            </>
          )}
        </>
        <Modal
          title="Create New Department"
          isOpen={isOpen}
          onClose={onClose}
          content={<DepartmentForm onClose={onClose} />}
        />
      </Box>
    </Box>
  );
};

export default DepartmentsPage;
