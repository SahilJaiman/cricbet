import React, { useState } from 'react';

function Tabs() {
  const [activeTab, setActiveTab] = useState('current-matches');

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="tabs">
      <a
        className={`tab tab-lifted ${activeTab === 'series-info' ? 'tab-active' : ''}`}
        onClick={() => handleTabClick('series-info')}
      >
        Series Info
      </a>
      <a
        className={`tab tab-lifted ${activeTab === 'live-events' ? 'tab-active' : ''}`}
        onClick={() => handleTabClick('live-events')}
      >
        Current Matches
      </a>
      <a
        className={`tab tab-lifted ${activeTab === 'live-matches' ? 'tab-active' : ''}`}
        onClick={() => handleTabClick('live-matches')}
      >
        Live Matches
      </a>
    </div>
  );
}

export default Tabs;
