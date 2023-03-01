import React from 'react'
import Image from 'next/image';

export default function Scorecard({ match }) {

    const live = match.matchStarted === true && match.matchEnded === false;
    return (
        <div key={match.id} className="flex flex-col  h-full w-full border-2  mx-auto my-2 cursor-pointer max-w-sm sm:max-w-md overflow-auto transition duration-200 rounded-lg text-xs shadow-lg hover:scale-105 ">

            <div className="flex items-center h-1/5 bg-base-200 p-2">
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
                <div className="px-1 flex-1 py-1 text-center">
                    <p className="">{match.name}</p>
                </div>
            </div>

            <div className="flex flex-col h-4/5 p-2">
                <div className="flex justify-between items-center px-2 py-2">
                    <div className="flex items-center w-8/12">
                        <img className="mr-2 w-6 self-center sm:w-10 rounded-full bg-cover" alt="away-logo" src={match.teamInfo[0].img} />
                        <div className="flex flex-col">
                            <p className="text-sm font-bold">{match.teamInfo[0].name}</p>
                            <p className=" opacity-60 sm:block">{match.score ? match.score[0].inning : ""}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-end"></div>
                    <p className="text-center text-lg  font-semibold sm:text-xl">{match.score ? match.score[0].r + "/" + match.score[0].w  + "(" + match.score[0].o + ")" : "--"}</p>
                </div>
                <div className="flex items-center justify-center">
                    <span className="h-fit w-6 rounded-md bg-base-200 p-1 text-center">VS</span>
                </div>
                <div className="flex justify-between items-center px-2 py-2">
                    <div className="flex items-center w-8/12 ">
                        <img className="mr-2 w-6 self-center sm:w-10 rounded-full bg-cover" alt="home-logo" src={match.teamInfo[1].img} />
                        <div className="flex flex-col">
                            <p className="text-sm font-bold">{match.teamInfo[1].name}</p>
                            <p className="opacity-60 sm:block">{match.score[1] ? match.score[1].inning : ""}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-end"></div>
                    <p className="text-center text-lg font-semibold  sm:text-xl">{match.score[1] ? match.score[1].r + "/" + match.score[1].w + "(" + match.score[1].o + ")" : "--"}</p>
                </div>
            </div>

            <div className="flex  h-1/5 items-center bg-base-200 ">
                <div className="px-1 flex-1 py-1 text-center">
                    <p className="">{match.status}</p>
                </div>


            </div>

        </div>


    )
}
