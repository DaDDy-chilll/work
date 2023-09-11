import React from 'react'
import { DatePicker } from 'antd';
import moment from 'moment';
import { colors } from '@mui/material';
const { RangePicker } = DatePicker;

const DateRangePicker = ({ dates, setDates }) => {
  return (
    <RangePicker
      style={{ width: "1000px", background: colors.blueGrey }}
      onChange={(values) => {
        console.log({ values });
        setDates(values.map(item => {
          return moment(item).format('YYYY-DD-MM')
        }))
      }}
    />
  )
}

export default DateRangePicker