import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Button } from '@material-ui/core'

export const ModalDialog = (dialog_Title, dispatch, open, handleClose) => {

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{dialog_Title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill all the fields
  </DialogContentText>
        <TextField
          autoFocus="true"
          required id="standard-required"
          margin="dense"
          label="Title"
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          id="standard-adornment-amount"
          label="Price"
          type="number"
          fullWidth
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <TextField
          margin="dense"
          id="name"
          label="Description"
          type="text"
          fullWidth
        />
        <TextField
          margin="dense"
          id="name"
          label="ImageURL"
          type="url"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
  </Button>
        <Button onClick={() => {
          dispatch(DialogContent.children).then(() => {
            handleClose();
          });
        }} color="primary">
          Submit
  </Button>
      </DialogActions>
    </Dialog>
  );
}