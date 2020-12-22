import React, {useState, useEffect} from 'react';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
import {TextField, InputLabel, Select, FormControl, makeStyles, FormHelperText, MenuItem} from '@material-ui/core';

import './TableFilters.css'

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    border: 'solid 1px'
  },
}));

const TableFilters = (props) => {

  const {headCells} = props 

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(headCells);

  const [filters, setFilters] = useState([])


  const handleChange = (event) => {

    setFilters(filters.concat([
      <SearchFilter
        filterName={event.target.value}
      >
      </SearchFilter>
    ]))
    setSelected(headCells.filter((headCell) => (headCell.id === event.target.value)))
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  

  const handleRemoveFilter = (e) => {

    console.log(`remove filter = ${e.target.value}`)
  }

  // useEffect(() => { 
  // })



  return (
    
    <div className='table-filters-row'>

      {!filters.length ?
        <div className='table-filters-left'> no filters applied  </div>
          : 
        <div className='table-filters-left'>
          <FormControl>
            {filters.map((filter,index) => {
              return (
                <div style={{border: 'solid 1px'}}onClick={handleRemoveFilter} value={filter} key={index}> {filter} </div>
              )
            })}
          </FormControl>
        </div>
      }

        <div className='table-filters-right'> 
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-controlled-open-select-label">Filter</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={selected.id}
              onChange={handleChange}
            >
              {headCells.map((headCell, index) => {
                  return (<MenuItem value={headCell.id} key={index} >{headCell.label}</MenuItem>  )
              })}
            </Select>
          </FormControl>
        </div>

      </div>

  )
}



const SearchFilter = (props) => {
  
  console.log(`search filter props - ${props}`)
  return ( 
    <TextField id="standard-basic" label={props.filterName} />
  )

}


export default TableFilters