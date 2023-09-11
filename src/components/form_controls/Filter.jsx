import React from 'react'
import './Filter.css'
import { FilterAlt, Search } from '@mui/icons-material'
import { Box, Button, Checkbox, FormControlLabel } from '@mui/material'

const calculateCount = (departments) => {
  return departments.filter(department => department.isChecked === true).length
}

const Filter = ({ search, departments, searchedDepartments, handleSearch, handleClick, handleFilter, handleChange, isOpen }) => {
  return (
    <div className="select_container">
      <div className={`select-btn ${isOpen && 'open'}`} onClick={handleClick}>
        <span className="btn-text">
          {
            calculateCount(departments) === 0 ? "Filter By Department" : `${calculateCount(departments)} Departments Selected`
          }
        </span>
        <span className="arrow-dwn">
          <FilterAlt />
        </span>
      </div>

      <ul className="list-items">
        <div className="select_search">
          <Search className='search_icon' />
          <input spellCheck="false" type="text" placeholder="Search" value={search} onChange={(e) => handleSearch(e.target.value)} />
        </div>
        <Button onClick={() => handleChange({ name: "clearAll" })}>Clear All</Button>
        {
          search === '' ?
            departments.map(department => {
              return <li className="item" key={department._id}>
                <FormControlLabel
                  name={department.name}
                  control={<Checkbox />}
                  label={department.name}
                  checked={department?.isChecked || false}
                  onChange={({ target: { name, checked } }) => handleChange({ name, checked, items: departments })}
                />
              </li>
            }) : searchedDepartments.map(department => (
              <li className="item" key={department._id}>
                <FormControlLabel
                  name={department.name}
                  control={<Checkbox />}
                  label={department.name}
                  checked={department?.isChecked || false}
                  onChange={({ target: { name, checked } }) => handleChange({ name, checked, items: searchedDepartments })}
                />
              </li>
            ))
        }
        <Box display="flex" justifyContent="center" gap={2}>
          <Button onClick={handleClick} fullWidth variant='outlined'>Cancel</Button>
          <Button onClick={handleFilter} fullWidth variant='contained'>OK</Button>
        </Box>
      </ul>
    </div>
  )
}

export default Filter