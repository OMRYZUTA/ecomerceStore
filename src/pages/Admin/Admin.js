import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
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
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';

const SMALL = '100'
const LARGE = '170'
const columns = [
  { id: 'title', label: 'Title' },
  { id: 'price', label: 'Price' },
  { id: 'option', label: 'Option' }
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
  //http requests
  const [items, setItems] = useState([]);


  useEffect(() => {
    const fetchItems = async () => {
      const result = await axios(
        'http://127.0.0.1:8000/items/',
      );

      setItems(result.data.results);
    };

    fetchItems();
  }, []);

  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [open, setOpen] = useState(false);


  const handleClose = () => {
    setOpen(false);
    setItemProps(initialItemState);
  };

  const initialItemState = {
    price: null,
    title: "",
    description: "",
    image: ""
  };
  // http requests
  const postItem = (props) => {
    if (props) {
      console.log('post request got: ', props)
      const postCallback = async () => {
        await axios({
          method: 'post', url:
            'http://127.0.0.1:8000/items/', data: props
        }
        );
        console.log(items);
      };

      postCallback();
      console.log('posting item');
      setItemProps(initialItemState);
    }
  }
  const putItem = (props) => {
    if (props) {
      console.log('put request got: ', props)
      const putCallback = async () => {
        const result = await axios({
          method: 'PUT', url:
            `http://127.0.0.1:8000/items/${props.id}/`, data: props
        }
        );
        console.log(result);
      };

      putCallback();
    }
  }
  const deleteItem = (props) => {
    if (props) {
      console.log('delete request got: ', props)
      const deleteCallback = async () => {
        const result = await axios({
          method: 'DELETE', url:
            `http://127.0.0.1:8000/items/${props.id}/`, data: props
        }
        );

        console.log(result);
      };

      deleteCallback();
    }
  }


  const [dispatch, setDispatch] = useState(props => {
    postItem(props);
  });

  const [itemProps, setItemProps] = useState(initialItemState);


  const handleChange = e => {
    const name = e.target.id;
    const value = e.target.value;
    setItemProps(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditClick = rowID => {

    for (const i in items) {
      if (items[i].id === rowID) {
        setItemProps(items[i]);
      }
    }
    setDialogTitle('Edit');
    setDispatch(() => {
      return (
        props => {
          putItem(props);
          handleClose();
        });
    });
    console.log('dispatch', dispatch);
    setOpen(true);
  }
  const handleAddClick = () => {
    console.log('in add')
    setDialogTitle('Add');
    setOpen(true);
    setDispatch(() => {
      return (
        props => {
          postItem(props);
          handleClose();
        });
    });
    console.log('dispatch', dispatch);

  }

  const handleDeleteClick = rowID => {
    console.log('rowID',rowID);
    for (const i in items) {
      if (items[i].id === rowID) {
        deleteItem(items[i]);
      }
    }
  }

  const [dialog_Title, setDialogTitle] = useState('Add');
  return (
    <Paper className={classes.root}>
      <Button onClick={handleAddClick}>
        Add
     </Button>
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
            {items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={row.id}>
                  {  columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id}>
                        {(column.id !== 'option' && (column.id === 'price' || column.id === 'title'))
                          ? value
                          : <>
                            <Button onClick={() => {
                              handleEditClick(row.id);
                            }}>
                              Edit
                            </Button>
                            <Button onClick={() => {
                              handleDeleteClick(row.id);
                            }}>
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
        count={items.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{dialog_Title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please edit
          </DialogContentText>
          <TextField
            value={itemProps.title}
            autoFocus={true}
            id="title"
            margin="dense"
            label="Title"
            type="text"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            value={itemProps.price}
            id="price"
            label="Price"
            type="number"
            fullWidth
            onChange={handleChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
          <TextField
            margin="dense"
            value={itemProps.description}
            id="description"
            label="Description"
            type="text"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            value={itemProps.image}
            id="image"
            label="ImageURL"
            type="url"
            fullWidth
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {
            dispatch(itemProps);
          }} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}