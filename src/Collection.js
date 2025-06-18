import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormRow from './FormRow';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));
  
  export default function Collection(props) {
    const classes = useStyles();
    let numPerRow;
    const setDateWorn = props.setDateWorn;
    const setRequestedWatchId = props.setRequestedWatchId;
    const isLoggedIn = props.response.isLoggedIn;
    const { makes = [], selectedMake = 'All', handleMakeChange } = props;
    const watches = [];
    const inpuWatchList = props.response.watchList.slice();

    switch (Math.floor(window.screen.availWidth / 500)) {
        case 0: numPerRow = 1; break; 
        case 1: numPerRow = 2; break; 
        case 2: numPerRow = 3; break; 
        default: numPerRow = 4; break;  
    }

    while (inpuWatchList.length > numPerRow) {
      watches.push(inpuWatchList.splice(0,numPerRow));
    };
    watches.push(inpuWatchList.splice(0,numPerRow));
  
    let rowKey = 0;
    return (
      <div className={classes.root}>
        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" component="label" htmlFor="make-select" style={{paddingLeft: 8, paddingBottom: 0, marginRight: 8}}>
                Make
              </Typography>
              <FormControl style={{ minWidth: 200, margin: 0 }}>
                <Select
                  id="make-select"
                  value={selectedMake}
                  onChange={handleMakeChange}
                  style={{fontSize: '1rem'}}
                >
                  <MenuItem value="All"><Typography variant="body1">All</Typography></MenuItem>
                  {makes.map((make) => (
                    <MenuItem key={make} value={make}><Typography variant="body1">{make}</Typography></MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </Grid>
          <Grid item xs={12} />
          {watches.map((chunk) => {
              return (
                  <Grid container item xs={12} spacing={3} key={rowKey++}>
                  <FormRow 
                    watchlist={chunk} 
                    xs={Math.floor(12 / numPerRow)}
                    isLoggedIn={isLoggedIn}
                    setDateWorn={setDateWorn}
                    setRequestedWatchId={setRequestedWatchId}
                    />
                </Grid>
                );
          })}
        </Grid>
      </div>
    );
  }
  