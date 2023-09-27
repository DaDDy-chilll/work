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
import { useAuth, useDateRangeFilter, useDepartmentFilter } from '../hooks';
import DepartmentFilter from '../components/shared/DepartmentFilter';
import CustomChip from '../components/shared/CustomChip';
import { Clear } from '@mui/icons-material';
import CustomPagination from '../components/shared/CustomPagination';
import moment from 'moment';

const AllRequestsPage = () => {
  const { user } = useAuth();

  const [page, setPage] = useState(1);

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
  const {
    date,
    openDate,
    setOpenDate,
    handleDateChange,
    handleDateFilter,
    handleRemoveDate,
  } = useDateRangeFilter();

  // SEARCH
  const [searchValue, setSearchValue] = useState('');

  console.log(moment(date.startDate).utc().format());
  console.log(moment(date.endDate).utc().format());

  const { isError, error, data, isFetching } = useGetAllRequests({
    search: searchValue,
    startDate: date.startDate ? moment(date.startDate).utc().format() : '',
    endDate: date.startDate ? moment(date.endDate).utc().format() : '',
    departments: filteredDepartments.map((department) => department.id),
    sort: '-createdAt',
    page,
    limit: 10,
  });

  if (isError) return <p>Error: {error?.response?.data?.message}</p>;

  return (
    <Box m={2} borderRadius="1rem" bgcolor={colors.white[100]}>
      <Navbar />
      <Box p={3}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <SearchBox setSearch={setSearchValue} placeholder="Search Subject" />
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
          <DateRangeFilter
            date={date}
            openDate={openDate}
            setOpenDate={setOpenDate}
            handleDateChange={handleDateChange}
            handleDateFilter={handleDateFilter}
            handleRemoveDate={handleRemoveDate}
          />
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
