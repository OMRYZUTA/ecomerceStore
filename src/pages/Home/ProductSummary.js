import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import useCalculateSum from './CalculateSum'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const ProductSummary = ({ summarizedItems, handlePay }) => {
    const classes = useStyles();
    console.log('summarizedItems  =', summarizedItems);
    const sum = useCalculateSum(summarizedItems);

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                {Object.keys(summarizedItems).map((title) => {
                    return (
                        <Grid container key={title} justify='space-between'>
                            <Box component="div" display="inline" p={1} m={1} >
                                {title}
                            </Box>
                            <Box component="div" display="inline" p={1} m={1} justifyContent="center" >
                                ${summarizedItems[title].price}
                            </Box>
                            <Box component="div" display="inline" p={1} m={1} >
                                {summarizedItems[title].quantity}
                            </Box>
                        </Grid>

                    )
                })}
                <Grid container justify='space-between' display="flex">
                    <Box display="flex" align='start'>
                        Total
                    </Box>
                    <Box display="flex" align='end'>
                        {sum === null ? 'loading..' : sum}
                    </Box>
                </Grid>
            </CardContent>
            <CardActions onClick={
                handlePay
            }>
                <Button size="small">Pay</Button>
            </CardActions>
        </Card>
    );
}

export default ProductSummary;