import Box from '@material-ui/core/Box'
import { Button } from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Paper from '@material-ui/core/Paper';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ProductSummary from './ProductSummary'

const useStyles = makeStyles((theme) => ({
    paper: {
        border: '1px solid',
        padding: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
    },
}));

const ShoppingCart = ({ chosenItems, handlePay }) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const [summarizedItems, setSummarizedItems] = useState({});
    useEffect(() => {
        if (chosenItems.length > 0) {
            chosenItems.map((item) => {
                const title = item.title;
                const price = item.price;
                const id = item.id;
                const summrizedTitles = Object.keys(summarizedItems);
                if (summrizedTitles.includes(title)) {
                    const quantity = summarizedItems[title].quantity + 1;
                    const tempObject = {
                        ...(summarizedItems[title]), quantity: quantity
                    };
                    setSummarizedItems({ ...summarizedItems, [title]: tempObject })
                }
                else {
                    setSummarizedItems({ ...summarizedItems, [title]: { 'id': id, 'title': title, 'quantity': 1, 'price': price } })
                }
            });
        }
    }, [chosenItems]);

    return (
        <Box left='80%'
            position="relative">
            <Button onClick={handleClick}>
                {Object.keys(summarizedItems).length > 0 ? <Paper>{Object.keys(summarizedItems).length}</Paper> : ''}
                <ShoppingCartIcon />{'Shopping cart '}
            </Button>
            <Popper id={id} open={open} anchorEl={anchorEl}>
                <Paper>{Object.keys(summarizedItems).length > 0 ? <ProductSummary summarizedItems={summarizedItems} handlePay={() => {
                    console.log(chosenItems);
                    console.log(`postOrder(${Object.keys(summarizedItems)})`);
                    handlePay();
                    setSummarizedItems({})
                }} /> : ''}
                </Paper>
            </Popper>
        </Box>
    )
}

export default ShoppingCart;