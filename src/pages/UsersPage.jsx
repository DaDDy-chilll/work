import { Box, CircularProgress } from '@mui/material';
import { useDisclosure } from '../hooks/useDisclosure';
import Modal from '../components/ui/Modal';
import UserForm from '../components/form/UserForm';
import { useGetAllUsers } from '../api/user';
import DataTable from '../components/ui/DataTable';
import UserRow from '../components/row/UserRow';
import { UserColumn } from '../components/column/UserColumn';
import { colors } from '../assets/theme/theme';
import { useState } from 'react';
import { AddOutlined } from '@mui/icons-material';
import Navbar from '../components/Navbar';
import ModalButton from '../components/ui/ModalButton';
import SearchBox from '../components/shared/SearchBox';
import CustomPagination from '../components/shared/CustomPagination';

const UsersPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [page, setPage] = useState(1);

  const [searchValue, setSearchValue] = useState('');

  const { isError, error, data, isFetching } = useGetAllUsers({
    search: searchValue,
    sort: '-createdAt',
    page,
    limit: 10,
  });

  if (isError) return <p>Error: {error?.response?.data?.message}</p>;

  return (
    <Box m={2} borderRadius="1rem" bgcolor={colors.white[100]}>
      <Navbar />
      <Box p={3}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <SearchBox setSearch={setSearchValue} placeholder="Search Name" />
          <ModalButton
            mb={2}
            width="180px"
            color="primary"
            innerText="Create New User"
            onOpen={onOpen}
            icon={<AddOutlined sx={{ ml: 1 }} />}
          />
        </Box>
        <>
          {isFetching ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CircularProgress size={56} />
            </Box>
          ) : (
            <>
              <DataTable
                columns={UserColumn}
                rows={<UserRow payload={data?.payload} />}
                hasAction={true}
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
          title="Create New User"
          isOpen={isOpen}
          onClose={onClose}
          content={<UserForm onClose={onClose} oldData={undefined} />}
        />
      </Box>
    </Box>
  );
};

export default UsersPage;
