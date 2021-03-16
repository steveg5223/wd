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
    let numPerRow; 
    switch (Math.floor(window.screen.availWidth / 500)) {
        case 0: numPerRow = 1; break; 
        case 1: numPerRow = 2; break; 
        case 2: numPerRow = 3; break; 
        default: numPerRow = 4; break;  
    }
    console.log('numPerRow: %o', numPerRow)
    const watches = [];
    const inpuWatchList = props.watches.slice();
    while (inpuWatchList.length > numPerRow) {
      watches.push(inpuWatchList.splice(0,numPerRow));
    };
    watches.push(inpuWatchList.splice(0,numPerRow));
  
    function FormRow(props) {
        const watchlist = props.watches;
        const xs = props.xs
      return (
        <React.Fragment>
            {watchlist.map((watch) => {
                const image = `/collection/phpsrc/resize_image.php?path=../img/wd/${watch.watchId}/face&width=150&height=150`;
                const circa = watch.circa ? `Circa ${watch.circa}` : '';
                const post = `${circa} ${watch.make} ${watch.model} ${watch.description} #womw #wruw #watch #watchnerd`
                return (
                    <Grid item xs={xs} key={watch.watchId}>
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
                    <FormRow watches={chunk} xs={Math.floor(12 / numPerRow)}/>
                  </Grid>
                  );
            })}
        </Grid>
      </div>
    );
  }
  