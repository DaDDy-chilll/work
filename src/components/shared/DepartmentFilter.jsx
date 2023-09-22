/* eslint-disable react/prop-types */
import { FilterAlt, Search } from '@mui/icons-material';
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material';

const calculateCount = (departments) => {
  return departments.filter((department) => department.isChecked === true)
    .length;
};

const DepartmentFilter = ({
  isOpen,
  onOpen,
  onClose,
  departments,
  search,
  searchedDepartments,
  handleSearch,
  handleFilter,
  handleChange,
}) => {
  return (
    <div className="filter_container">
      <div
        className={`filter_select_btn ${isOpen && 'open'}`}
        onClick={isOpen ? onClose : onOpen}
      >
        <span className="filter_select_btn_text">
          {calculateCount(departments) === 0
            ? 'Filter By Department'
            : `${calculateCount(departments)} Departments Selected`}
        </span>
        <span className="filter_select_arrow_down">
          <FilterAlt />
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
        </div>
        <Button onClick={() => handleChange({ name: 'clearAll' })}>
          Clear All
        </Button>
        {search === ''
          ? departments.map((department) => {
              return (
                <li className="filter_item" key={department._id}>
                  <FormControlLabel
                    name={department.name}
                    control={<Checkbox />}
                    label={department.name}
                    checked={department?.isChecked || false}
                    onChange={({ target: { name, checked } }) =>
                      handleChange({ name, checked, items: departments })
                    }
                  />
                </li>
              );
            })
          : searchedDepartments.map((department) => (
              <li className="filter_item" key={department._id}>
                <FormControlLabel
                  name={department.name}
                  control={<Checkbox />}
                  label={department.name}
                  checked={department?.isChecked || false}
                  onChange={({ target: { name, checked } }) =>
                    handleChange({ name, checked, items: searchedDepartments })
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

export default DepartmentFilter;
