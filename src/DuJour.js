import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


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
        width: '50%',
        height: '90%',
        float: 'left',
    },
    paperList : {
       marginLeft: '30px',
    },
    paperImageWrapper : {
        backgroundPosition: 'right',
    },
    paperImage : {
        height: '250px',
        float: 'right',
    },
  }));
  
  export default function DuJour(props) {
    const classes = useStyles();
    const watches = props.watches;
  
    function FormRow(props) {
        const watchlist = props.watches;
      return (
        <React.Fragment>
            {watchlist.map((watch) => {
                const image = `/collection/phpsrc/resize_image.php?path=../img/wd/${watch.watchId}/face&width=150&height=150`;
                const circa = watch.circa ? `Circa ${watch.circa}` : '';
                const post = `${circa} ${watch.make} ${watch.model} ${watch.description} #womw #wruw #watch #watchnerd`
                return (
                    <Grid item xs={4} key={watch.watchId}>
                        <Paper className={classes.paper}>
                        <div className={classes.paperWrapper} key={'img_' + watch.watchId}>
                            <div className={classes.paperImageWrapper}>
                                <img className={classes.paperImage} src={image}></img>
                            </div>
                        </div>
                        <div className={classes.paperWrapper}>
                            <div className={classes.paperList} key={'post_' + watch.watchId}>
                                <span>{post}</span>
                            </div> 
                        </div>
                        </Paper>
                    </Grid>
                );
            })}
        </React.Fragment>
      );
    }

    let rowKey = 0;
    return (
      <div className={classes.root}>
        <Grid container spacing={1}>
            {watches.map((chunk) => {
                return (
                    <Grid container item xs={12} spacing={3} key={rowKey++}>
                    <FormRow watches={chunk}/>
                  </Grid>
                  );
            })}
        </Grid>
      </div>
    );
  }
  