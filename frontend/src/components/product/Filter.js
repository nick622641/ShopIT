import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

const Filter = ({ filter, setFilter }) => {

  return (

    <FormControl variant="standard"  fullWidth sx={{ mb: 1 }}>
        <InputLabel>Sort</InputLabel>
        <Select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}   
        >                                                                           
            <MenuItem value="all">  
                Latest
            </MenuItem>  
            <MenuItem value="popular">  
                Most Popular
            </MenuItem> 
            <MenuItem value="highToLow">  
                Price High to Low
            </MenuItem>
            <MenuItem value="lowToHigh">  
                Price Low to High
            </MenuItem>
        </Select>
    </FormControl>

  )

}

export default Filter