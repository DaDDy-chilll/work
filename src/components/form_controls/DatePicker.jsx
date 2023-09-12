import React from 'react'
import { DateRangePicker } from 'react-date-range';
import './DatePicker.css'
import { CalendarToday } from '@mui/icons-material';
import { format } from 'date-fns'

const DatePicker = ({ openDate, date, setOpenDate, handleDateChange }) => {
  return (
    <div className="date_container">
      <div className='date_calendar' onClick={() => setOpenDate(prev => !prev)}>
        {`${format(date.startDate, 'dd MMM yyyy')} - ${format(date.endDate, 'dd MMM yyyy')}`}
        <CalendarToday />
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