import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormRow from './FormRow';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
  }));
  
  export default function DuJour(props) {
    const classes = useStyles();
    const isLoggedIn = props.response.isLoggedIn;
    const {setDateWorn, setRequestedWatchId} = props;
    const [order, setorder] = React.useState(true);
  
    const handleChangeOrder = (event) => {
      setorder(!order);
    };

    let numPerRow; 
    switch (Math.floor(window.screen.availWidth / 500)) {
        case 0: numPerRow = 1; break; 
        case 1: numPerRow = 2; break; 
        case 2: numPerRow = 3; break; 
        default: numPerRow = 4; break;  
    }

    const watches = [];
    const sortLastWorn = (a, b) => {
      const aLastWorn = new Date(a.last_worn);
      const bLastWorn = new Date(b.last_worn);
      if (aLastWorn > bLastWorn) {
        return -1;
      }
      if (aLastWorn < bLastWorn) {
        return 1;
      }
      // a must be equal to b
      return 0;
    };
    const sortNextToWear = (a, b) => {
      const aLastWorn = new Date(a.last_worn);
      const bLastWorn = new Date(b.last_worn);
      if (aLastWorn < bLastWorn) {
        return -1;
      }
      if (aLastWorn > bLastWorn) {
        return 1;
      }
      // a must be equal to b
      return 0;
    };
    const inpuWatchList = props.response.watchList.sort(order ? sortNextToWear : sortLastWorn).slice();
    while (inpuWatchList.length > numPerRow) {
      watches.push(inpuWatchList.splice(0,numPerRow));
    };
    watches.push(inpuWatchList.splice(0,numPerRow));
  
    let rowKey = 0;

    return (
      <div className={classes.root}>
        <Grid container spacing={1}>
          <div>
          <FormControlLabel
            control={
              <Switch
              checked={order}
              onChange={handleChangeOrder}
              name="galleryOrder"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          }
            label={order ? 'Wear next' : 'Last worn'}
          />
          </div>
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
  