/* eslint-disable react/prop-types */
import {
  Box,
  Checkbox,
  FormControlLabel,
  TableBody,
  Typography,
} from '@mui/material';
import { StyledTableCell, StyledTableRow } from '../styled';
import { colors } from '../../assets/theme/theme';
import { Check } from '@mui/icons-material';

const DepartmentMemberListsRow = ({
  payload,
  handleSelectChange,
  isDetail,
}) => {
  return (
    <TableBody>
      {payload &&
        payload.map((data) => (
          <StyledTableRow key={data?._id}>
            <StyledTableCell>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        '& .MuiSvgIcon-root': { fontSize: '20px' },
                      }}
                    />
                  }
                  disabled={isDetail}
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
                <Box>
                  <Typography
                    sx={{
                      fontSize: '14px',
                      fontWeight: 400,
                      color: colors.black[300],
                    }}
                  >
                    {data?.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '12px',
                      fontWeight: 400,
                      color: colors.grey[800],
                    }}
                  >
                    {data?.jobLabel}
                  </Typography>
                </Box>
              </Box>
            </StyledTableCell>
            <StyledTableCell>
              {data?.permissions?.canApprove && (
                <Check
                  sx={{
                    fontSize: '22px',
                    color: colors.paleBlue[800],
                  }}
                />
              )}
            </StyledTableCell>
            <StyledTableCell>
              {data?.permissions?.canVerify && (
                <Check
                  sx={{
                    fontSize: '22px',
                    color: colors.paleBlue[800],
                  }}
                />
              )}
            </StyledTableCell>
            <StyledTableCell>
              {data?.permissions?.canPrepare && (
                <Check
                  sx={{
                    fontSize: '22px',
                    color: colors.paleBlue[800],
                  }}
                />
              )}
            </StyledTableCell>
            <StyledTableCell>
              {data?.permissions?.canEdit && (
                <Check
                  sx={{
                    fontSize: '22px',
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
