'use client';
import React, { useState, useEffect } from 'react';
import { connectWallet, disconnectWallet, getAccount } from "../utils/wallet"
import { useRouter, usePathname } from 'next/navigation';
import { admin } from '@/utils/contract';

export default function Navbar() {


    const [activeIndex, setActiveIndex] = useState(-1);
    const [account, setAccount] = useState(null);
    const [avatar, setAvatar] = useState("https://cdn-icons-png.flaticon.com/512/2202/2202112.png")
    const router = useRouter();
    const pathname = usePathname();

    const [theme, setTheme] = useState(
        typeof window !== 'undefined' ?
            localStorage.getItem('theme') || 'light' : 'light'
    );

    const themes = ["light", "dark", "cupcake", "retro", "forest", "aqua", "lofi", "pastel", "fantasy", "black", "luxury", "business", "night", "winter"]


    const handleChange = (event) => {

        setTheme(event.currentTarget.getAttribute('data-value'));
        document.querySelector('html').setAttribute('data-theme', event.currentTarget.getAttribute('data-value'));
    };

    const onProfileClick = (id) => {
        router.push(`/user?userId=${id}`);
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('theme', theme);
        }
        document.querySelector('html').setAttribute('data-theme', theme);
    }, [theme]);


    useEffect(() => {
        (async () => {
            const activeAccount = await getAccount();

            setAccount(activeAccount);
        })();


    }, []);

    useEffect(() => {
        if (account == admin) {

            setAvatar("https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
        } else {
            setAvatar("https://cdn-icons-png.flaticon.com/512/2202/2202112.png");
        }
    }, [account])


    const onConnectWallet = async () => {
        await connectWallet();
        const activeAccount = await getAccount();
        setAccount(activeAccount);

        if (activeAccount == admin) {
            setAvatar("https://cdn-icons-png.flaticon.com/512/3135/3135715.png");
        } else {
            setAvatar("https://cdn-icons-png.flaticon.com/512/2202/2202112.png");
        }

        const isUserPage = pathname.includes('user')

        if (isUserPage) {
            router.push(`/user?userId=${activeAccount}`);
        }

    };

    const onDisconnectWallet = async () => {

        await disconnectWallet();
        const activeAccount = await getAccount();
        console.log(activeAccount);
        setAccount(activeAccount);

    }


    return (
        <div className="navbar sticky top-0 backdrop-blur-sm z-50 ">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact md:menu-normal dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li>

                            <a className={activeIndex === 0 ? "active" : ""} onClick={() => { setActiveIndex(0); router.push('/'); }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                Home
                            </a>
                        </li>
                        <li>
                            <a className={activeIndex === 1 ? "active" : ""} onClick={() => { setActiveIndex(1); router.push('/matches'); }}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                Matches
                            </a>
                        </li>
                        <li>
                            <a href='https://github.com/SahilJaiman/cricbet#how-to-use' className={activeIndex === 2 ? "active" : ""} onClick={() => { setActiveIndex(2);}}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                                How to use
                            </a>
                        </li>
                    </ul>
                </div>
                <a onClick={() => router.push('/')} className="btn  bg-gradient-to-r from-indigo-400 to-cyan-400 inline-block text-transparent bg-clip-text btn-ghost normal-case text-2xl font-bold ">
                    Cricbet

                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>

                        <a className={activeIndex === 0 ? "active" : ""} onClick={() => { setActiveIndex(0); router.push('/'); }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            Home

                        </a>
                    </li>
                    <li>
                        <a className={activeIndex === 1 ? "active" : ""} onClick={() => { setActiveIndex(1); router.push('/matches'); }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            Macthes
                        </a>
                    </li>
                    <li>
                        <a href='https://github.com/SahilJaiman/cricbet#how-to-use' className={activeIndex === 2 ? "active" : ""} onClick={() => { setActiveIndex(2); }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                            How to use
                        </a>
                    </li>
                </ul>
            </div>




            <div className="navbar-end mx-4 space-x-4 ">
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

                <div className="dropdown dropdown-end ">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 bg-cover rounded-full">
                            <img className="" src={avatar} />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact md:menu gap-4 dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li className="tooltip tooltip-left" data-tip={account != "" ? account : "Click here to connect!!"}>

                            <a className="group justify-between" onClick={onConnectWallet}>
                                {account ? "Connected" : "Connect Wallet"}
                                <img className="w-5 h-5 group-hover:scale-125 transition duration-200 mr-1" src="/icon-128.png"></img>
                            </a>

                        </li>
                        <li>
                            <a onClick={() => onProfileClick(account)} className="justify-between">
                                Dashboard
                            </a>
                        </li>

                        <li><a onClick={onDisconnectWallet} >Logout</a></li>

                    </ul>
                </div>


            </div>
        </div >
    )
}
