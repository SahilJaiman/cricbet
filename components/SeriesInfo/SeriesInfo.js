'use client';
import { API_KEY_ERROR, getApiKey } from '@/app/constants';
import React, { useState, useEffect } from 'react';
import Error from '../Errorpage';
import Loading from '../Loading';
import SeriesInfoCard from './SeriesInfoCard';
import { motion, AnimatePresence } from 'framer-motion';
import ApiErrorPage from '../ApiErrorPage';

const MATCHES_ENDPOINT = 'https://api.cricapi.com/v1/series';


export default function SeriesInfo() {
    const [series, setSeries] = useState(undefined);
    const [error, setError] = useState(false);
    const [selectedId, setSelectedId] = useState(null)

    useEffect(() => {

        async function fetchData() {
            try {
                const API_KEY = await getApiKey();
                if (API_KEY == API_KEY_ERROR) {
                    setError(true);
                    return;
                }

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
        return (
            < div className=" flex-col flex flex-1 h-full" >
                 <ApiErrorPage />(

            </div >
        )
    }

    if (!isReady()) {
        return (
            <div className=" flex-col flex flex-1 h-full">
                <Loading />
            </div>
        )
    }

    return (
        <div>
            {/*} <AnimatePresence>
                {selectedId && (
                    <>
                    <div class="bg-gray-900 blur-xl bg-opacity-50 fixed inset-0 z-50"></div>
                    <motion.div
                        className="fixed z-50 inset-0 flex items-center justify-center"
                        layoutId={selectedId}
                        animate={{opacity: 1 }}
                        exit={{opacity: 0 }}
                       
                    >
                        
                        <div className='relative'>
                            <SeriesInfoCard key={selectedId} series={series.find((s) => s.id === selectedId)} />
                            <button onClick={() => setSelectedId(null)} className="absolute right-2 top-2 btn btn-circle btn-xs btn-outline">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>
                        </div>
                    </motion.div>
                    </>
                )}
                </AnimatePresence>*/
            }

            <div className="p-6">
                {/*<h2 className="text-2xl text-center mb-8 font-bold">Series List</h2>*/}
                <div className="grid gap-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {
                        isReady() ?
                            series.map(ser => (
                                <motion.div key={ser.id} layoutId={ser.id} onClick={() => setSelectedId(ser.id)}>
                                    <SeriesInfoCard key={ser.id} series={ser} />
                                </motion.div>
                            )) :
                            <></>

                    }



                </div>


            </div>

        </div>
    )
}
