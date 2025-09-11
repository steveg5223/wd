import React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  overflow: 'auto',
}));

const StyledPaperWrapper = styled('div')({
  width: '90%',
  height: '90%',
  float: 'left',
});

const StyledPaperList = styled('div')({
  marginLeft: '30px',
});

const StyledPaperImageWrapper = styled('div')({
  // backgroundPosition: 'right',
});

const StyledPaperImage = styled('img')({
  height: '250px',
  float: 'right',
});

const StyledPaperButtonWrapper = styled('div')({
  display: 'block',
  width: '100%',
  float: 'left',
});

const StyledPaperButtonDiv = styled('div')({
  display: 'block',
  textAlign: 'right',
  verticalAlign: 'bottom',
  width: '250px',
  paddingTop: '10px',
});

const StyledClearBoth = styled('div')({
  clear: 'both',
  marginBottom: '10px',
});

const StyledPaperButton = styled(Button)({
  marginLeft: '10px',
});

const StyledDetailsTable = styled('table')({
  width: '100%',
  padding: '5px',
  border: '1px solid black',
  marginBottom: '10px',
});

const StyledObservationTable = styled('table')({
  width: '40%',
  padding: '5px',
  border: '1px solid black',
  marginBottom: '10px',
});

const StyledObservationDetails = styled('td')({
  textAlign: 'right',
});
  
  export default function WatchDetails(props) {
      const resp = props.response;
      const setRequestedWatchId = props.setRequestedWatchId;
      const {photos, observations} = resp;

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
                <StyledPaperButtonWrapper>
                    <StyledPaperButtonDiv>
                        <StyledPaperButton
                        variant="contained" 
                        color="primary" 
                        onClick={handleClickResetWatchId()}
                        >
                            Return to Collection
                        </StyledPaperButton>
                    </StyledPaperButtonDiv>
                </StyledPaperButtonWrapper>
                <StyledClearBoth></StyledClearBoth>
                <div>
                    <Grid container spacing={1}>
                    <Grid container item xs={4} spacing={3} key="photoContainer">
                            {photos.sort(sortImages).map((photo, index) => {
                                const image = `/collection/img${photo}`;
                                return (
                                    <StyledPaper key={`paper_${index}`}>
                                        <StyledPaperWrapper key={`img_${index}`}>
                                            <StyledPaperImageWrapper>
                                                <a href={image}  rel="noreferrer" target="_blank">
                                                    <StyledPaperImage src={image} alt={`${resp.make} ${resp.model}`} />
                                                </a>
                                            </StyledPaperImageWrapper>
                                        </StyledPaperWrapper>
                                    </StyledPaper>
                                );
                            })}
                        </Grid>
                        <Grid container direction="column"  item xs={8} spacing={3} key="contentContainer">
                            <Grid>
                                <StyledDetailsTable>
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
                                </StyledDetailsTable>
                            </Grid>
                            <Grid>
                                <StyledObservationTable>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Drift</th>
                                        <th scope="col">Adjusted Drift</th>
                                    </tr>
                                    {observations.map((observation, index) => {
                                        return (
                                            <tr>
                                                <td key="date">{observation.date}</td>
                                                <StyledObservationDetails
                                                key="drift">
                                                    {observation.drift}
                                                </StyledObservationDetails>
                                                <StyledObservationDetails
                                                key="adjusted_drift">
                                                    {observation.adjusted_drift}
                                                </StyledObservationDetails>
                                            </tr>
                                        );
                                    })}
                                </StyledObservationTable>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
          </div>
      );
  }

