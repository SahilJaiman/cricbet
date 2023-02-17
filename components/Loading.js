import React from 'react'

export default function Loading() {
    return (
        <main className="grid min-h-full place-items-center  py-24 px-6 sm:py-32 lg:px-8">
            <div className="text-center">

                <div className="flex space-x-2 animate-pulse">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                </div>
            </div>
        </main>
    )
}
