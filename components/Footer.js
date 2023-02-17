import React from 'react'

export default function Footer() {
    return (

        <footer className="p-4 shadow md:px-6 md:py-8 ">
            <div className="sm:flex sm:items-center sm:justify-between">
                <a href="/" className="flex items-center mb-4 sm:mb-0">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap ">Cricbet</span>
                </a>
                <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0">
                    <li>
                        <a href="/about" className="mr-4 hover:underline md:mr-6 ">About</a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6 ">Licensing</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>
            <hr className="my-6 border-base-200 sm:mx-auto lg:my-8" />
            <span className="block text-sm text-gray-500 sm:text-center ">© <a href="/" className="hover:underline">Cricbet™</a>. All Rights Reserved.
            </span>
        </footer>

    )
}
