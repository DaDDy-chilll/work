/* eslint-disable react/prop-types */
import { CalendarToday, Cancel } from '@mui/icons-material';
import { Box } from '@mui/material';
import { format } from 'date-fns';
import { DateRangePicker } from 'react-date-range';
import { colors } from '../../assets/theme/theme';

const DateRangeFilter = ({
  openDate,
  date,
  setOpenDate,
  handleDateChange,
  handleRemoveDate,
}) => {
  return (
    <div className="date_range_container">
      <div className="date_range_calendar">
        {date.startDate && date.endDate
          ? `${format(date.startDate, 'dd MMM yyyy')} - ${format(
              date.endDate,
              'dd MMM yyyy',
            )}`
          : 'Select Date Range'}
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {date.startDate && date.endDate && (
            <div onClick={handleRemoveDate}>
              <Cancel sx={{ color: colors.grey[800] }} />
            </div>
          )}
          <div onClick={() => setOpenDate((prev) => !prev)}>
            <CalendarToday />
          </div>
        </Box>
      </div>
      {openDate && (
        <DateRangePicker
          className="date_range"
          ranges={[date]}
          onChange={handleDateChange}
        />
      )}
    </div>
  );
};

export default DateRangeFilter;
