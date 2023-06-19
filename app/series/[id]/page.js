'use client';
import React, { useState, useEffect } from 'react';


import Error from '@/components/Errorpage';
import { addEventOperation } from '@/utils/operation';
import { getApiKey } from '@/app/constants';
import toast, { Toaster } from 'react-hot-toast';
import AddMatchModal from '@/components/SeriesInfo/Modal';


const MATCHES_ENDPOINT = 'https://api.cricapi.com/v1/series_info';




const SeriesDetail = ({ params }) => {


    const seriesId = params.id;
    const [series, setSeries] = useState(undefined);
    const [matches, setMatches] = useState(undefined);
    const [match, setMatch] = useState([]);
    const [error, setError] = useState(false);
    const [loadingAddEvent, setLoadingAddEevnt] = useState(null);
    const istTimezone = 'Asia/Kolkata';
    const options = { timeZone: istTimezone, weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };

    const onAddEvent = async (match) => {
        const toastId = toast.loading('Please wait, adding match to events list...');
        try {
            setLoadingAddEevnt(match.id);
            await addEventOperation(
                {
                    id: match.id,
                    startTime: match.dateTimeGMT,
                    teamA: match.teams[0],
                    teamB: match.teams[1],
                }
            );
            toast.success('Match successfully added to the event!', {
                id: toastId,
            });

        } catch (err) {

            toast.error(`Unable to add match to event.`, {
                id: toastId,
            });
        }

        setLoadingAddEevnt(null);
    };

    useEffect(() => {
        const fetchSeriesData = async () => {
            try {
                const API_KEY = await getApiKey();
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
        <>
            <Toaster
                toastOptions={{
                    className: 'bg-base-100 text-base-content',
                }}

            />
            {/* You can open the modal using ID.showModal() method */}

            <AddMatchModal match={match} />

            <div className="min-h-screen flex flex-col ">


                <div className="flex-1 p-6">
                    <h2 className="text-2xl text-center mb-8 font-bold">{series ? series.name : "Series Details"}</h2>

                    <div className="  ">
                        <div className="overflow-auto">
                            <table className="table table-md  md:table-lg h-full w-full">

                                <thead>
                                    <tr className='text-lg'>
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
                                            matches.map((match, index) => (

                                                <tr className=' hover' key={match.id}>
                                                    <th>{index + 1}</th>
                                                    <td>{match.name}</td>
                                                    <td>{match.venue}</td>
                                                    <td>{match.status}</td>
                                                    <td>{new Date(match.dateTimeGMT).toLocaleString('en-IN', options)}</td>
                                                    <td>
                                                        <button className={loadingAddEvent === match.id ? `btn btn-primary btn-sm w-24 loading  ` : `btn btn-primary btn-sm  w-24  `}
                                                            onClick={() => {
                                                                //onAddEvent(match)
                                                                setMatch(match);
                                                                window.my_modal.showModal()
                                                            }
                                                            }
                                                        >
                                                            ADD
                                                        </button></td>

                                                </tr>
                                            )) :
                                            <></>

                                    }




                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>

            </div>

        </>
    );
};

export default SeriesDetail;
