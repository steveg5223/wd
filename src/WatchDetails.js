import React from 'react';
import Button from '@material-ui/core/Button';

  
  export default function WatchDetails(props) {
      const {response, setDateWorn, setRequestedWatchId} = props;
      const handleClickResetWatchId = () => {
          return () => {setRequestedWatchId(null);};
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
          </div>
      );
  }

