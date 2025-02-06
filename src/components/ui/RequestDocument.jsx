/* eslint-disable react/prop-types */
import { Box, CircularProgress } from '@mui/material';

import { colors } from '../../assets/theme/theme';
// import { useGetMyRequests } from '../api';
import LinkButton from '../../components/ui/LinkButton';
import DocumentRow from '../../components/row/DocumentRow';
import {
  PurchaseOrderDocumentColumn,
  PurchaseRequestDocumentColumn,
} from '../../components/column/DocumentColumn';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
// import { AddOutlined } from '@mui/icons-material';
import CustomPagination from '../../components/shared/CustomPagination';
import { useDateRangeFilter, useCustomeFilter } from '../../hooks';
import SearchBox from '../../components/shared/SearchBox';
import DateRangeFilter from '../../components/shared/DateRangeFilter';
import CustomFilter from '../../components/ui/CustomFilter';
import { FILTER_OPTIONS } from '../../constants';
import DataTable from './DataTable';

const RequestDocument = ({
  resultData,
  page,
  changePage,
  isFetching,
  currentPath,
}) => {
  const navigate = useNavigate();
  const { date, openDate, setOpenDate, handleDateChange, handleRemoveDate } =
    useDateRangeFilter();

  const { optionValue, handleOptionChange } = useCustomeFilter({
    initialValue: {
      text: 'My Request',
      value: `my-${currentPath.split('/')[1]}-request`,
    },
  });

  return (
    <Box m={2} borderRadius="1rem" bgcolor={colors.white[100]}>
      <Navbar />
      <Box p={3}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <SearchBox placeholder="Search ID,Subject" />
            <DateRangeFilter
              date={date}
              openDate={openDate}
              setOpenDate={setOpenDate}
              handleDateChange={handleDateChange}
              handleRemoveDate={handleRemoveDate}
             
            />
          </Box>
          {currentPath === '/purchase-request' && (
            <LinkButton
              width="220px"
              color="primary"
              innerText={
                   'Create purchase request'
              }
              onClick={() => navigate(`/purchase-request/create`)}
              variant="contained"
            />
          )}
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <CustomFilter
            items={
              currentPath === '/purchase-request'
                ? FILTER_OPTIONS.PURCHASE_REQUEST
                : FILTER_OPTIONS.PURCHASE_ORDER
            }
            optionValue={optionValue}
            handleOptionChange={handleOptionChange}
            sx={{
                mb: 2,
              }}
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
                columns={
                  currentPath === '/purchase-request'
                    ? PurchaseRequestDocumentColumn
                    : PurchaseOrderDocumentColumn
                }
                rows={
                  <DocumentRow
                    payload={resultData?.payload}
                    currentPath={currentPath}
                  />
                }
                hasAction={true}
              />
              <CustomPagination
                count={Math.ceil(resultData?.total / 10)}
                page={page}
                onChange={(_e, value) => {
                  changePage(value);
                }}
              />
            </>
          )}
        </>
      </Box>
    </Box>
  );
};

export default RequestDocument;
