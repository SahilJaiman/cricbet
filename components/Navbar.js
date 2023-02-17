'use client';
import React, { useState, useEffect } from 'react';
import { connectWallet, getAccount } from "../utils/wallet"
import { useRouter } from 'next/navigation';
export default function Navbar() {




    const [account, setAccount] = useState("");
    const router = useRouter();

    const [theme, setTheme] = useState(
        localStorage.getItem('theme') || 'light'
    );

    const themes = ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"]


    const handleChange = (event) => {

        setTheme(event.currentTarget.getAttribute('data-value'));
        document.querySelector('html').setAttribute('data-theme', event.currentTarget.getAttribute('data-value'));
    };

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.querySelector('html').setAttribute('data-theme', theme);
    }, [theme]);


    useEffect(() => {
        (async () => {
            const activeAccount = await getAccount();
            setAccount(activeAccount);
        })();
    }, []);

    const onConnectWallet = async () => {
        await connectWallet();
        const activeAccount = await getAccount();
        setAccount(activeAccount);

    };


    return (
        <div className="navbar sticky top-0 backdrop-blur-sm z-50 ">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact md:menu-normal dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li>

                            <a onClick={() => router.push('/')}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                Home
                            </a>
                        </li>
                        <li>
                            <a onClick={() => router.push('/about')}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                About
                            </a>
                        </li>
                        <li>
                            <a onClick={() => router.push('/services')}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                Services
                            </a>
                        </li>
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl ">

                    Cricbet
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>

                        <a onClick={() => router.push('/')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            Home
                        </a>
                    </li>
                    <li>
                        <a onClick={() => router.push('/about')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            About
                        </a>
                    </li>
                    <li>
                        <a onClick={() => router.push('/services')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                            Services
                        </a>
                    </li>
                </ul>
            </div>



            <div className="navbar-end space-x-4 ">
                <div className="dropdown dropdown-end">
                    <div tabIndex="0" className="btn gap-1 normal-case btn-ghost">
                        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current md:h-6 md:w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                        </svg> <span className="hidden md:inline">Theme</span>
                        <svg width="12px" height="12px" className="ml-1 hidden h-3 w-3 fill-current opacity-60 sm:inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                        </svg>

                    </div>
                    <div className="dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box top-px max-h-96 h-[70vh] w-52 overflow-y-auto shadow-2xl mt-16">
                        <div className="grid grid-cols-1 gap-3 p-3" tabIndex="0">


                            {themes.map((item) =>
                                <div key={item} data-theme={item} data-value={item} onClick={handleChange} className=" transition duration-200 outline-base-content active:outline-none active:ring-2 active:ring-slate-300 hover:scale-105 overflow-hidden rounded-lg  " >

                                    <div className="bg-base-100 text-base-content w-full cursor-pointer ">
                                        <div className=" flex gap-1 py-3 px-4">
                                            <div className="flex-grow text-sm font-bold">{item[0].toLocaleUpperCase() + item.substring(1)}</div>
                                        </div>
                                    </div>
                                </div>
                            )}


                        </div>
                    </div>
                </div>



                {/*<div className="dropdown">
                    <select className="select select-md w-full max-w-xs" value={theme} onChange={handleChange}>
                        {themes.map((item) => <option value={item}>{item[0].toLocaleUpperCase() + item.substring(1)}</option>)}
                    </select>
    </div>*/}

                <a className="btn  btn-outline group" onClick={onConnectWallet}>
                   <img className="w-5 h-5 group-hover:scale-125 transition duration-200 mr-1" src="/icon-128.png"></img>

                    Connect Wallet
                </a>

            </div>
        </div>
    )
}
