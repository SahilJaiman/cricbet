'use client';
import React from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link'

export default function SeriesInfoCard({ series }) {

    const router = useRouter();


    const onHandleClick = (seriesId) => {

        router.push( `/series?seriesId=${seriesId}` );
    };

    return (
        <div>
            <div className="rounded-xl max-w-md mx-auto ring-2  bg-base-100 shadow-xl hover:scale-105 transition duration-300">
                <div className="card-body flex justify-center ">
                    <h2 className="card-title ">{series.name}</h2>
                    <div className="flex flex-col  justify-between">
                    <p>Start Date: {series.startDate}</p>
                    <p>End Date: {series.endDate}</p>
                    </div>
                  
                    <div className="card-actions justify-center">
                        <div className="flex gap-4">
                            <button onClick={() => onHandleClick(series.id)} className="btn btn-sm btn-primary ">Series Details</button>
                            <button className="btn btn-sm btn-secondary ">View More</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
