import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'

const Search = ({ isSearchVisible }) => {

    const navigate = useNavigate()    
    const [ keyword, setKeyword ] = useState('')    

    const searchHandler = (e) => {
        if (e._reactName === 'onSubmit'){
            e.preventDefault()  
        }           
        if(keyword.trim()) {
            navigate(`/gallery/${keyword}`)
        } else {
            navigate('/gallery')
        }
    }

    return (

        <form 
            onSubmit={searchHandler} 
            className={isSearchVisible ? "searchform d-flex open" : "searchform d-flex"}
        >            

            <input 
                placeholder="Search Site" 
                value={keyword}
                onChange={e =>setKeyword(e.target.value)} 
            /> 

            <IconButton type="submit">
                <SearchIcon />
            </IconButton>
            
        </form>

    )

}

export default Search
