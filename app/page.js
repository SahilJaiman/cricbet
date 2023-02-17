'use client';
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer';



const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <>


      <div className="min-h-screen ">
        <Navbar />



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
                href="#"
                className="btn btn-active btn-primary rounded-full  hover:opacity-70"
              >Get Started</a
              >
            </div>
          </div>
          <div className="mockup-phone mx-0 h-fit ">

            <div className="camera"></div>
            <div className="display">
              <div className=" bg-gradient-to-r from-indigo-400 to-cyan-400 bg-cover bg-[url('https://media.idownloadblog.com/wp-content/uploads/2018/08/iPhone-XS-marketing-wallpaper.jpg')] artboard artboard-demo phone-1"></div>
            </div>
          </div>



        </div>

        <Footer />


      </div>



    </>
  )
}
