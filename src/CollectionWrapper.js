import React, { useState, useEffect } from 'react';
import Collection from './Collection';
import WatchDetails from './WatchDetails'

export default function CollectionWrapper(props) {
    const {setDateWorn, requestedWatchId, setRequestedWatchId} = props;
    const [watchList, setWatchList] = useState({watchList: []});
    const [activeWatchDetails, setActiveWatchDetails] = useState({});

      useEffect(() => {
        const url = `/collection/phpsrc/getCollection.php`;
        if (requestedWatchId === null) {
          fetch(url)
            .then((response) => { return response.json(); })
            .then((data) => { setWatchList(data);})
        }
      }, [requestedWatchId]);
  
      useEffect(() => {
        const url = `/collection/phpsrc/getWatchDetails.php?watchId=${requestedWatchId}`;
        if (requestedWatchId !== null) {
          fetch(url)
          .then((response) => { return response.json(); })
          .then((data) => { setActiveWatchDetails(data); })
        }
      }, [requestedWatchId]);

    return requestedWatchId === null ? (
        <Collection 
            response={watchList} 
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