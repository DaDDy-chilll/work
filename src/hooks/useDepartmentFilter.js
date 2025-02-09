import { useEffect, useState } from 'react';
import { useGetAllDepartments } from '../api';
import { useDisclosure } from './useDisclosure';

export const useDepartmentFilter = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  // FETCH ALL DEPARTMENTS FROM API
  const { data: departmentData } = useGetAllDepartments({
    limit: 0,
  });

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    if (departmentData) {
      setDepartments(departmentData?.payload);
    }
  }, [departmentData]);

  // SEARCH
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

  // SEARCH CANCEL
  const handleSearchCancel = () => {
    setSearch('')
  }

  const [filteredDepartments, setFilteredDepartments] = useState([]);

    // FILTER BOX OK BUTTON
    const handleFilter = () => {
      const filteredValue = departments
        .filter((department) => department.isChecked === true)
        .map((item) => ({
          id: item._id,
          name: item.name
        }));
      setFilteredDepartments(filteredValue);
    };

  // HANDLE CHECKBOX
  const handleChange = ({ name, checked }) => {
    let tempUser;
    if (name === 'clearAll') {
       tempUser = departments.map((department) => {
        return { ...department, isChecked: false };
      });
      setDepartments(tempUser);
    } else {
       tempUser = departments.map((department) =>
        department.name === name
          ? { ...department, isChecked: checked }
          : department,
      );
      setDepartments(tempUser);
      setSearchedDepartments(tempUser);
    }
    const filteredValue = tempUser.filter((department) => department.isChecked === true)
        .map((item) => ({
          id: item._id,
          name: item.name
        }));
      setFilteredDepartments(filteredValue);
      onClose()
  };



  // DELETE CHIP
  const handleDelete = ({ id, name }) => {
    const filteredValue = filteredDepartments.filter(department => department.id !== id)
    setFilteredDepartments(filteredValue)
    handleChange({ name, checked: false, items: departments })
  }

  // (CLEAR ALL) CHIP
  const handleClearAll = () => {
    onClose()
    setFilteredDepartments([])
    handleChange({ name: 'clearAll' })
  }

  return {
    isOpen,
    onOpen,
    onClose,
    departments,
    filteredDepartments,
    setFilteredDepartments,
    search,
    searchedDepartments,
    handleSearch,
    handleSearchCancel,
    handleFilter,
    handleClearAll,
    handleChange,
    handleDelete
  };
};
