import React from 'react'

export default function SeriesInfoCard({ series }) {
    return (
        <div>
            <div className="card bg-base-100 shadow-xl hover:scale-110 transition duration-300">
                <div className="card-body">
                    <h2 className="card-title">{series.name}</h2>
                    <p>Start Date: {series.startDate}</p>
                    <p>End Date: {series.endDate}</p>
                    <div className="card-actions justify-center ">
                        <div className="flex gap-4">
                            <button className="btn btn-sm btn-primary ">Series Detalis</button>
                            <button className="btn btn-sm btn-secondary ">View More</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
