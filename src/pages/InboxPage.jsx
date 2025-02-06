import { Box, CircularProgress } from '@mui/material';
import DataTable from '../components/ui/DataTable';
import { colors } from '../assets/theme/theme';
import { useGetInbox } from '../api';
import DocumentRow from '../components/row/DocumentRow';
import { DocumentColumn } from '../components/column/DocumentColumn';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import CustomPagination from '../components/shared/CustomPagination';
import { useCustomeFilter, usePageTitle } from '../hooks';
import { FILTER_OPTIONS } from '../constants';
import CustomFilter from '../components/ui/CustomFilter';

const InboxPage = () => {
  const { optionValue, handleOptionChange } = useCustomeFilter({
    initialValue: FILTER_OPTIONS.INBOX[0],
  });

  // eslint-disable-next-line no-unused-vars
  const { pageTitle, setPageTitle } = usePageTitle('Inbox');

  const [page, setPage] = useState(1);

  const { isError, error, data, isFetching } = useGetInbox({
    sort: 'createdAt',
    page,
    limit: 10,
    [optionValue.key]: optionValue.value,
  });

  console.log('data mentioned --------',data)
  console.log('data mentioned --------',{
    sort: 'createdAt',
    page,
    limit: 10,
    [optionValue.key]: optionValue.value,
  })


  

  if (isError) return <p>Error: {error?.response?.data?.message}</p>;

  return (
    <Box m={2} borderRadius="1rem" bgcolor={colors.white[100]}>
      <Navbar />
      <Box p={3}>
        <CustomFilter
          items={FILTER_OPTIONS.INBOX}
          optionValue={optionValue}
          handleOptionChange={handleOptionChange}
          sx={{
            mb: 2,
          }}
        />
        {isFetching ? (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress size={56} />
          </Box>
        ) : (
          <>
            <DataTable
              columns={DocumentColumn}
              rows={<DocumentRow payload={data?.payload} />}
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
      </Box>
    </Box>
  );
};

export default InboxPage;
