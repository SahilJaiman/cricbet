'use client';
import React, { useState, useEffect } from 'react';
import Error from '@/components/Errorpage';
import { getAccount } from '@/utils/wallet';
import AccessDenied from '@/components/AccessDenied';
import { fetchStorage } from '@/utils/tzkt';
import Loading from '@/components/Loading';

import axios from "axios";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import './CustomScrollbar.css';
import { admin } from '@/utils/contract';
import ResolveBetsModal from '@/components/ResolveBetsModal';



const AdminDashboard = () => {

    const [option, setOption] = useState("ALL EVENTS")
    const [account, setAccount] = useState("");
    const [events, setEvents] = useState([]);
    const [event, setEvent] = useState(null);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [activeCount, setActiveCount] = useState(0);

    const [error, setError] = useState(false);

    const onOptionClick = (value) => {

        setOption(value);

        const filteredEvents = events.filter((e) => {
            if (value === 'ALL EVENTS') {
                return true; // Show all events
            } else if (value === 'ACTIVE') {
                return e.active; // Show only active events
            } else if (value === 'RESOLVED') {
                return !e.active; // Show only inactive events
            }
            return false;
        });
        setFilteredEvents(filteredEvents);
    }

    const isReady = () => {

        return (
            (account !== "")
        );
    }

    const isError = () => {
        if (isReady()) {
            return admin !== account;
        }
        return false;

    }



    useEffect(() => {
        (async () => {
            const activeAccount = await getAccount();
            setAccount(activeAccount);
        })();


    }, []);

    useEffect(() => {

        (async () => {
            const storage = await fetchStorage();
            var id = storage.events;
            const res = await axios.get(`https://api.ghostnet.tzkt.io/v1/bigmaps/${id}/keys`);
            const allEvents = res.data;
            var arr = [];
            var cnt = 0;
            allEvents.forEach((event) => {
                const { key, value } = event;

                if (!value.resolved)
                    cnt++;

                arr.push({
                    id: key,
                    teamA:value.teamA,
                    teamB:value.teamB,
                    name: value.teamA + " vs " + value.teamB,
                    active: !value.resolved,
                    result: value.result,
                    date: new Date(value.eventStartTime),
                    bets: value.bettorsCount,
                    amount: value.totalBetAmount,
                })


            });
            arr = arr.sort((a, b) => b.date - a.date);
            setEvents(arr);
            setFilteredEvents(arr);
            setActiveCount(cnt);

        })();

    }, []);


    // if (userId === "") {
    //     return (
    //         < div className=" flex-col flex flex-1 h-screen" >
    //             <Error />

    //         </div >
    //     )
    // }

    if (isError()) {
        return <AccessDenied />
    }

    if (!isReady()) {
        return (
            <div className="flex flex-col flex-1 h-screen">
                <Loading />
            </div>
        )
    }



    return (
        <>

            <div className="min-h-screen flex flex-col ">
                <ResolveBetsModal event={event} />
                <div className="flex flex-col flex-1 p-2 md:p-4 lg:p-6 gap-1 text-center">
                    <h2 className="text-2xl uppercase truncate text-center font-bold">Admin Dashboard</h2>
                    <div className="flex p-2 justify-center " >
                        <div className="border-2 hover:scale-110 transition-all shadow-lg shadow-primary rounded-xl px-2 py-1">
                            {account}
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col-reverse lg:flex-row gap-4 justify-center rounded-lg z-10 backdrop-blur-2xl p-2 border-2 ">
                        <div className='flex flex-1 flex-col '>
                            <div className="flex flex-col items-center text-xl font-bold mb-4 ">

                                <div className="dropdown w-full">
                                    <label tabIndex={0} className="btn btn-block m-1">{option} <div className="badge badge-primary items-center ">{filteredEvents.length}</div></label>
                                    <ul tabIndex={0} className="dropdown-content font-medium z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                        <li><a onClick={() => onOptionClick("ALL EVENTS")}>ALL EVENTS </a></li>
                                        <li><a onClick={() => onOptionClick("ACTIVE")}>ACTIVE</a></li>
                                        <li><a onClick={() => onOptionClick("RESOLVED")}>RESOLVED</a></li>
                                    </ul>
                                </div>
                            </div>

                            <div className='custom-scrollbar grid p-4 gap-4 grid-cols-1 max-h-[28rem] overflow-y-auto '>
                                {
                                    filteredEvents?.map(e => (

                                        <div key={e.id}
                                            onClick={() => {

                                                setEvent(e);
                                                window.my_modal2.showModal();
                                            }
                                            } className="flex  justify-center transition-all cursor-pointer rounded-md hover:scale-[1.02]">
                                            <div className={`card flex-1 max-w-lg p-2 bg-base-100 ring-2 ${e.active ? 'ring-warning' : 'ring-success'}`}>
                                                <div className="card-body gap-2 p-2 ">

                                                    <div className='flex gap-4 flex-row'>
                                                        <span className="badge w-24 badge-lg">Name</span>
                                                        <div className="font-medium truncate" >{e.name}</div>
                                                    </div>
                                                    <div className='flex gap-4 flex-row'>
                                                        <span className="badge w-24 badge-lg">Date</span>
                                                        <div className="font-medium truncate" >{e.date.toLocaleDateString()}</div>
                                                    </div>
                                                    <div className='flex gap-4 flex-row'>
                                                        <span className="badge w-24 badge-lg">Result</span>
                                                        <div className="font-medium truncate" >{e.result}</div>
                                                    </div>
                                                    <div className='flex gap-1 sm:gap-4 flex-col sm:flex-row'>
                                                        <span className="badge w-24 badge-lg">Total Bets</span>
                                                        <div className="font-medium truncate" >{e.bets}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    ))
                                }
                            </div>


                        </div>
                        <div className="divider lg:divider-horizontal" />
                        <div className='flex flex-1 flex-col'>
                            <div className='flex items-center text-xl font-bold mb-6 flex-col '>
                                <button className="btn btn-block ">Stats</button>

                            </div>
                            <div className='flex flex-col-reverse lg:flex-col  ' >
                                <div className="stats stats-vertical lg:stats-horizontal shadow">

                                    <div className="stat">
                                        <div className="stat-title">Matches</div>
                                        <div className="stat-value">{events.length}</div>
                                    </div>

                                    <div className="stat">
                                        <div className="stat-title">Active</div>
                                        <div className="stat-value">{activeCount}</div>
                                    </div>

                                    <div className="stat">
                                        <div className="stat-title">Resolved</div>
                                        <div className="stat-value">{events.length - activeCount}</div>

                                    </div>

                                </div>

                                <div className='p-4'>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>

            </div>

        </>

    );
};

export default AdminDashboard;
