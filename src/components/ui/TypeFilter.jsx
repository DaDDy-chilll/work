import { FilterAlt } from '@mui/icons-material';
import { Button, Checkbox, FormControlLabel } from '@mui/material';
import { useState, useEffect } from 'react';
import { TYPE_LIST } from '../../constants/workflow';
import PropTypes from 'prop-types';

const TYPE_LISTS = Object.keys(TYPE_LIST).map((item) => ({
  text: TYPE_LIST[item],
  value: item,
}));

const TypeFilter = ({ setType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  const handleChange = (value) => {
    setSelected((prev) => {
      const isSelected = prev.includes(value);
      if (isSelected) return prev.filter((item) => item !== value);
      else return [...prev, value];
    });
    setIsOpen(false);
  };

  const clearAll = () => {
    setSelected([]);
    setIsOpen(false);
  };

  useEffect(() => {
    if (selected.length === TYPE_LISTS.length) setType('');
    else if (selected.length === 1) setType(selected[0]);
    else setType(selected);
  }, [selected, setType]);


  return (
    <div className="filter_container min-w-[12rem]">
      <div
        className={`filter_select_btn ${isOpen && 'open'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="filter_select_btn_text">
          {selected.length === 2
            ? 'All'
            : selected.length === 1
            ? selected[0]
            : 'Filter By Type'}
        </span>
        <span className="filter_select_arrow_down">
          <FilterAlt />
        </span>
      </div>

      <ul className="filter_list_items">
        <Button onClick={clearAll}>Clear All</Button>
        <li className="filter_item">
          <FormControlLabel
            name="Normal"
            control={<Checkbox />}
            label="Normal"
            checked={selected.includes('Normal')}
            onChange={() => handleChange('Normal')}
          />
        </li>
        <li className="filter_item">
          <FormControlLabel
            name="Authorized"
            control={<Checkbox />}
            label="Authorized"
            checked={selected.includes('Authorized')}
            onChange={() => handleChange('Authorized')}
          />
        </li>
      </ul>
    </div>
  );
};

TypeFilter.propTypes = {
  setType: PropTypes.func.isRequired,
};

export default TypeFilter;
