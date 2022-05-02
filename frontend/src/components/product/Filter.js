import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

const Filter = ({ filter, setFilter }) => {

  return (

    <FormControl variant="standard"  fullWidth sx={{ mb: 1 }}>
        <InputLabel>Sort</InputLabel>
        <Select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)} 
            style={{ fontSize: "13px" }}  
        >                                                                           
            <MenuItem value="all" style={{ fontSize: "13px" }}>  
                Latest
            </MenuItem>  
            <MenuItem value="popular" style={{ fontSize: "13px" }}>  
                Most Popular
            </MenuItem> 
            <MenuItem value="highToLow" style={{ fontSize: "13px" }}>  
                Price High to Low
            </MenuItem>
            <MenuItem value="lowToHigh" style={{ fontSize: "13px" }}>  
                Price Low to High
            </MenuItem>
        </Select>
    </FormControl>

  )

}

export default Filter