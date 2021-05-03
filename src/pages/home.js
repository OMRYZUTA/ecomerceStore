import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		height: 140,
		width: 100,
	},
	control: {
		padding: theme.spacing(2),
	},
}));

export default function SpacingGrid() {
	const classes = useStyles();

	return (
		<Grid container className={classes.root} >
			<Grid item xs={12}>
				<Grid container justify='center' >
					{[0, 1, 2].map((value) => (
						<Grid key={value} item>
							<Paper className={classes.paper} />
						</Grid>
					))}
				</Grid>
			</Grid>

		</Grid>
	);
}
