'use client';
import React, { useState, useEffect } from 'react'
import { addEventOperation, placeBetOperation, resolveBetOperation } from '@/utils/operation';
import Navbar from '@/components/Navbar';
import LiveScores from '@/components/LiveScores';
import Footer from '@/components/Footer';

import { faArrowUp } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Tabs from '@/components/Tabs';
import Error from '@/components/Errorpage';
import SeriesInfo from '@/components/SeriesInfo';




export default function About() {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const [activeTab, setActiveTab] = useState('current-matches');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };




  return (
    <div className="min-h-screen ">
      <button
        type="button"
        onClick={scrollToTop}
        className="block fixed right-[10%] lg:right-[3%] bottom-[3%] lg:bottom-[5%] h-12 w-12 z-40  group btn no-animation animate-bounce  transition duration-300 ease-in-out items-center rounded-full p-3 shadow-2xl"
      >
        <FontAwesomeIcon scale={2} icon={faArrowUp} />
      </button>
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
            Current Matches
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
            return <Error/>
          case 'series-info':
            return <SeriesInfo/>
          default:
            return <LiveScores/>;
        }
      })()}

      <Footer />
    </div>
  )
}
