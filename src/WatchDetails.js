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
    paperButtonWrapper: {
        display: 'block',
        width: '100%',
        float: 'left',
      },
      paperButtonDiv : {
        display: 'block',
        textAlign: 'right',
        verticalAlign: 'bottom',
        width: '250px',
        paddingTop: '10px',
      },
      clearBoth: {
          clear: 'both',
          marginBottom: '10px',
      },
      paperButton : {
        marginLeft: '10px',
      },
      detailsTable: {
        width: '100%',
        padding: '5px',
        border: '1px solid black',
        marginBottom: '10px',
    },
      observationTable : {
          width: '40%',
          padding: '5px',
          border: '1px solid black',
          marginBottom: '10px',
      },
      observationDetails : {
          textAlign: 'right',
      },
  }));
  
  export default function WatchDetails(props) {
      const resp = props.response;
      const setRequestedWatchId = props.setRequestedWatchId;
      const {photos, observations} = resp;
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
                <div className={classes.paperButtonWrapper}>
                    <div className={classes.paperButtonDiv}>
                        <Button
                        className={classes.paperButton} 
                        variant="contained" 
                        color="primary" 
                        onClick={handleClickResetWatchId()}
                        >
                            Return to Collection
                        </Button>
                    </div>
                </div>
                <div className={classes.clearBoth}></div>
                <div className={classes.root}>
                    <Grid container spacing={1}>
                    <Grid container item xs={4} spacing={3} key="photoContainer">
                            {photos.sort(sortImages).map((photo, index) => {
                                const image = `/collection/img${photo}`;
                                return (
                                    <Paper className={classes.paper}>
                                        <div className={classes.paperWrapper} key={`img_${index}`}>
                                            <div className={classes.paperImageWrapper} >
                                                <img className={classes.paperImage} src={image} alt={`${resp.make} ${resp.model}`} />
                                            </div>
                                        </div>
                                    </Paper>
                                );
                            })}
                        </Grid>
                        <Grid container direction="column"  item xs={8} spacing={3} key="contentContainer">
                            <Grid>
                                <table className={classes.detailsTable}>
                                <tr>
                                        <td>WatchId: </td>
                                        <td>{resp.watchId}</td>
                                    </tr>
                                    <tr>
                                        <td>Make: </td>
                                        <td>{resp.make}</td>
                                    </tr>
                                    <tr>
                                        <td>Model: </td>
                                        <td>{resp.model}</td>
                                    </tr>
                                    <tr>
                                        <td>Description: </td>
                                        <td>{resp.descr}</td>
                                    </tr>
                                    <tr>
                                        <td>Circa: </td>
                                        <td>{resp.circa}</td>
                                    </tr>
                                    <tr>
                                        <td>Active?: </td>
                                        <td>{resp.active ? 'Yes' : 'No'}</td>
                                    </tr>
                                </table>
                            </Grid>
                            <Grid>
                                <table className={classes.observationTable}>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Drift</th>
                                        <th scope="col">Adjusted Drift</th>
                                    </tr>
                                    {observations.map((observation, index) => {
                                        return (
                                            <tr>
                                                <td key="date">{observation.date}</td>
                                                <td 
                                                className={classes.observationDetails}
                                                key="drift">
                                                    {observation.drift}
                                                </td>
                                                <td 
                                                className={classes.observationDetails}
                                                key="adjusted_drift">
                                                    {observation.adjusted_drift}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </table>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
          </div>
      );
  }

