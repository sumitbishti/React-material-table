import React from 'react';
import { useGlobalContext } from './Context';
import { useFetch } from './useFetch';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const url = 'https://jsonplaceholder.typicode.com/users';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const UserTable = () => {
      const classes = useStyles();
    const{isLoading, isError, users} = useGlobalContext();
    useFetch(url);

    if(isLoading){
        return <h1>Loading...</h1>
    }
    if(isError){
        return <h1>Error!!!</h1>
    }
    return <div>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>NAME</StyledTableCell>
            <StyledTableCell>USERNAME</StyledTableCell>
            <StyledTableCell>EMAIL</StyledTableCell>
            <StyledTableCell>PHONE</StyledTableCell>
            <StyledTableCell>WEBSITE</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {users.map((user)=>{
                const{id,name,username,email,phone,website} = user;
                return (
                    <StyledTableRow key={id}>
                        <StyledTableCell>{id}</StyledTableCell>
                        <StyledTableCell>{name}</StyledTableCell>
                        <StyledTableCell>{username} </StyledTableCell>
                        <StyledTableCell>{email} </StyledTableCell>
                        <StyledTableCell>{phone} </StyledTableCell>
                        <StyledTableCell>{website} </StyledTableCell>
                    </StyledTableRow>
                )
            })}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
}

export default UserTable;