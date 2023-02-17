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
        className={`tab tab-lifted ${activeTab === 'current-matches' ? 'tab-active' : ''}`}
        onClick={() => handleTabClick('current-matches')}
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
