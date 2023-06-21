'use client';
import React, { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import Marquee from "react-fast-marquee";

export default function SeriesInfoCard({ series }) {

    const router = useRouter();


    const onHandleClick = (seriesId) => {

        router.push(`/series?seriesId=${seriesId}`);
    };


    const contentRef = useRef(null);
    const [isOverflowed, setIsOverflowed] = useState(false);

    useEffect(() => {

        const content = contentRef.current;

        const checkOverflow = () => {
            setIsOverflowed(content.offsetWidth < content.scrollWidth);
        };

        checkOverflow();
   
   
    }, []);

    return (
        <div>

            <div className="rounded-xl relative p-2 max-w-md mx-auto ring-2  bg-base-100 shadow-xl hover:scale-105 transition duration-300">
            <span className="badge hidden absolute top-[-0.6rem] right-[-0.5rem] animate-pulse  badge-error badge-lg">New</span>
                <div className="flex flex-col gap-4 p-2 justify-center ">
                    {isOverflowed ?
                        <Marquee
                            pauseOnHover
                            speed={10}>

                            <div ref={contentRef} className="whitespace-nowrap text-primary   overflow-auto  text-lg font-medium text-center ">{series.name}&emsp; &emsp;</div>
                        </Marquee> :
                        <div ref={contentRef} className="whitespace-nowrap text-primary    overflow-auto  text-lg font-medium text-center ">

                            {series.name}

                        </div>
                    }
                    <div className="flex font-mono flex-col gap-2 justify-between">
                        <div className='flex flex-col  md:flex-row justify-between'>
                            <p className=' font-black '>Start Date: <span className='  font-extralight'>{series.startDate}</span> </p>
                            <p className=' font-black '>End Date:  <span className='  font-extralight'>{series.endDate}</span></p>
                        </div>
                        <div className='flex flex-row justify-between'>
                            <p className=' font-black '>Matches:  <span className='  font-extralight'>{series.matches}</span></p>
                            <div className='join'>
                                <div className='btn btn-outline btn-xs join-item'>Test: {series.test}</div>
                                <div className='btn btn-outline btn-xs join-item'>T20: {series.t20}</div>
                                <div className='btn btn-outline btn-xs join-item'>Odi: {series.odi}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="flex gap-4">
                            <button onClick={() => onHandleClick(series.id)} className="btn btn-sm btn-primary ">Series Details</button>
                            {/* <button className="btn btn-sm btn-secondary ">View More</button> */}

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
