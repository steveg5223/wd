import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(1),
      textAlign: 'left',
      color: theme.palette.text.secondary,
      overflow: 'auto',
    },
    paperWrapper : {
        width: '90%',
        height: '90%',
        float: 'left',
    },
    paperList : {
       marginLeft: '30px',
    },
    paperImageWrapper : {
        // backgroundPosition: 'right',
    },
    paperImage : {
        height: '250px',
        float: 'right',
    },
  }));
  
  export default function WatchDetails(props) {
      const {response, setDateWorn, setRequestedWatchId} = props;
      const {photos, observations} = response;
      console.log('photos: %o, observations: %o', photos, observations);
      const classes = useStyles();

      const handleClickResetWatchId = () => {
          return () => {setRequestedWatchId(null);};
      };

      const sortImages = (a, b) => {
          if (/face$/.test(a)) {
            return -1;
          }
          else if (/face$/.test(b)) {
            return 1;
          } 
          else if (a.toLowerCase() === b.toLowerCase()) {
              return 0;
          }
          else {
            return ( a.toLowerCase() > b.toLowerCase() ) ? 1 : -1;
          }
      };
      return (
          <div>
              <h2>WatchDetails Page</h2>
                <p>Watch Details Response From Server:</p>
                <p>{JSON.stringify(response)}}</p>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleClickResetWatchId()}
                >
                    Return to Collection
                </Button>
                <div className={classes.root}>
                    <Grid container spacing={1}>
                        <Grid container item xs={12} spacing={3}>
                            {photos.sort(sortImages).map((photo, index) => {
                                const image = `/collection/img${photo}`;
                                return (
                                    <Paper className={classes.paper}>
                                        <div className={classes.paperWrapper} key={`img_${index}`}>
                                            <div className={classes.paperImageWrapper} >
                                                <img className={classes.paperImage} src={image} alt={`${response.make} ${response.model}`} />
                                            </div>
                                        </div>
                                    </Paper>
                                );
                            })}
                        </Grid>
                    </Grid>
                </div>
          </div>
      );
  }

