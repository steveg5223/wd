import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import watchlist from './watch';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'left',
      color: theme.palette.text.secondary,
    },
  }));
  
  export default function DuJour() {
    const classes = useStyles();
  
    function FormRow(props) {
        const watchlist = props.watches;
      return (
        <React.Fragment>
            {watchlist.map((watch) => {
                return (
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                            <ul>
                                <li>Circa: {watch.circa} {watch.make}: {watch.model}</li>
                                <li>{watch.description}</li>
                                <li>Last worn: {watch.last_worn}</li>
                            </ul>
                        </Paper>
                    </Grid>
                );
            })}
        </React.Fragment>
      );
    }

    
    return (
      <div className={classes.root}>
        <Grid container spacing={1}>
            {watchlist.map((chunk) => {
                return (
                    <Grid container item xs={12} spacing={3}>
                    <FormRow watches={chunk}/>
                  </Grid>
                  );
            })}
        </Grid>
      </div>
    );
  }
  