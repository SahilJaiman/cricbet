'use client';
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'


export default function Hero() {




    return (
        <div className="container flex flex-col justify-between items-center mx-auto p-6 lg:flex-row">

            <div className="flex flex-col space-y-10 mb-24 lg:mt-16 lg:w-1/2 xl:mb-36">
                <h1
                    className="text-5xl font-bold text-center lg:text-6xl lg:max-w-lg lg:text-left"
                >
                    Win big on Tezos with <span className=" bg-gradient-to-r from-indigo-400 to-cyan-400 inline-block text-transparent bg-clip-text">Cricbet</span>
                </h1>
                <p
                    className="text-2xl text-center text-gray-400 lg:max-w-lg lg:text-left"
                >
                    Cricbet combines the power of Tezos blockchain with an easy-to-use platform for cricket betting enthusiasts.
                </p>
                <div className="mx-auto lg:mx-0">
                    <a
                        href="/matches"
                        className="btn btn-active btn-primary rounded-full  hover:opacity-70"
                    >Get Started</a
                    >
                </div>
            </div>




            <div className="h-full" >
                <Image
                    src="/hero.svg"
                    width="700"
                    height="700"
                    alt="Hero Illustration"

                    loading="eager"

                />

            </div>



        </div>
    )
}
