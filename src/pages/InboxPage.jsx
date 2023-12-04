/* eslint-disable react/prop-types */
import { Box, CircularProgress } from '@mui/material';
import DataTable from '../components/ui/DataTable';
import { colors } from '../assets/theme/theme';
import { useGetInbox } from '../api';
import DocumentRow from '../components/row/DocumentRow';
import { DocumentColumn } from '../components/column/DocumentColumn';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import CustomPagination from '../components/shared/CustomPagination';
import { usePageTitle } from '../hooks';

const CustomFilter = ({ items, optionValue, handleOptionChange }) => {
  return (
    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
      {items.map((item) => (
        <Box
          key={item.value}
          sx={{
            bgcolor: `${
              optionValue === item.value ? colors.paleBlue[800] : colors.bgColor
            }`,
            color: `${
              optionValue === item.value ? colors.white[100] : colors.black[300]
            }`,
            border: `1px solid ${colors.paleBlue[800]}`,
            width: '110px',
            height: '40px',
            borderRadius: 5,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
          onClick={() => handleOptionChange(item.value)}
        >
          {item.text}
        </Box>
      ))}
    </Box>
  );
};

const InboxPage = () => {
  const items = [
    {
      text: 'To Check',
      value: 'open',
    },
    {
      text: 'All',
      value: '',
    },
  ];

  const [optionValue, setOptionValue] = useState('open');

  const handleOptionChange = (value) => {
    setOptionValue(value);
  };

  console.log({ optionValue });

  // eslint-disable-next-line no-unused-vars
  const { pageTitle, setPageTitle } = usePageTitle('Inbox');

  const [page, setPage] = useState(1);

  const { isError, error, data, isFetching } = useGetInbox({
    sort: '-createdAt',
    page,
    limit: 10,
    caseStatus: optionValue,
  });

  if (isError) return <p>Error: {error?.response?.data?.message}</p>;

  return (
    <Box m={2} borderRadius="1rem" bgcolor={colors.white[100]}>
      <Navbar />
      <Box p={3}>
        <CustomFilter
          items={items}
          optionValue={optionValue}
          handleOptionChange={handleOptionChange}
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
