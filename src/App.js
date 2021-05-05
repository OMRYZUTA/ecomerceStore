import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Admin from './pages/Admin/Admin';
import Home from './pages/Home/';
import Stats from './pages/Stats';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({});

export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Navbar />
      <Switch>
        <Route
          exact
          from='/'
          render={props => <Home {...props} />}
        />
        <Route exact path='/home' render={props => <Home {...props} />} />
        <Route exact path='/admin' render={props => <Admin {...props} />} />
        <Route exact path='/stats' render={props => <Stats {...props} />} />
      </Switch>
    </div>
  );
}