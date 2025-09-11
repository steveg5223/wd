import React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


const StyledRoot = styled('div')({
  flexGrow: 1,
});

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
  height: '250px',
  float: 'right',
});
  
  export default function DuJour(props) {
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
                if (! watch.active ) {
                    return;
                }
                const image = `/collection/phpsrc/resize_image.php?path=../img/wd/${watch.watchId}/face&width=150&height=150`;
                const circa = watch.circa ? `Circa ${watch.circa}` : '';
                const post = `${circa} ${watch.make} ${watch.model} ${watch.description} #womw #wruw #watch #watchnerd`
                return (
                    <Grid item xs={xs} key={watch.watchId}>
                        <StyledPaper>
                        <StyledPaperWrapper key={'img_' + watch.watchId}>
                            <StyledPaperImageWrapper>
                                <StyledPaperImage src={image}></StyledPaperImage>
                            </StyledPaperImageWrapper>
                        </StyledPaperWrapper>
                        <StyledPaperWrapper>
                            <StyledPaperList key={'post_' + watch.watchId}>
                                <span>{post}</span>
                            </StyledPaperList> 
                        </StyledPaperWrapper>
                        </StyledPaper>
                    </Grid>
                );
            })}
        </React.Fragment>
      );
    }

    let rowKey = 0;
    return (
      <StyledRoot>
        <Grid container spacing={1}>
            {watches.map((chunk) => {
                return (
                    <Grid container item xs={12} spacing={3} key={rowKey++}>
                    <FormRow watches={chunk} xs={Math.floor(12 / numPerRow)}/>
                  </Grid>
                  );
            })}
        </Grid>
      </StyledRoot>
    );
  }
  