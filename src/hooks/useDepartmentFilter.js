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
      .map((item) => ({
        id: item._id,
        name: item.name
      }));
    setFilteredDepartments(filteredValue);
    setIsOpen(!isOpen);
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleCancel = () => {
    setFilteredDepartments([])
    handleChange({ name: 'clearAll' })
    setIsOpen(!isOpen);
  };

  const handleDelete = (id) => {
    const filteredValue = filteredDepartments.filter(department => department.id !== id)
    setFilteredDepartments(filteredValue)
  }

  return {
    isOpen,
    departments,
    filteredDepartments,
    setFilteredDepartments,
    search,
    searchedDepartments,
    handleSearch,
    handleFilter,
    handleCancel,
    handleChange,
    handleDelete
  };
};
