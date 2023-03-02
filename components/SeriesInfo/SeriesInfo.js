'use client';
import React, { useState, useEffect } from 'react';
import Error from '../Errorpage';
import Loading from '../Loading';
import SeriesInfoCard from './SeriesInfoCard';

import { API_KEY } from '@/app/constants';
const MATCHES_ENDPOINT = 'https://api.cricapi.com/v1/series';

export default function SeriesInfo() {
    const [series, setSeries] = useState(undefined);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`${MATCHES_ENDPOINT}?apikey=${API_KEY}&offset=0`);

                const data = await res.json();

                console.log(data);
                setSeries(data.data);


            } catch (error) {
                setError(true);
                console.log(error);
            }
        }

        if (!isReady())
            fetchData();
    }, []);

    const isReady = () => {

        return (
            typeof series !== 'undefined'
        );
    }

    if (error == true) {
        return <Error />
    }

    if (!isReady()) {
        return (
            <div className="h-full">
                <Loading />
            </div>
        )
    }

    return (
        <div>

            <div className="p-6">
                {/*<h2 className="text-2xl text-center mb-8 font-bold">Series List</h2>*/}
                <div className="grid gap-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {
                        isReady() ?
                            series.map(ser => (
                                <SeriesInfoCard key={ser.id} series={ser} />
                                
                            )) :
                            <></>

                    }


                </div>

            </div>

        </div>
    )
}
