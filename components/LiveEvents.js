'use client';
import React, { useState, useEffect } from 'react';
import Error from './Errorpage';
import Loading from './Loading';

import { fetchStorage } from '@/utils/tzkt';
import axios from "axios";
import Eventcard from './Scorecard/Eventcard';

const MATCHES_ENDPOINT = 'https://api.cricapi.com/v1/currentMatches';

function LiveEvents() {

  const [events, setEvents] = useState(undefined);

  const [error, setError] = useState(false);

  useEffect(() => {

    (async () => {

      const storage = await fetchStorage();
      var id = storage.events;
      const res = await axios.get(`https://api.ghostnet.tzkt.io/v1/bigmaps/${id}/keys`);
      setEvents(res.data);
      
    })();
 
  }, []);

  const isReady = () => {

    
    return (

      typeof events !== 'undefined'
     


    );
  }
  /*if (!isReady() && !error) {
    return (
      <div>

      </div>
    );
  }*/

  if (error == true) {
    return <Error />
  }

  return (
    <div className="p-6">
      {/*<h2 className="text-2xl text-center mb-8 font-bold">Live Events</h2>*/}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {
          isReady() ?
            events.map(event => (
              <Eventcard key={event.id} e={event} />
            )) :
            <></>

        }


      </div>

    </div>
  );
}

export default LiveEvents;
