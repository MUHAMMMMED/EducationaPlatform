import React, { useState } from 'react';
import './Tabs.css';

const Tabs = ({ tabs  }) => {
const [activeTab, setActiveTab] = useState(0);
const handleTabClick = (index) => { setActiveTab(index);
  };
  return (
<div className="tabs">
<div className="tab-titles">
{tabs.map((tab, index) => (
 <div key={index} className={`tab-title ${index === activeTab ? 'active' : ''}`}onClick={() => handleTabClick(index)} >
{tab.title}</div>  ))} </div>
    
<div className="tab-content"> {tabs[activeTab].content} </div>  </div>
);};
export default Tabs;
