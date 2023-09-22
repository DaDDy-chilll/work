import { useEffect, useState } from 'react';
import { useGetAllDepartments } from '../api';

export const useDepartmentFilter = () => {
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  const { data: departmentData } = useGetAllDepartments({
    limit: 0,
  });
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    if (departmentData) {
      setDepartments(departmentData?.payload);
    }
  }, [departmentData]);

  const [search, setSearch] = useState('');

  const [searchedDepartments, setSearchedDepartments] = useState([]);

  const handleSearch = (value) => {
    setSearch(value);
    const searchedValue = departments.filter((department) => {
      return Object.values(department)
        .join(' ')
        .toLowerCase()
        .includes(value.toLowerCase());
    });
    setSearchedDepartments(searchedValue);
  };

  const handleChange = ({ name, checked }) => {
    if (name === 'clearAll') {
      let tempUser = departments.map((department) => {
        return { ...department, isChecked: false };
      });
      setDepartments(tempUser);
    } else {
      let tempUser = departments.map((department) =>
        department.name === name
          ? { ...department, isChecked: checked }
          : department,
      );
      setDepartments(tempUser);
      setSearchedDepartments(tempUser);
    }
  };

  const handleFilter = () => {
    const filteredValue = departments
      .filter((department) => department.isChecked === true)
      .map((item) => item._id);
    setFilteredDepartments(filteredValue);
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    departments,
    filteredDepartments,
    search,
    searchedDepartments,
    handleSearch,
    handleFilter,
    handleClick,
    handleChange,
  };
};
