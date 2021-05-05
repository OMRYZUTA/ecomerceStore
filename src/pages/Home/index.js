import React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Box from '@material-ui/core/Box'
import Items from '../../services/GetAllItems';
import ProductCard from './ProductCard';
import ShoppingCart from './ShoppingCart';


const Index = () => {
	const items = Items();
	const [chosenItems, setChosenItems] = useState([]);
	return (
		<Container>
			<ShoppingCart chosenItems={chosenItems}/>
			<Grid container>
				{items.map(item => (
					<Grid item key={item.id} xs={12} sm={6} md={3}>
						<ProductCard item={item} />
					</Grid>
				))}
			</Grid>
		</Container>
	)
}

export default Index;
