'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Error from '@/components/Errorpage';
import { addEventOperation, placeBetOperation, resolveBetOperation } from '@/utils/operation';
import { getApiKey } from '@/app/constants';

const MATCHES_ENDPOINT = 'https://api.cricapi.com/v1/series_info';

const SeriesPage = () => {

    const searchParams = useSearchParams();
    const seriesId = searchParams.get('seriesId');
    const [series, setSeries] = useState(undefined);
    const [matches, setMatches] = useState(undefined);
    const [error, setError] = useState(false);
    const [loadingAddEvent, setLoadingAddEevnt] = useState(null);
    const istTimezone = 'Asia/Kolkata';
    const options = { timeZone: istTimezone, weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };

    const onAddEvent = async (match) => {
        try {
          setLoadingAddEevnt(match.id);
            await addEventOperation(
                {
                    id: match.id,
                    startTime: match.dateTimeGMT,
                    teamA:match.teams[0],
                    teamB:match.teams[1],
                }
            );
          alert("Transaction Confirmend!");
        } catch (err) {
          alert("Transaction failed: " + err.message);
        }
    
        setLoadingAddEevnt(null);
      };

    useEffect(() => {
        const fetchSeriesData = async () => {
            try {
                const API_KEY =await getApiKey();
                const res = await fetch(`${MATCHES_ENDPOINT}?apikey=${API_KEY}&id=${seriesId}`);

                const data = await res.json();

                setSeries(data.data.info);
                setMatches(data.data.matchList);
                console.log(data);


            } catch (error) {
                setError(true);
                console.log(error);
            }
        };
        if (!isReady())
            fetchSeriesData();
    }, [seriesId]);

    const isReady = () => {

        return (
            typeof series !== 'undefined'
        );
    }

    if (error == true) {
        //return <Error/>
    }

    return (
        <div className="min-h-screen flex flex-col ">
            <Navbar />
            
            <div className="flex-1 p-6">
                <h2 className="text-2xl text-center mb-8 font-bold">{series ? series.name : "Series Details"}</h2>

                <div className="  ">
                    <div className="overflow-auto">
                        <table className="table table-normal  h-full w-full">

                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Venue</th>
                                    <th>Status</th>
                                    <th>Date (IST)</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    isReady() ?
                                        matches.map(match => (

                                            <tr key={match.id}>
                                                <th></th>
                                                <td>{match.name}</td>
                                                <td>{match.venue}</td>
                                                <td>{match.status}</td>
                                                <td>{new Date(match.dateTimeGMT).toLocaleString('en-IN', options)}</td>
                                                <td><button className={loadingAddEvent === match.id ? `btn w-24 loading  ` : `btn w-24  `} onClick={() => onAddEvent(match)}>ADD</button></td>

                                            </tr>
                                        )) :
                                        <></>

                                }




                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
            <Footer />
        </div>
    );
};

export default SeriesPage;
