import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
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
    paperButtonWrapper: {
      display: 'table',
      width: '100%',
    },
    paperButton : {
      display: 'table-cell',
      textAlign: 'right',
      verticalAlign: 'bottom',
      width: '150px',
    },
  }));
 
export default     function FormRow(props) {
    const watchlist = props.watches;
    const xs = props.xs;
    const setDateWorn = props.setDateWorn;
    const isLoggedIn = props.isLoggedIn;
    const classes = useStyles();
    const handleClickResetDate = (watchId) => {
        return () => {
            setDateWorn(watchId);
        };
    };

  return (
    <React.Fragment>
        {watchlist.map((watch) => {
            const image = `/collection/phpsrc/getImageThumb.php?path=../img/wd/${watch.watchId}/face&width=300&height=300`;
            const circa = watch.circa ? `Circa ${watch.circa}` : '';
            const post = `${circa} ${watch.make} ${watch.model} ${watch.description} #womw #wruw #watch #watchnerd`
            return (
                <Grid item xs={xs} key={watch.watchId}>
                    <Paper className={classes.paper}>
                    <div className={classes.paperWrapper} key={'img_' + watch.watchId}>
                        <div className={classes.paperImageWrapper}>
                            <img className={classes.paperImage} src={image} alt={`${watch.make} ${watch.model}`} />
                        </div>
                    </div>
                    <div className={classes.paperWrapper}>
                        <div className={classes.paperList} key={'post_' + watch.watchId}>
                            <span>{post}<br /> Date last worn: {watch.last_worn}</span>
                        </div> 
                    </div>
                    {isLoggedIn && 
                      <div className={classes.paperButtonWrapper}>
                      <div className={classes.paperButton} key={'post_' + watch.watchId}>
                          <Button variant="contained" color="primary" onClick={handleClickResetDate(watch.watchId)}>
                            Reset Date
                          </Button>
                      </div> 
                      </div>
                    }
                    </Paper>
                </Grid>
            );
        })}
    </React.Fragment>
  );
}
