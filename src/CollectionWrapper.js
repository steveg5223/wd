import React, { useState, useEffect } from 'react';
import Collection from './Collection';
import WatchDetails from './WatchDetails'

export default function CollectionWrapper(props) {
    const initialWatchList = {watchList: []};
    const initialWatchDetails = {photos: [], observations: []}
    const {setDateWorn, requestedWatchId, setRequestedWatchId, selectedMake, makes, handleMakeChange} = props;
    const [watchList, setWatchList] = useState(initialWatchList);
    const [activeWatchDetails, setActiveWatchDetails] = useState(initialWatchDetails);

      useEffect(() => {
        const url = `/collection/phpsrc/getCollection.php`;
        if (requestedWatchId === null) {
          fetch(url)
            .then((response) => { return response.json(); })
            .then((data) => { 
              setWatchList(data);
              setActiveWatchDetails({photos: [], observations: []});
            })
        }
      }, [requestedWatchId, setDateWorn]);
  
      useEffect(() => {
        const url = `/collection/phpsrc/getWatchDetails.php?watchId=${requestedWatchId}`;
        if (requestedWatchId !== null) {
          fetch(url)
          .then((response) => { return response.json(); })
          .then((data) => { 
            setActiveWatchDetails(data); 
          })
        }
      }, [requestedWatchId, setDateWorn]);

    return requestedWatchId === null ? (
        <Collection 
            response={{
              ...watchList,
              watchList: selectedMake === 'All' ? watchList.watchList : watchList.watchList.filter(watch => watch.make === selectedMake)
            }}
            setDateWorn={setDateWorn} 
            setRequestedWatchId={setRequestedWatchId}
            makes={makes}
            selectedMake={selectedMake}
            handleMakeChange={handleMakeChange}
        />
    ) : (
    <WatchDetails 
        response={activeWatchDetails} 
        setDateWorn={setDateWorn} 
        setRequestedWatchId={setRequestedWatchId}
    />
    )
}