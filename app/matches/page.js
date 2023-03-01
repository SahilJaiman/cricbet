'use client';
import React, { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar';
import LiveScores from '@/components/LiveScores';
import Footer from '@/components/Footer';

import { faArrowUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Error from '@/components/Errorpage';
import SeriesInfo from '@/components/SeriesInfo';




export default function Matches() {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      
    })
  }

  const [activeTab, setActiveTab] = useState('series-info');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };




  return (
    <div className="min-h-screen ">
      <a
        
        onClick={scrollToTop}
        className="block fixed  backdrop-blur-sm text-center right-[10%] lg:right-[3%] bottom-[3%] lg:bottom-[5%] h-12 w-12 z-40  group  animate-bounce  transition duration-300 ease-in-out ring-2 rounded-full py-3 shadow-2xl cursor-pointer"
      >
        
        <FontAwesomeIcon className="scale-125" icon={faArrowUp} />
      </a>
      <Navbar />
      <div className="flex justify-center mx-auto my-6 ">

        <div className="tabs">
          <a
            className={`tab md:tab-lg tab-lifted ${activeTab === 'series-info' ? 'tab-active' : ''}`}
            onClick={() => handleTabClick('series-info')}
          >
            Series Info
          </a>
          <a
            className={`tab md:tab-lg tab-lifted ${activeTab === 'current-matches' ? 'tab-active' : ''}`}
            onClick={() => handleTabClick('current-matches')}
          >
            Upcoming Matches
          </a>
          <a
            className={`tab md:tab-lg tab-lifted ${activeTab === 'live-matches' ? 'tab-active' : ''}`}
            onClick={() => handleTabClick('live-matches')}
          >
            Live Matches
          </a>
        </div>

      </div>
      {(() => {
        switch (activeTab) {
          case 'live-matches':
            return <LiveScores/>;
          case 'series-info':
            return <SeriesInfo/>
          default:
            return <Error/>
        }
      })()}

      <Footer />
    </div>
  )
}
