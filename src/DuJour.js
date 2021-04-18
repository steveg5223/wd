import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormRow from './FormRow';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));
  
  export default function DuJour(props) {
    const classes = useStyles();
    const isLoggedIn = props.response.isLoggedIn;
    const setDateWorn = props.setDateWorn;
    const setrequestedWatchId = props.setrequestedWatchId;
    let numPerRow; 
    switch (Math.floor(window.screen.availWidth / 500)) {
        case 0: numPerRow = 1; break; 
        case 1: numPerRow = 2; break; 
        case 2: numPerRow = 3; break; 
        default: numPerRow = 4; break;  
    }
    const watches = [];
    const inpuWatchList = props.response.watchList.slice();
    while (inpuWatchList.length > numPerRow) {
      watches.push(inpuWatchList.splice(0,numPerRow));
    };
    watches.push(inpuWatchList.splice(0,numPerRow));
  
    let rowKey = 0;
    return (
      <div className={classes.root}>
        <Grid container spacing={1}>
            {watches.map((chunk) => {
                return (
                    <Grid container item xs={12} spacing={3} key={rowKey++}>
                    <FormRow 
                    watches={chunk} 
                    xs={Math.floor(12 / numPerRow)} 
                    isLoggedIn={isLoggedIn}
                    setDateWorn={setDateWorn}
                    setrequestedWatchId={setrequestedWatchId}
                    />
                  </Grid>
                  );
            })}
        </Grid>
      </div>
    );
  }
  