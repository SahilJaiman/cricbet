'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Error from '@/components/Errorpage';
import { getAccount } from '@/utils/wallet';
import AccessDenied from '@/components/AccessDenied';
import { fetchStorage } from '@/utils/tzkt';



const UserPage = () => {

    const searchParams = useSearchParams();
    const userId = searchParams.get('userId');
    const [account, setAccount] = useState(null);
    const [bets, setBets] = useState([]);


    const isReady = () => {

        return (
            account != null && userId === account
        );
    }

    useEffect(() => {
        (async () => {
            const activeAccount = await getAccount();
            setAccount(activeAccount);
        })();


    },);

    useEffect(() => {

        (async () => {
            const storage = await fetchStorage();
            const allbets = storage.bets;
            var arr = [];
            allbets.forEach((bet) => {
                const { key, value } = bet;
                const { user, eventId } = key;

                if (user === userId) {
                    arr.push({
                        eventId: eventId,
                        team: value
                    })
                }
           
            });
            setBets(arr);


        })();

    }, );

    if (!isReady()) {
        return (
            <AccessDenied />
        )
    }



    return (
        <>
            <div className="min-h-screen flex flex-col ">
                <Navbar />

                <div className="flex flex-col flex-1 p-2 md:p-4 lg:p-6 gap-1 text-center">
                    <h2 className="text-2xl truncate text-center font-bold">Dashboard</h2>
                    <div className="flex p-2 justify-center " >
                        <div className="border-2 hover:scale-110 transition-all shadow-lg shadow-primary rounded-xl px-2 py-1">
                            {userId}
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col-reverse lg:flex-row gap-4 justify-center rounded-lg z-10 backdrop-blur-2xl p-2 border-2 ">
                        <div className='flex flex-1 flex-col '>
                            <div className="flex flex-col items-center text-xl font-bold mb-4 ">
                            <button className="btn btn-block ">My Bets</button>
                            </div>

                            <div className='grid p-4 gap-2 grid-cols-1 max-h-96 overflow-y-auto '>
                                {
                                    bets.map(bet => (
                                        <div key={bet.eventId} className="flex justify-center transition-all rounded-md ">
                                            <div className="card flex-1 max-w-lg p-2 bg-base-100 ring-2 ring-warning">
                                                <div className="card-body gap-2 p-2 ">
                                                    <div className='flex gap-1 sm:gap-4 flex-col sm:flex-row'>
                                                        <span className="badge w-24 badge-lg">Event ID</span>
                                                        <div className="font-medium truncate" >{bet.eventId}</div>
                                                    </div>
                                                    <div className='flex gap-4 flex-row'>
                                                        <span className="badge w-24 badge-lg">Team</span>
                                                        <div className="font-medium truncate" >{bet.team}</div>
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
                                <button className="btn btn-block ">My Stats</button>

                            </div>
                            <div className="stats stats-vertical lg:stats-horizontal shadow">

                                <div className="stat">
                                    <div className="stat-title">Matches</div>
                                    <div className="stat-value">{bets.length}</div>
                                </div>

                                <div className="stat">
                                    <div className="stat-title">Bets Won</div>
                                    <div className="stat-value">0</div>
                                </div>

                                <div className="stat">
                                    <div className="stat-title">Total Winning</div>
                                    <div className="stat-value">$0</div>

                                </div>

                            </div>
                        </div>


                    </div>

                </div>

            </div>
            <Footer />
        </>

    );
};

export default UserPage;
