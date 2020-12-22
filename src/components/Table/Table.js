import React, { useState } from 'react';
import {Table, TableHead, TableCell, TableRow, makeStyles, TablePagination, TableSortLabel} from '@material-ui/core'




const useStyles = makeStyles(theme =>({
    table: {
        marginTop: theme.spacing(3), 
        '& thead th': {
            fontWeight: '600', 
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light 
        }, 
        '& tbody td': {
            fontWeight: '300', 
        }, 
        '& tbody tr:hover':{
            backgroundColor:'#fffbf2', 
            cursor: 'pointer'
        }
    }
}))


export default function useTable(records, headCells) {

    const classes  = useStyles(); 

    const pages = [3,6,9]

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
    const [order, setOrder] = useState(); 
    const [orderBy, setOrderBy] = useState();

    // wrapper for material uI table 

    const TblContainer = props => (
        <Table className={classes.table}> 
            {props.children} 
            {/* // refers to all elements inside TblContainer */}
        </Table>
    )

    const TblHead = props => {

        const handleSortRequest = cellId => {
            const isAsc = orderBy === cellId && order === 'asc'
            setOrder(isAsc ? 'desc': 'asc')
            setOrderBy(cellId)
        }
        return (
            
            <TableHead>
                <TableRow>
                    {
                        headCells.map(headCell => (<TableCell key={headCell.id}>
                            <TableSortLabel
                                active={orderBy === headCell.id} // highlight column clicked on that was sorted by 
                                onClick = {() => {handleSortRequest(headCell.id)}}
                                direction ={ orderBy === headCell.id ? order : 'asc'}
                                > 
                                    {headCell.label}
                            </TableSortLabel>
                             </TableCell>
                             
                        ))
                    }
                </TableRow>
            </TableHead>
        )
    }

    const handleChangePage =(event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage =(event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    /* 
        .slice()  - get start and end index 
        
        start index 
            (page index) x (rows per page count )
            page 1 start = 0 x 5 = 0 
            page 2 start = 1 x 5 = 5 

        end index 
            (page index + 1) x (rows per page count )
            page 1 end = ( 0 + 1 ) x (5) = 5 
            page 2 end = ( 1 + 1 ) x (5) = 10 
    */

    const TblPagination = () => (<TablePagination 
        component="div"
        page={page}
        rowsPerPageOptions={pages}
        rowsPerPage={rowsPerPage}
        count={records.length}
        onChangePage={handleChangePage} // handles clicking on arrow? 
        onChangeRowsPerPage={handleChangeRowsPerPage}
        />
    )

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]); 
        stabilizedThis.sort((a,b) => {
            const order = comparator(a[0], b[0]); 
            if (order !== 0) return order; 
            return a[1] - b[1]
        }); 
        return stabilizedThis.map((el) => el[0])
    }

    function getComparator(order, orderBy) {
        return order === 'desc' 
        ? (a,b) => descendingComparator(a,b, orderBy) 
        : (a, b) => -descendingComparator(a,b, orderBy)
    }

    function descendingComparator(a,b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1; 
        }
        return 0;
    }

    const recordsAfterPagingAndSorting = () => {
        const start = page * rowsPerPage 
        const end = (page +1)*rowsPerPage
        return stableSort(records, getComparator(order, orderBy)).slice(start, end )
    }

    return {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    }
}