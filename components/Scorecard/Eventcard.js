'use client';
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import Loading from '../Loading';
import { getApiKey } from '@/app/constants';
import { fetchStorage } from '@/utils/tzkt';
import axios from "axios";
import { placeBetOperation } from '@/utils/operation';
import CountdownTimer from './CountdownTimer';

const MATCHES_ENDPOINT = 'https://api.cricapi.com/v1/match_info';

export default function Eventcard({ e,API_KEY }) {

    const [match, setMatch] = useState(undefined);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(null);

    const [isOpen, setIsOpen] = useState(false);
    const [event, setEvent] = useState(e);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const updateData = async () => {
        const storage = await fetchStorage();
        var id = storage.events;
        const res = await axios.get(`https://api.ghostnet.tzkt.io/v1/bigmaps/${id}/keys/${e.key}`);
        setEvent(res.data);

    };

    const onPlaceBet = async (team) => {
        console.log(event);
        try {
            setLoading(match.id);
            await placeBetOperation(
                event.key,
                team,
                event.value.fixedBetAmount / 1000000
            );
            alert("Transaction Confirmend!");
        } catch (err) {
            alert("Transaction failed: " + err.message);
        }

        setLoading(null);
        await updateData();
        toggleModal();

    };



    useEffect(() => {
        async function fetchData() {
            try {
               
                const res = await fetch(`${MATCHES_ENDPOINT}?apikey=${API_KEY}&id=${event.key}`);

                const data = await res.json();

                console.log(data);
                setMatch(data.data);


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

            typeof match !== 'undefined'

        );
    }
    if (error) {
        return <></>;
    }

    if (!isReady()) {
        return (
            <div className="h-full">
                <Loading />
            </div>
        )
    }

    const isLive = (match) => {
        return (match.matchStarted == true && match.matchEnded == false);
    }


    //const live = match.matchStarted === true && match.matchEnded === false;
    const live = isLive(match);
    return (
        <div key={match.id} className=" relative flex flex-col h-full w-full border-2  mx-auto cursor-pointer max-w-sm sm:max-w-md  transition duration-200 rounded-lg text-xs shadow-lg hover:scale-105 ">

            <div className="flex flex-col items-center bg-base-200 p-2">
                {live ?
                    <div className="flex flex-row gap-2 rounded-2xl border-2 border-base-200 bg-base-100 px-2 py-1">
                        <span className="flex items-center justify-center">
                            <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                        </span>
                        <span className="text-xs font-medium">LIVE</span>
                    </div>
                    : <></>
                }

                <div className="px-1 flex-1 py-1 font-serif  font-medium text-center">
                    <p className="">{match.name}</p>
                </div>

            </div>


            <div className="relative flex flex-col h-32 gap-4 p-2 justify-center ">
                <div className="absolute top-2 flex justify-center w-full">
                    <CountdownTimer eventStartDate={new Date(match.dateTimeGMT)} />
                </div>
                <div className="flex w-full flex-row justify-between">
                    <div className="flex justify-between items-center px-2 py-2">
                        <div className="flex items-center ">
                            <img className="mr-2 w-6 self-center sm:w-10 rounded-full bg-cover" alt="away-logo" src={match.teamInfo[0].img} />
                            <div className="flex flex-col">
                                <p className="text-sm font-bold">{match.teamInfo[0].name}</p>

                            </div>
                        </div>

                    </div>
                    <div className="flex items-center justify-center">
                        <span className="h-fit w-6 rounded-md bg-base-200 p-1 text-center">VS</span>
                    </div>
                    <div className="flex justify-between items-center px-2 py-2">
                        <div className="flex items-center ">
                            <img className="mr-2 w-6 self-center sm:w-10 rounded-full bg-cover" alt="home-logo" src={match.teamInfo[1].img} />
                            <div className="flex flex-col">
                                <p className="text-sm font-bold">{match.teamInfo[1].name}</p>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="flex p-2 items-center bg-base-200 ">
                <div className="px-2 flex flex-col gap-1 flex-1 py-1   ">
                    <p className="flex  space-x-2"> <span className="badge badge-primary  ">Status</span>
                        <span className="text-sm font-medium">{match.status}</span>
                    </p>
                    <div className="flex justify-between ">
                        <p className="flex  space-x-2"> <span className="badge  badge-primary  ">Bet Amount</span>
                            <span className="text-sm font-medium">{event.value.fixedBetAmount / 1000000}{" "}ꜩ</span>
                        </p>
                        <p className="flex  space-x-2"> <span className="badge  badge-primary  ">Total Bets</span>
                            <span className="text-sm font-medium">{event.value.bettorsCount}</span>
                        </p>
                    </div>
                    <div>
                        <button onClick={toggleModal} className={`btn btn-outline btn-block btn-sm mt-2 ${loading ? "loading" : ""} `}>Bet</button>

                    </div>

                </div>


            </div>

            <div>

                {isOpen && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                        <div className="absolute inset-0 0"></div>
                        <div className="relative ring-2  backdrop-blur-2xl rounded-lg shadow-lg px-6 py-4">
                            <button onClick={toggleModal} className="absolute right-2 top-2 btn btn-circle btn-xs btn-outline">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            </button>

                            <div className="text-xl text-center  font-bold mb-2">Select Team</div>
                            <div className="text-center  mb-4">Select team to bet!</div>
                            <div className="flex justify-center gap-2">
                                <button onClick={() => { onPlaceBet(match.teamInfo[0].name) }} className="btn btn-outline w-16  btn-sm">{match.teamInfo[0].shortname}</button>
                                <button onClick={() => { onPlaceBet(match.teamInfo[1].name) }} className="btn btn-outline w-16 btn-sm">{match.teamInfo[1].shortname}</button>
                            </div>
                        </div>
                    </div>
                )}

            </div>

        </div>


    )
}
