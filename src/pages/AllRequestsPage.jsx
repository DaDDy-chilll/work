import { Box, CircularProgress, Pagination } from '@mui/material';
import DataTable from '../components/ui/DataTable';
import { colors, theme } from '../assets/theme/theme';
import { useGetAllRequests } from '../api';
import DocumentRow from '../components/row/DocumentRow';
import { DocumentColumn } from '../components/column/DocumentColumn';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import SearchBox from '../components/shared/SearchBox';
import DateRangeFilter from '../components/shared/DateRangeFilter';
import { useAuth, useDateRangeFilter, useDepartmentFilter } from '../hooks';
import { transformDate } from '../helpers';
import DepartmentFilter from '../components/shared/DepartmentFilter';
import CustomChip from '../components/shared/CustomChip';
import { Clear } from '@mui/icons-material';

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
  const { date, openDate, setOpenDate, handleDateChange, handleRemoveDate } =
    useDateRangeFilter();

  // SEARCH
  const [searchValue, setSearchValue] = useState('');

  const { isError, error, data, isFetching } = useGetAllRequests({
    search: searchValue,
    startDate: transformDate(date.startDate ? date.startDate : ''),
    endDate: transformDate(date.endDate ? date.endDate : ''),
    departments: filteredDepartments.map((department) => department.id),
    sort: '-createdAt',
    page,
    limit: 10,
  });

  if (isError) return <p>Error: {error.message}</p>;

  console.log(theme.palette);

  return (
    <Box m={3} borderRadius="1rem" bgcolor={colors.white[100]}>
      <Navbar />
      <Box p={3}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <SearchBox setSearch={setSearchValue} placeholder="Search Subject" />
          {user?.department?.type === 'Authorized' && (
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
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
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
      </Box>
    </Box>
  );
};

export default AllRequestsPage;
