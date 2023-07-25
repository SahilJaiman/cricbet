import { resolveBetOperation } from '@/utils/operation';
import React, { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';


export default function ResolveBetsModal({ event }) {

    
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);


    const onResolveBets = async () => {
        const toastId = toast.loading('Please wait, resolving bets...');
        const radioButtons = document.querySelectorAll('input[name="radio-1"]');

        let checkedButton = null;
        let unCheckedButton = null;
        radioButtons.forEach((radio) => {
            if (radio.checked) {
                checkedButton = radio;
            } else {
                unCheckedButton = radio;
            }
        });
        var winner;
        var loser;
        if (checkedButton) {
            winner = checkedButton.parentElement.querySelector('span').textContent;
        }
        if (unCheckedButton) {
            loser = unCheckedButton.parentElement.querySelector('span').textContent;
        }


        try {
            setLoading(true);
        
            await resolveBetOperation(
                {
                    id: event.id,
                    losingTeam: loser,
                    winningTeam: winner,

                }
            );

            toast.success('Successfully resolved all the bets !!', {
                id: toastId,
            });
            setTimeout(() => window.my_modal2.close(), 2000);

        } catch (err) {

            toast.error(`Unable to resolve bets ${err}`, {
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
            <dialog id="my_modal2" className="modal modal-bottom sm:modal-middle ">
                <form method="dialog" className="modal-box">

                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="font-medium text-lg text-center">{event?.name}</h3>

                    <div className="flex flex-col gap-4 p-4">
                        <details className="collapse collapse-arrow bg-base-200">
                            <summary className="collapse-title">Detail</summary>
                            <div className="collapse-content">
                                <div className='flex flex-col font-mono'>
                                    <p className='font-medium  truncate '>Id: <span className='font-extralight text-sm'>{event?.id}</span> </p>
                                    <p className='font-medium '>Date: <span className='font-extralight'>{event?.date.toLocaleDateString()}</span> </p>
                                    <div className='flex flex-col md:flex-row justify-between'>
                                        <p className='font-medium flex items-center  '>Total Amount: <span className='font-extralight'>{event?.amount / 1000000} </span> <img className="w-4 h-4" src="/tezos.svg" /> </p>
                                        <p className='font-medium '>Total Bets: <span className='font-extralight'>{event?.bets}</span> </p>

                                    </div>

                                </div>
                            </div>

                        </details>
                        <div className="flex flex-col p-2 rounded-xl ring-1 ring-base-300 gap-2">
                            <div className='flex flex-col gap-4'>
                                <p className='flex justify-center font-medium' >Select Winner</p>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className=" ">{event?.teamA}</span>
                                        <input type="radio" name="radio-1" className="radio " checked />
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label cursor-pointer">
                                        <span className="">{event?.teamB}</span>
                                        <input type="radio" name="radio-1" className="radio " />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            <button onClick={onResolveBets} type='button' className="btn btn-primary btn-outline">Resolve</button>
                        </div>
                    </div>

                </form>
            </dialog>
        </React.Fragment>
    )
}
