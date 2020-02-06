import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PieChart from './PieChart';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

const Landing = () => {
    return (
            <Container style={{ marginTop: "50px" }}>
              <PieChart />
        </Container>
    )
}

export default Landing; 
