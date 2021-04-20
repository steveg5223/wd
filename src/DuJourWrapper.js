import React, { useState, useEffect } from 'react';
import DuJour from './DuJour';
import WatchDetails from './WatchDetails'

export default function DuJourWrapper(props) {
    const {setDateWorn, requestedWatchId, setRequestedWatchId} = props;
    const [activeWatchList, setActiveWatchList] = useState({watchList: []});
    const [activeWatchDetails, setActiveWatchDetails] = useState({});

    useEffect(() => {
      const url = `/collection/phpsrc/getActive.php`;
      if (requestedWatchId === null) {
        fetch(url)
          .then((response) => { return response.json(); })
          .then((data) => {
            setActiveWatchList(data);
          })
      }
    }, [requestedWatchId]);

    useEffect( () => {
      const url = `/collection/phpsrc/getWatchDetails.php?watchId=${requestedWatchId}`;
      if (requestedWatchId !== null) {
        fetch(url)
        .then((response) => { return response.json(); })
        .then((data) => {
          setActiveWatchDetails(data);
        })
      }
    }, [requestedWatchId]);

    return requestedWatchId === null ? (
      <DuJour 
      response={activeWatchList} 
      setDateWorn={setDateWorn} 
      setRequestedWatchId={setRequestedWatchId}
      />
    ) : (
      <WatchDetails 
      response={activeWatchDetails} 
      setDateWorn={setDateWorn} 
      setRequestedWatchId={setRequestedWatchId}
      />
    )
}