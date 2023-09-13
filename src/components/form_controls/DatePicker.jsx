import React from 'react'
import { DateRangePicker } from 'react-date-range';
import './DatePicker.css'
import { CalendarToday, Cancel } from '@mui/icons-material';
import { format } from 'date-fns'
import { Box } from '@mui/material';
import { colors } from '../../utils/theme';

const DatePicker = ({ openDate, date, setOpenDate, handleDateChange, handleRemoveDate }) => {
  return (
    <div className="date_container">
      <div className='date_calendar' onClick={() => setOpenDate(prev => !prev)}>
        {
          date.startDate && date.endDate ? `${format(date.startDate, 'dd MMM yyyy')} - ${format(date.endDate, 'dd MMM yyyy')}` : 'Select Date Range'
        }
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {
            date.startDate && date.endDate && (
              <div onClick={handleRemoveDate}>
                <Cancel sx={{ color: colors.grey[400] }} />
              </div>
            )
          }
          <CalendarToday />
        </Box>
      </div>
      {
        openDate && <DateRangePicker
          className='dateRange'
          ranges={[date]}
          onChange={handleDateChange}
        />
      }
    </div>
  )
}

export default DatePicker