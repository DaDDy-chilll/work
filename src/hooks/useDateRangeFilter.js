import { useState } from 'react';

export const useDateRangeFilter = () => {
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
    key: 'selection',
  });

  const [openDate, setOpenDate] = useState(false);

  const handleDateChange = (ranges) => {
    setDate(ranges.selection);
  };

  const handleRemoveDate = () => {
    setDate({
      startDate: null,
      endDate: null,
      key: 'selection',
    });
  };

  return { date, openDate, setOpenDate, handleDateChange, handleRemoveDate };
};
