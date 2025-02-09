import { FilterAlt } from '@mui/icons-material';
import { Checkbox, FormControlLabel, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { WORKFLOW_TYPES_LIST } from '../../constants/workflow';
import PropTypes from 'prop-types';

const WORKFLOW_TYPES_LISTS = Object.keys(WORKFLOW_TYPES_LIST).map((item) => ({
  text: WORKFLOW_TYPES_LIST[item],
  value: item,
}));

const WorkFlowTypeFilter = ({ setWorkflowType }) => {
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
    setWorkflowType('');
    setIsOpen(false);
  };

  useEffect(() => {
    if (selected.length === WORKFLOW_TYPES_LISTS.length) setWorkflowType('');
    else if (selected.length === 1) setWorkflowType(selected[0]);
    else setWorkflowType(selected);
  }, [selected, setWorkflowType]);

  return (
    <div className="filter_container min-w-[15rem]">
      <div
        className={`filter_select_btn ${isOpen && 'open'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="filter_select_btn_text">{ selected.length === 2 ? 'All' : WORKFLOW_TYPES_LIST[selected] || 'Filter By Workflow Type'}</span>
        <span className="filter_select_arrow_down">
          <FilterAlt />
        </span>
      </div>

      <ul className="filter_list_items">
        <Button onClick={clearAll}>Clear All</Button>
        {WORKFLOW_TYPES_LISTS.map((item) => (
          <li className="filter_item" key={item.value}>
            <FormControlLabel
              name={item.text}
              control={<Checkbox />}
              label={item.text}
              checked={selected.includes(item.value)}
              onChange={() => handleChange(item.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

WorkFlowTypeFilter.propTypes = {
  setWorkflowType: PropTypes.func.isRequired,
};

export default WorkFlowTypeFilter;
