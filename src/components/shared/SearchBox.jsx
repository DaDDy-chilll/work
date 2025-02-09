/* eslint-disable react/prop-types */
import { Cancel, Search } from '@mui/icons-material';
import { Box } from '@mui/material';
import { colors } from '../../assets/theme/theme';
import { useCallback, useState } from 'react';
import _debounce from 'lodash/debounce';

const SearchBox = ({ setSearch, placeholder }) => {
  const [value, setValue] = useState('');

  const handleCancel = () => {
    setValue('');
    setSearch('');
  };

  const debounceFn = useCallback(
    (value) => {
      _debounce(setSearch, 200)(value);
    },
    [setSearch]
  );
  
  const handleChange = (event) => {
    setValue(event.target.value);
    debounceFn(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      debounceFn(event.target.value);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Box sx={{ position: 'relative' }}>
        <input
          className="search_input"
          spellCheck="false"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onKeyUp={(e) => handleKeyPress(e)}
        />
        {value !== '' && (
          <div className="cancel_btn" onClick={handleCancel}>
            <Cancel sx={{ color: colors.grey[800], fontSize: '22px' }} />
          </div>
        )}
      </Box>
      <Box
        sx={{
          bgcolor: colors.paleBlue[800],
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '3rem',
          height: '3rem',
          cursor: 'pointer',
          borderTopRightRadius: '.5rem',
          borderBottomRightRadius: '.5rem',
        }}
        onClick={() => setSearch(value)}
      >
        <Search sx={{ fontSize: '1.5rem', color: colors.white[100] }} />
      </Box>
    </Box>
  );
};

export default SearchBox;
