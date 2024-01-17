import { Box, CircularProgress } from '@mui/material';
import DataTable from '../components/ui/DataTable';
import { colors } from '../assets/theme/theme';
import { useGetAllRequests } from '../api';
import DocumentRow from '../components/row/DocumentRow';
import { DocumentColumn } from '../components/column/DocumentColumn';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import SearchBox from '../components/shared/SearchBox';
import DateRangeFilter from '../components/shared/DateRangeFilter';
import {
  useAuth,
  useCustomeFilter,
  useDateRangeFilter,
  useDepartmentFilter,
  usePageTitle,
} from '../hooks';
import DepartmentFilter from '../components/shared/DepartmentFilter';
import CustomChip from '../components/shared/CustomChip';
import { Clear } from '@mui/icons-material';
import CustomPagination from '../components/shared/CustomPagination';
import moment from 'moment';
import CustomFilter from '../components/ui/CustomFilter';
import { FILTER_OPTIONS } from '../constants';

const AllRequestsPage = () => {
  // PAGE TITLE
  // eslint-disable-next-line no-unused-vars
  const { pageTitle, setPageTitle } = usePageTitle('All Requests');

  const { user } = useAuth();

  const [page, setPage] = useState(1);

  // STATUS FILTER
  const { optionValue, handleOptionChange } = useCustomeFilter({
    initialValue: { text: 'all', value: '' },
  });

  // DEPARTMENT FILTER
  const {
    filteredDepartments,
    isOpen,
    onOpen,
    onClose,
    departments,
    search,
    searchedDepartments,
    handleSearch,
    handleSearchCancel,
    handleFilter,
    handleClearAll,
    handleChange,
    handleDelete,
  } = useDepartmentFilter();

  // DATE RANGE FILTER
  const { date, openDate, setOpenDate, handleDateChange, handleRemoveDate } =
    useDateRangeFilter();

  // SEARCH
  const [searchValue, setSearchValue] = useState('');

  const convertUtc = ({ startDate, endDate }) => {
    const startTime = moment(startDate).utc().format();
    let endTime = moment(endDate).add(1, 'days').utc().format();

    if (startTime === endTime) {
      endTime = moment(endDate).add(1, 'days').utc().format();
    }

    return { startTime, endTime };
  };

  let query = {
    search: searchValue,
    startDate: date.startDate && date.endDate ? convertUtc(date).startTime : '',
    endDate: date.startDate && date.endDate ? convertUtc(date).endTime : '',
    departments: filteredDepartments.map((department) => department.id),
    sort: '-createdAt',
    page,
    limit: 10,
  };

  if (optionValue.key) {
    Object.assign(query, { [optionValue.key]: optionValue.value });
  }

  const { isError, error, data, isFetching } = useGetAllRequests(query);

  if (isError) return <p>Error: {error?.response?.data?.message}</p>;

  return (
    <Box m={2} borderRadius="1rem" bgcolor={colors.white[100]}>
      <Navbar />
      <Box p={3}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <CustomFilter
            items={FILTER_OPTIONS.ALL_REQUESTS}
            optionValue={optionValue}
            handleOptionChange={handleOptionChange}
          />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <DateRangeFilter
              date={date}
              openDate={openDate}
              setOpenDate={setOpenDate}
              handleDateChange={handleDateChange}
              handleRemoveDate={handleRemoveDate}
            />
            <SearchBox
              setSearch={setSearchValue}
              placeholder="Search Subject"
            />
            {user?.department?.type === 'authorized' && (
              <DepartmentFilter
                departments={departments}
                filteredDepartments={filteredDepartments}
                search={search}
                searchedDepartments={searchedDepartments}
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                handleSearch={handleSearch}
                handleChange={handleChange}
                handleFilter={handleFilter}
                handleSearchCancel={handleSearchCancel}
              />
            )}
          </Box>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          {filteredDepartments.map((department) => (
            <CustomChip
              key={department.id}
              department={department}
              icon={<Clear />}
              onClick={handleDelete}
            />
          ))}
          {filteredDepartments.length !== 0 && (
            <CustomChip onClick={handleClearAll} />
          )}
        </Box>
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

export default AllRequestsPage;
