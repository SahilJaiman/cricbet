import React, { useState, useEffect } from 'react'
import { addEventOperation } from '@/utils/operation';
import toast, { Toaster } from 'react-hot-toast';
import { fetchPrice } from '@/utils/fetchPrice';

export default function AddMatchModal({ match }) {

    const [betAmount, setBetAmount] = useState(0);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [XTZPrice, setXTZPrice] = useState(0);
    useEffect(() => {
        async function fetchData() {
            const { price } = await fetchPrice();
            setXTZPrice(price);
        }

        fetchData();
    }, []);

    const onAddEvent = async () => {
        const toastId = toast.loading('Please wait, adding match to events list...');
        try {
            setLoading(true);
            await addEventOperation(
                {
                    id: match.id,
                    startTime: match.dateTimeGMT,
                    teamA: match.teams[0],
                    teamB: match.teams[1],
                    amount: betAmount,
                }
            );
            toast.success('Match successfully added to the event!', {
                id: toastId,
            });
            setTimeout(() => window.my_modal.close(), 2000);

        } catch (err) {

            toast.error(`Unable to add match to event.`, {
                id: toastId,
            });
        }


        setLoading(false);

    };

    return (
        <React.Fragment>
            <Toaster
                toastOptions={{
                    className: 'bg-base-100 text-base-content',
                }}

            />
            <dialog id="my_modal" className="modal modal-bottom sm:modal-middle ">
                <form method="dialog" className="modal-box">

                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="font-medium text-lg text-center">{match.name}</h3>

                    <div className="flex flex-col gap-4 p-4">
                        <details className="collapse collapse-arrow bg-base-200">
                            <summary className="collapse-title">Detail</summary>
                            <div className="collapse-content">
                                <div className='flex flex-col font-mono'>
                                    <div className='flex flex-col md:flex-row justify-between'>
                                        <p className='font-medium '>Date: <span className='font-extralight'>{match.date}</span> </p>
                                        <p className='font-medium '>Match Type: <span className='font-extralight'>{match.matchType}</span> </p>
                                    </div>
                                    <p className='font-medium '>Status: <span className='font-extralight'>{match.status}</span> </p>
                                </div>
                            </div>

                        </details>
                        <div className="flex flex-col p-2 rounded-xl ring-1 ring-base-300 gap-2">
                            <div className='flex flex-col   gap-4'>
                                <div className='flex text-center' >
                                    Enter Bet Amount
                                </div>
                                <div className='flex w-full gap-4'>
                                    <div className='flex w-full'>
                                        <input
                                            min={0}
                                            max={100}
                                            value={betAmount}
                                            onChange={(event) => setBetAmount(event.target.value)}
                                            type="number"
                                            placeholder="amt"
                                            className="input input-bordered w-full input-sm "
                                        />
                                        <span className='flex justify-center items-center'>
                                            <img className="w-4 h-4" src="/tezos.svg" />
                                        </span>
                                    </div>
                                    <div className='flex w-full'>
                                        <input
                                            min={0}

                                            value={(betAmount * XTZPrice).toFixed(2)}
                                            onChange={(event) => setBetAmount(event.target.value)}
                                            type="text"
                                            placeholder="amt"
                                            className="input input-bordered input-sm w-full "
                                            disabled
                                        />
                                        <span className='flex justify-center items-center'>
                                            $
                                        </span>
                                    </div>

                                </div>

                            </div>
                            <input type="range" min={0} max="100" onChange={(event) => setBetAmount(event.target.value)} value={betAmount} className="range range-info range-xs" />
                        </div>
                        <div className='flex justify-center'>
                            <button onClick={onAddEvent} type='button' className="btn btn-primary btn-outline">Confirm</button>
                        </div>
                    </div>

                </form>
            </dialog>
        </React.Fragment>
    )
}
