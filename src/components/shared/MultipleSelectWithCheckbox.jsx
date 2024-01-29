/* eslint-disable react/prop-types */
import { Cancel, Search } from '@mui/icons-material';
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import { colors } from '../../assets/theme/theme';
import { useMultipleSelectWithCheckbox } from '../../hooks';

const calculateCount = (departments) => {
  return departments.filter((department) => department.isChecked === true)
    .length;
};

const MultipleSelectWithCheckbox = ({ data, setFieldValue, field }) => {
  const {
    isOpen,
    onClose,
    onOpen,
    handleChange,
    handleFilter,
    handleSearch,
    handleSearchCancel,
    items,
    search,
    searchedItems,
  } = useMultipleSelectWithCheckbox({ data, setFieldValue, field });

  return (
    <div className="filter_container" style={{ maxWidth: '100%' }}>
      <div
        className={`filter_select_btn ${isOpen && 'open'}`}
        onClick={isOpen ? onClose : onOpen}
      >
        <span className="filter_select_btn_text">
          {calculateCount(items) === 0
            ? 'Please select Name which you would like to mention'
            : `${calculateCount(items)} Users Selected`}
        </span>
      </div>

      <ul className="filter_list_items">
        <div className="filter_search">
          <Search className="filter_search_icon" />
          <input
            spellCheck="false"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {search !== '' && (
            <div
              className="filter_search_cancel_btn"
              onClick={handleSearchCancel}
            >
              <Cancel sx={{ color: colors.grey[800] }} />
            </div>
          )}
        </div>
        <Button onClick={() => handleChange({ name: 'clearAll' })}>
          Clear All
        </Button>
        {search === ''
          ? items.map((department) => {
              return (
                <li className="filter_item" key={department._id}>
                  <FormControlLabel
                    name={department.name}
                    control={<Checkbox />}
                    label={department.name}
                    checked={department?.isChecked || false}
                    onChange={({ target: { name, checked } }) =>
                      handleChange({ name, checked, items })
                    }
                  />
                </li>
              );
            })
          : searchedItems.map((department) => (
              <li className="filter_item" key={department._id}>
                <FormControlLabel
                  name={department.name}
                  control={<Checkbox />}
                  label={department.name}
                  checked={department?.isChecked || false}
                  onChange={({ target: { name, checked } }) =>
                    handleChange({ name, checked, items: searchedItems })
                  }
                />
              </li>
            ))}
        <Box display="flex" justifyContent="center" gap={2}>
          <Button onClick={onClose} fullWidth variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleFilter} fullWidth variant="contained">
            OK
          </Button>
        </Box>
      </ul>
    </div>
  );
};

export default MultipleSelectWithCheckbox;
