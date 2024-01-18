import { useState } from 'react';

export const useCustomeFilter = ({ initialValue }) => {
  const [optionValue, setOptionValue] = useState(initialValue);

  const handleOptionChange = (value) => {
    setOptionValue(value);
  };

  return { optionValue, handleOptionChange };
};
