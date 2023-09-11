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
  // const [dates, setDates] = useState([])

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
    // console.log(dates);

    const queryArray = filteredDepartments.map((department, i) => {
      return "department=" + department
    })

    const concatString = queryArray.join('&')

    const accessToken = Cookies.get('accessToken')
    const fetchData = async () => {

      setPageState(old => ({ ...old, isLoading: true }))

      const { data } = await axios.get(`${documentRoute}?page=${pageState.page}&limit=${pageState.pageSize}&sort=-createdAt&search=${searchValue}&${concatString}`, {
        headers: {
          Authorization: "Bearer " + accessToken
        }
      })

      setPageState(old => ({ ...old, isLoading: false, data: data.payload, total: data.total }))
    }
    fetchData()
  }, [pageState.page, pageState.pageSize, searchValue, filteredDepartments])

  console.log(pageState.data);

  return (
    <Box mt="20px">

      <PageTitle title={"All Requests"} />

      <Box display="grid" width={"50%"} gap="40px" gridTemplateColumns="repeat(4, minmax(0, 1fr))" sx={{ display: "flex", justifyContent: "right", gap: 2 }}>
        <SearchBox search={searchValue} setSearch={setSearchValue} />
        {
          userData?.payload?.department?.type === 'authorized' && <Filter departments={departments} handleChange={handleChange} handleClick={handleClick} handleFilter={handleFilter} handleSearch={handleSearch} isOpen={isOpen} search={search} searchedDepartments={searchedDepartments} />
        }
        {/* <DateRangePicker dates={dates} setDates={setDates} /> */}
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
