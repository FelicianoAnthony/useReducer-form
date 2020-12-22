import React, { useState, useContext } from 'react';
import {Paper, makeStyles, TableBody, TableRow, TableCell} from '@material-ui/core';

import useTable from '../Table/Table';
import TableFilters from '../Table/TableFilters';

import {SidebarContext} from '../../contexts/SidebarContext'; 

import './Pmm.css';


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))

const headCells = [
    {id: 'hostname', label: 'Hostname', visible: true },
    {id: 'appService', label: 'Application Service', visible: true},
    {id: 'businessUnit', label: 'Business Unit', visible: true},
    {id: 'osType', label: 'OS Type', visible: true}
]

export default function Pmm() {
    const classes = useStyles()

    const initRecords = [
      {id: 1, hostname: 'server1', appService: 'AD', businessUnit: 'Technology Infrastructure', osType: 'Linux'},
      {id: 2, hostname: 'server2', appService: 'PMM', businessUnit: 'Technology Infrastructure', osType: 'Linux'},
      {id: 3, hostname: 'server3', appService: 'VAL', businessUnit: 'Technology Infrastructure', osType: 'Linux'},
      {id: 4, hostname: 'server4', appService: 'VAL', businessUnit: 'Technology Infrastructure', osType: 'Linux'},
      {id: 5, hostname: 'server5', appService: 'PMM', businessUnit: 'Technology Infrastructure', osType: 'Linux'},
      {id: 6, hostname: 'server6', appService: 'PMM', businessUnit: 'Technology Infrastructure', osType: 'Linux'},
    ]

    const [records, setRecords] = useState(initRecords)

    // use destructive syntax to get exports 
    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells )



    const {sidebar} = useContext(SidebarContext)


    return (
        <>  
        <div className={sidebar ? 'reports-menu active' : 'reports-menu'}>
            <Paper className={classes.pageContent}>
                <TableFilters headCells={headCells}/>
                <TblContainer>
                    <TblHead/>
                    <TableBody>
                        {recordsAfterPagingAndSorting().map(item => (
                            (<TableRow key={item.id}> 
                                <TableCell> {item.hostname} </TableCell>
                                <TableCell> {item.appService} </TableCell>
                                <TableCell> {item.businessUnit} </TableCell>
                                <TableCell> {item.osType} </TableCell>
                            </TableRow>
                            )
                        ))}
                    </TableBody>
                </TblContainer>
                <TblPagination/>
            </Paper>
        </div>
        </>
        
    )
}
