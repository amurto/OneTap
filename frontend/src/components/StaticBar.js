import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import click from './click.png';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));

const StaticBar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                <img src={click} alt="OneTap" />
                <Typography variant="h6" className={classes.title} style={{ marginLeft: "15px" }}>
                    OneTap
                </Typography>
                <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default StaticBar;