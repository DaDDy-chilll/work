/* eslint-disable react/prop-types */
import CustomTooltip from '../shared/CustomTooltip';
import { Box } from '@mui/material';
import DataTable from '../ui/DataTable';
import { DepartmentMemberListsColumn } from '../column/DepartmentMemberListsColumn';
import DepartmentMemberListsRow from '../row/DepartmentMemberListsRow';

const DepartmentMemberLists = ({ department, handleSelectChange }) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <label>Select {department.name}</label>
        <CustomTooltip innerText="Your form will be requested as your selected member order." />
      </Box>
      <DataTable
        columns={DepartmentMemberListsColumn}
        rows={
          <DepartmentMemberListsRow
            handleSelectChange={handleSelectChange}
            payload={department?.users}
          />
        }
      />
    </Box>
  );
};

export default DepartmentMemberLists;
