import { useState } from 'react';

export const useCustomeFilter = ({ initialValue }) => {
  const [optionValue, setOptionValue] = useState(initialValue);
  console.log('Option Value', optionValue);
  const handleOptionChange = (value) => {
    setOptionValue(value);
  };
  return { optionValue, handleOptionChange };
};
