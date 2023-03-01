import React from 'react'
import { useRouter } from 'next/navigation';

export default function CTA() {
    const router = useRouter();
    return (
        <section className="">
            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight  ">Join Cricbet Now </h2>
                    <p className="mb-6 font-light  md:text-lg">Start betting on your favorite cricket teams with confidence!</p>
                    <button onClick={() => router.push('/matches')} className="btn btn-active btn-primary">Start Betting!</button>
                </div>
            </div>
        </section>
    )
}
