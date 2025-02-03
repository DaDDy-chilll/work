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

            {/* Approve */}
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

            {/* Authorize */}
            <StyledTableCell>
              {data?.permissions?.canAuthorize && (
                <Check
                  sx={{
                    fontSize: '22px',
                    color: colors.paleBlue[800],
                  }}
                />
              )}
            </StyledTableCell>

            {/* Verify */}
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


            {/* Edit */}
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

            {/* Normal Return */}
            <StyledTableCell>
              {data?.permissions?.canNormalReturn && (
                <Check
                  sx={{
                    fontSize: '22px',
                    color: colors.paleBlue[800],
                  }}
                />
              )}
            </StyledTableCell>

            {/* Advance Return */}
            <StyledTableCell>
              {data?.permissions?.canAdvanceReturn && (
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
