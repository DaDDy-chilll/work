/* eslint-disable react/prop-types */
import { Checkbox, FormControlLabel, TableBody } from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../styled';
import { colors } from '../../assets/theme/theme';
import { Check } from '@mui/icons-material';

const DepartmentMemberListsRow = ({ payload, handleSelectChange }) => {
  console.log(payload[0].permissions);
  return (
    <TableBody>
      {payload &&
        payload.map((data) => (
          <StyledTableRow key={data?._id}>
            <StyledTableCell>
              <FormControlLabel
                control={<Checkbox />}
                disabled={false}
                value={data?._id}
                name="reviewer"
                onChange={({ target: { value, checked } }) =>
                  handleSelectChange({
                    userId: value,
                    userName: data?.name,
                    checked,
                    departmentId: data?.department._id,
                    departmentName: data?.department.name,
                  })
                }
              />
              {data?.name}
            </StyledTableCell>
            <StyledTableCell>
              {data?.permissions?.canApprove && (
                <Check
                  sx={{
                    color: colors.paleBlue[800],
                  }}
                />
              )}
            </StyledTableCell>
            <StyledTableCell>
              {data?.permissions?.canVerify && (
                <Check
                  sx={{
                    color: colors.paleBlue[800],
                  }}
                />
              )}
            </StyledTableCell>
            <StyledTableCell>
              {data?.permissions?.canPrepare && (
                <Check
                  sx={{
                    color: colors.paleBlue[800],
                  }}
                />
              )}
            </StyledTableCell>
            <StyledTableCell>
              {data?.permissions?.canEdit && (
                <Check
                  sx={{
                    color: colors.paleBlue[800],
                  }}
                />
              )}
            </StyledTableCell>
          </StyledTableRow>
        ))}
    </TableBody>
  );
};

export default DepartmentMemberListsRow;
