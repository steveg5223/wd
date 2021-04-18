import React from 'react';
  
  export default function WatchDetails(props) {
      return (
          <div>
              <h2>WatchDetails Page</h2>
                <p>Watch Details Response From Server:</p>
                <p>{JSON.stringify(props)}}</p>
          </div>
      );
  }

