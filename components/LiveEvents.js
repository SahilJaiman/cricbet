'use client';
import React, { useState, useEffect } from 'react';
import Error from './Errorpage';
import ApiErrorPage from './ApiErrorPage';
import Loading from './Loading';

import { fetchStorage } from '@/utils/tzkt';
import axios from "axios";
import Eventcard from './Scorecard/Eventcard';
import { getApiKey } from '@/app/constants';
import { API_KEY_ERROR } from '@/app/constants';

const MATCHES_ENDPOINT = 'https://api.cricapi.com/v1/currentMatches';

function LiveEvents() {

  const [events, setEvents] = useState(undefined);

  const [error, setError] = useState(false);
  const [key, setKey] = useState(false);

  useEffect(() => {

    (async () => {
      const API_KEY = await getApiKey();
      if (API_KEY == API_KEY_ERROR) {
        setError(true);
        return;
      }

      setKey(API_KEY);
      const storage = await fetchStorage();
      var id = storage.events;
      const res = await axios.get(`https://api.ghostnet.tzkt.io/v1/bigmaps/${id}/keys`);
      let e = res.data;

      e.sort((a, b) => new Date(a.value.eventStartTime) - new Date(b.value.eventStartTime));

      setEvents(e.filter((ev)=>new Date(ev.value.eventStartTime)>new Date()));

    })();

  },[]);

  const isReady = () => {


    return (

      typeof events !== 'undefined'



    );
  }

  if (error == true) {
    return (
      < div className=" flex-col flex flex-1 h-full" >
        <ApiErrorPage />(

      </div >
    )
  }


  if (!isReady()) {
    return (
      <div className="flex flex-col flex-1 h-full">
        <Loading />
      </div>
    )
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
      <div className="grid  gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {
          isReady() ?
            events.map(event => (
              <Eventcard key={event.id} e={event} API_KEY={key} />
            )) :
            <></>

        }


      </div>

    </div>
  );
}

export default LiveEvents;
