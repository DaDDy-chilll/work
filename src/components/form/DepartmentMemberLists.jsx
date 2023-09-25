/* eslint-disable react/prop-types */
import CustomTooltip from '../shared/CustomTooltip';
import { Box } from '@mui/material';
import DataTable from '../ui/DataTable';
import { DepartmentMemberListsColumn } from '../column/DepartmentMemberListsColumn';
import DepartmentMemberListsRow from '../row/DepartmentMemberListsRow';
import CustomFormLabel from '../shared/CustomFormLabel';

const DepartmentMemberLists = ({
  department,
  handleSelectChange,
  isDetail,
}) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <CustomFormLabel
          label={`${isDetail ? '' : 'Select'} ${department.name}`}
        />
        <CustomTooltip innerText="Your form will be requested as your selected member order." />
      </Box>
      <DataTable
        columns={DepartmentMemberListsColumn}
        rows={
          <DepartmentMemberListsRow
            handleSelectChange={handleSelectChange}
            payload={department?.users}
            isDetail={isDetail}
          />
        }
      />
    </Box>
  );
};

export default DepartmentMemberLists;
