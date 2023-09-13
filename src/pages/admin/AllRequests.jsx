import { Box, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { getColumns } from '../../columns/Document.columns'
import DataTable from '../../components/tables/DataTable'
import PageTitle from '../../components/mains/PageTitle'
import Cookies from 'js-cookie'
import axios from 'axios'
import { documentRoute } from '../../utils/APIRoutes'
import SearchBox from '../../components/form_controls/SearchBox'
import Filter from '../../components/form_controls/Filter'
import { useGetDepartmentsQuery } from '../../services/departmentSlice'
import { useGetMyInfoQuery } from '../../services/userSlice'
import DatePicker from '../../components/form_controls/DatePicker'
import { transformDate } from '../../helpers'

const AllRequests = () => {
  const { data: userData } = useGetMyInfoQuery()

  // search
  const [searchValue, setSearchValue] = useState('')

  // filter by department
  const [filteredDepartments, setFilteredDepartments] = useState([])

  const { data: departmentData } = useGetDepartmentsQuery()
  const [departments, setDepartments] = useState([])

  useEffect(() => {
    if (departmentData) {
      setDepartments(departmentData?.payload)
    }
  }, [departmentData])

  const [search, setSearch] = useState('')

  const [searchedDepartments, setSearchedDepartments] = useState([])

  const handleSearch = (value) => {
    setSearch(value);
    const searchedValue = departments.filter((department) => {
      return Object.values(department).join(" ").toLowerCase().includes(value.toLowerCase())
    })
    setSearchedDepartments(searchedValue)
  }

  const handleChange = ({ name, checked }) => {
    if (name === "clearAll") {
      let tempUser = departments.map((department) => {
        return { ...department, isChecked: false };
      });
      setDepartments(tempUser);
    } else {
      let tempUser = departments.map((department) =>
        department.name === name ? { ...department, isChecked: checked } : department
      );
      setDepartments(tempUser);
      setSearchedDepartments(tempUser);
    }
  };

  const handleFilter = () => {
    const filteredValue = departments.filter((department) => (department.isChecked === true))
      .map(item => (item._id))
    setFilteredDepartments(filteredValue)
  }

  const [isOpen, setIsOpen] = useState(false)
  const handleClick = () => {
    setIsOpen(!isOpen)
  }

  // date range
  const [date, setDate] = useState({
    startDate: null,
    endDate: null,
    key: 'selection',
  })

  const [openDate, setOpenDate] = useState(false)

  const handleDateChange = (ranges) => {
    setDate(ranges.selection);
  }

  const handleRemoveDate = () => {
    setDate({
      startDate: null,
      endDate: null,
      key: 'selection',
    })
  }

  // --------------------------------------------------------
  const columns = getColumns()

  const [pageState, setPageState] = useState({
    isLoading: true,
    data: undefined,
    total: 0,
    page: 1,
    pageSize: 10
  })

  useEffect(() => {
    const startDateQuery = date.startDate ? transformDate(date.startDate) : ""
    const endDateQuery = date.endDate ? transformDate(date.endDate) : ""

    const queryArray = filteredDepartments.map((department, i) => {
      const query = "department=" + department;
      return i === 0 ? "&" + query : query
    })

    const concatString = queryArray.join('&')

    const accessToken = Cookies.get('accessToken')
    const fetchData = async () => {

      setPageState(old => ({ ...old, isLoading: true }))

      const { data } = await axios.get(`${documentRoute}?page=${pageState.page}&limit=${pageState.pageSize}&sort=-createdAt&search=${searchValue}${concatString}${date.startDate && date.startDate ? `&startDate=${startDateQuery}&endDate=${endDateQuery}` : ""}`, {
        headers: {
          Authorization: "Bearer " + accessToken
        }
      })

      setPageState(old => ({ ...old, isLoading: false, data: data.payload, total: data.total }))
    }
    fetchData()
  }, [pageState.page, pageState.pageSize, searchValue, date, filteredDepartments])

  return (
    <Box mt="20px">

      <PageTitle title={"All Requests"} />

      <Box sx={{ display: "flex", alignItems: 'center', gap: 2 }}>
        <SearchBox search={searchValue} setSearch={setSearchValue} />
        {
          userData?.payload?.department?.type === 'authorized' && <Filter departments={departments} handleChange={handleChange} handleClick={handleClick} handleFilter={handleFilter} handleSearch={handleSearch} isOpen={isOpen} search={search} searchedDepartments={searchedDepartments} />
        }
        <DatePicker date={date} openDate={openDate} setOpenDate={setOpenDate} handleDateChange={handleDateChange} handleRemoveDate={handleRemoveDate} />
      </Box>

      <ToastContainer />

      {/* {content} */}

      {
        pageState.data ?
          <DataTable
            rows={pageState.data}
            rowCount={pageState.total}
            loading={pageState.isLoading}
            page={pageState.page - 1}
            pageSize={pageState.pageSize}
            onPageChange={(newPage) => {
              setPageState(old => ({ ...old, page: newPage + 1 }))
            }}
            onPageSizeChange={(newPageSize) => setPageState(old => ({ ...old, pageSize: newPageSize }))}
            columns={columns}
          /> :
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
          </Box>
      }

    </Box>
  )
}

export default AllRequests
