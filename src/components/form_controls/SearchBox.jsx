import { Search } from '@mui/icons-material'
import React from 'react'
import './Filter.css'

const SearchBox = ({ search, setSearch }) => {
    return (
        <div className="select_search" style={{ width: '1000px' }}>
            <Search className='search_icon' />
            <input spellCheck="false" type="text" placeholder="Search Title" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
    )
}

export default SearchBox