import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  overflow: 'auto',
}));

const StyledPaperWrapper = styled('div')({
  width: '50%',
  height: '90%',
  float: 'left',
});

const StyledPaperList = styled('div')({
  marginLeft: '30px',
});

const StyledPaperImageWrapper = styled('div')({
  backgroundPosition: 'right',
});

const StyledPaperImage = styled('img')({
  height: '400px',
  float: 'right',
});

const StyledPaperButtonWrapper = styled('div')({
  display: 'table',
  width: '100%',
});

const StyledPaperButtonDiv = styled('div')({
  display: 'table-cell',
  textAlign: 'right',
  verticalAlign: 'bottom',
  width: '150px',
  paddingTop: '10px',
});

const StyledPaperButton = styled(Button)({
  marginLeft: '10px',
});
 
export default function FormRow(props) {
    const watchlist = props.watchlist;
    const xs = props.xs;
    const setDateWorn = props.setDateWorn;
    const isLoggedIn = props.isLoggedIn;
    const setRequestedWatchId = props.setRequestedWatchId;
    const handleClickDetails = (watchId) => {
      return () => {
        setRequestedWatchId(watchId);
      };
    };
    const handleClickResetDate = (watchId) => {
        return () => {
            setDateWorn(watchId);
        };
    };

  return (
    <React.Fragment>
        {watchlist.map((watch) => {
            const image = `/collection/img/wd/${watch.watchId}/face.thumb`;
            const circa = watch.circa ? `Circa ${watch.circa}` : '';
            const post = `${circa} ${watch.make} ${watch.model} ${watch.description} #womw #wruw #watch #watchnerd`
            return (
                <Grid item xs={xs} key={watch.watchId}>
                    <StyledPaper>
                    <StyledPaperWrapper key={'img_' + watch.watchId}>
                        <StyledPaperImageWrapper>
                            <StyledPaperImage src={image} alt={`${watch.make} ${watch.model}`} />
                        </StyledPaperImageWrapper>
                    </StyledPaperWrapper>
                    <StyledPaperWrapper>
                        <StyledPaperList key={'post_' + watch.watchId}>
                            <span>
                              {post} 
                              <br /> 
                              Date last worn:<br /> 
                              {watch.last_worn}
                            </span>
                            <br /> 
                            <button onClick={() => {navigator.clipboard.writeText(post)}} >Copy</button>
                        </StyledPaperList> 
                    </StyledPaperWrapper>
                      <StyledPaperButtonWrapper>
                      <StyledPaperButtonDiv key={'post_' + watch.watchId}>
                      <StyledPaperButton 
                        variant="contained" 
                        color="primary" 
                        onClick={handleClickDetails(watch.watchId)}
                      >
                        Details
                      </StyledPaperButton>
                      {isLoggedIn && 
                      <StyledPaperButton 
                        variant="contained" 
                        color="primary" 
                        onClick={handleClickResetDate(watch.watchId)}
                      >
                        Reset Date
                      </StyledPaperButton>
                      }
                    </StyledPaperButtonDiv> 
                      </StyledPaperButtonWrapper>
                    </StyledPaper>
                </Grid>
            );
        })}
    </React.Fragment>
  );
}
