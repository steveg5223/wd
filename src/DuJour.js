import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import watchlist from './watch';
import { ArrowLeftRounded } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'left',
      color: theme.palette.text.secondary,
      overflow: 'auto',
    },
    paperWrapper : {
        display: 'flex',
        width: '90%',
        height: '90%',
        borderBottom: '1px solid black',
    },
    paperList : {
        // width: '50%',
        marginBlockStart: '.1em',
        /* display: 'flex', */
    },
    paperImageWrapper : {
        float: 'right',
    },
    paperImage : {
        height: '120px',
    },
  }));
  
  export default function DuJour() {
    const classes = useStyles();
  
    function FormRow(props) {
        const watchlist = props.watches;
      return (
        <React.Fragment>
            {watchlist.map((watch) => {
                const image = `/collection/phpsrc/resize_image.php?path=../img/wd/${watch.watchId}/face&width=150&height=150`;
                return (
                    <Grid item xs={4}>
                        <Paper className={classes.paper}>
                        <div className={classes.paperWrapper}>
                            <span className={classes.paperImageWrapper}>
                                    <a>
                                        <img className={classes.paperImage} src={image}></img>
                                    </a>
                                </span>
                        </div>
                        <div className={classes.paperWrapper}>
                        <ul className={classes.paperList}>
                                <li>Circa: {watch.circa} {watch.make}: {watch.model}</li>
                                <li>{watch.description}</li>
                                <li>Last worn: {watch.last_worn}</li>
                            </ul> 
                        </div>
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
  