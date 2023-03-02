'use client';
import React, { useState, useEffect } from 'react';
import Error from './Errorpage';
import Loading from './Loading';
import Scorecard from './Scorecard/Scorecard';
import ScorecardSkeleton from './Scorecard/ScorecardSkeleton';

import { API_KEY } from '@/app/constants';
const MATCHES_ENDPOINT = 'https://api.cricapi.com/v1/currentMatches';




function LiveScores() {

  const [matches, setMatches] = useState(undefined);
  const [error, setError] = useState(false);



  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${MATCHES_ENDPOINT}?apikey=${API_KEY}&offset=0`);

        const data = await res.json();

        console.log(data);
        setMatches(data.data);


      } catch (error) {
        setError(true);
        console.log(error);
      }
    }

    if (!isReady())
      fetchData();
  }, []);

  const isLive = (match) => {
    return (match.matchStarted == true && match.matchEnded == false);
  }

  const isReady = () => {


    return (

      typeof matches !== 'undefined'


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
      {/*<h2 className="text-2xl text-center mb-8 font-bold">Live Cricket Scores</h2>*/}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {
          isReady() ?
            matches.map(match => (
              isLive(match)?
                <Scorecard key={match.id} match={match} />
                :<></>
              //< ScorecardSkeleton key = { match.id } id={match.id} />
            )) :
            [...Array(25).keys()].map(x => (
              < ScorecardSkeleton key = {x} id={x} />
            ))

        }


      </div>

    </div>
  );
}

export default LiveScores;
