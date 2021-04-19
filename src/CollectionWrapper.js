import React from 'react';
import Async from "react-async";
import Collection from './Collection';
import WatchDetails from './WatchDetails'

export default function CollectionWrapper(props) {
    const {setDateWorn, requestedWatchId, setRequestedWatchId} = props;

    const getAllWatches = async () => {
        const res = await fetch(`/collection/phpsrc/getCollection.php`)
        if (!res.ok) throw new Error(res.statusText);
        return res.json()
      };
      
    const chooseWatch = async () => {
        const res = await fetch(`/collection/phpsrc/getWatchDetails.php?watchId=${requestedWatchId}`, { 
        method: 'GET',
        })
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
    };

    return requestedWatchId === null ? (
        <Async promiseFn={getAllWatches} >
          <Async.Pending>Loading...</Async.Pending>
          <Async.Fulfilled>
            {response => (
              <Collection 
              response={response} 
              setDateWorn={setDateWorn} 
              setRequestedWatchId={setRequestedWatchId}
              />
            )}
          </Async.Fulfilled>
          <Async.Rejected>{error => `Something went wrong: ${error.message}`}</Async.Rejected>
          </Async>
    ) : (
        <Async promiseFn={chooseWatch} >
        <Async.Pending>Loading...</Async.Pending>
        <Async.Fulfilled>
          {response => (
            <WatchDetails 
            response={response} 
            setDateWorn={setDateWorn} 
            setRequestedWatchId={setRequestedWatchId}
            />
          )}
        </Async.Fulfilled>
        <Async.Rejected>{error => `Something went wrong: ${error.message}`}</Async.Rejected>
        </Async>
    )
}