import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { ModalStyled } from './style'

const SMALL = '100'
const LARGE = '170'

const columns = [
  { id: 'title', label: 'Title' },
  { id: 'price', label: 'Price' },
  { id: 'option', label: 'Option'}
];

function createData(title, rawPrice) {
  const price = '$' + rawPrice.toFixed(2)
  return {
    title, price
  };
}

const rows = [
  createData('shirt', 22.5),
  createData('Pants', 24.5),
  createData('Brush', 26.5),
  createData('Mouse', 29),
  createData('Computer', 2.5),
  createData('Jeans', 26.9),
  createData('Screen', 20),
  createData('Chair', 12),
  createData('Headphones', 12),
  createData('Earpods', 5),
  createData('Hat', 3.5),
  createData('Egg', 2.5),
  createData('Jam', 2.5),
  createData('Ball', 25.5),
  createData('Car', 28.5),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function Admin() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.label === 'Price' ? SMALL : LARGE }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.code}>
                  {console.log('columns: ', columns) || columns.map((column) => {
                    console.log('column: ', column)
                    console.log('column.id: ', column.id)
                    console.log('row: ', row)
                    const value = row[column.id];
                    console.log('value: ', value)
                    console.log('value: ', value)
                    // row['option']
                    // row['price']
                    console.log('column.format: ', column.format)
                    return (
                      <TableCell key={column.id}>
                        {column.id !== 'option'
                          ? value
                          : <>
                              <Button onClick={() => console.log('hi')}>
                                Edit
                              </Button>
                              <Button>
                                Delete
                              </Button>
                            </>}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <ModalStyled open>
        <div>Modal</div>
      </ModalStyled>
    </Paper>
  );
}