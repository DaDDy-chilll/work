import { Box, CircularProgress, Pagination } from '@mui/material';
import { useDisclosure } from '../hooks/useDisclosure';
import CreateButton from '../components/ui/CreateButton';
import Modal from '../components/ui/Modal';
import UserForm from '../components/form/UserForm';
import { useGetAllUsers } from '../api/user';
import DataTable from '../components/ui/DataTable';
import UserRow from '../components/row/UserRow';
import { UserColumn } from '../components/column/UserColumn';
import { colors } from '../assets/theme/theme';
import { useState } from 'react';

const UsersPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [page, setPage] = useState(1)

  const {
    isError,
    error,
    data,
    isFetching,
  } = useGetAllUsers(page)

  if (isError) return <p>Error: {error.message}</p>

  return (
    <Box>
      <CreateButton innerText="Create New User" onOpen={onOpen} />
      <>
        {
          isFetching ?
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress size={56} />
            </Box>
            :
            <>
              <DataTable
                columns={UserColumn}
                rows={<UserRow payload={data?.payload} />}
                hasAction={true}
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
                    setPage(value)
                  }}
                />
              </Box>
            </>
        }
      </>
      <Modal
        title="Create New User"
        isOpen={isOpen}
        onClose={onClose}
        content={<UserForm onClose={onClose} />}
      />
    </Box>
  );
};

export default UsersPage;
