import React, { useState, useEffect } from 'react';
import DuJour from './DuJour';
import WatchDetails from './WatchDetails'

export default function DuJourWrapper(props) {
    const initialWatchList = {watchList: []};
    const initialWatchDetails = {photos: [], observations: []}
    const {setDateWorn, requestedWatchId, setRequestedWatchId, updatedDate, selectedMake, makes, handleMakeChange} = props;
    const [activeWatchList, setActiveWatchList] = useState(initialWatchList);
    const [activeWatchDetails, setActiveWatchDetails] = useState(initialWatchDetails);

    useEffect(() => {
      const url = `/collection/phpsrc/getActive.php`;
      if (requestedWatchId === null) {
        fetch(url)
          .then((response) => { return response.json(); })
          .then((data) => {
            setActiveWatchList(data);
            setActiveWatchDetails({photos: [], observations: []});
          })
      }
    }, [requestedWatchId, updatedDate]);

    useEffect( () => {
      const url = `/collection/phpsrc/getWatchDetails.php?watchId=${requestedWatchId}`;
      if (requestedWatchId !== null) {
        fetch(url)
        .then((response) => { return response.json(); })
        .then((data) => {
          setActiveWatchDetails(data);
        })
      }
    }, [requestedWatchId, updatedDate]);

    return requestedWatchId === null ? (
      <DuJour 
      response={{
        ...activeWatchList,
        watchList: selectedMake === 'All' ? activeWatchList.watchList : activeWatchList.watchList.filter(watch => watch.make === selectedMake)
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