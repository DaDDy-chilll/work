import { Box, CircularProgress, Pagination } from '@mui/material';
import { useDisclosure } from '../hooks/useDisclosure';
import ModalButton from '../components/ui/ModalButton';
import Modal from '../components/ui/Modal';
import DataTable from '../components/ui/DataTable';
import { colors } from '../assets/theme/theme';
import { useGetAllDepartments } from '../api';
import DepartmentRow from '../components/row/DepartmentRow';
import { DepartmentColumn } from '../components/column';
import DepartmentForm from '../components/form/DepartmentForm';
import { useState } from 'react';
import { AddOutlined } from '@mui/icons-material';

const DepartmentsPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [page, setPage] = useState(1);

  const { isError, error, data, isFetching } = useGetAllDepartments(page);

  if (isError) return <p>Error: {error.message}</p>;

  return (
    <Box>
      <ModalButton
        color="primary"
        innerText="Create New Department"
        onOpen={onOpen}
        icon={<AddOutlined sx={{ ml: '5px' }} />}
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
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <Pagination
                count={Math.ceil(data?.total / 10)}
                shape="rounded"
                color="primary"
                sx={{ bgcolor: colors.white[100] }}
                size="large"
                page={page}
                onChange={(_e, value) => {
                  setPage(value);
                }}
              />
            </Box>
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
  );
};

export default DepartmentsPage;
