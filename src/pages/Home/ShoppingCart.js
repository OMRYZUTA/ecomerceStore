import Box from '@material-ui/core/Box'
import { Button } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';

const useStyles = makeStyles((theme) => ({
    paper: {
        border: '1px solid',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
    },
}));

const ShoppingCart = (chosenItems) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
    return (
        <Box left='80%'
            position="relative">
            <Button onClick={handleClick}>
                <ShoppingCartIcon />{'Shopping cart '}
                <Paper>{ }</Paper>
            </Button>
            <Popper id={id} open={open} anchorEl={anchorEl}>
                <div className={classes.paper}>The content of the Popper.</div>
            </Popper>
        </Box>
    )
}

export default ShoppingCart;