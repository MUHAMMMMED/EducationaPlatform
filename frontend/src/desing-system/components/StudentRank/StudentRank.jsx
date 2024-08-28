 
import React, { useState } from 'react';
import { FaUserGraduate } from "react-icons/fa";
import { FiTrendingUp } from "react-icons/fi";
import { TfiTimer } from "react-icons/tfi";
import './styles.css';
 
const StudentRank = (rank) => {
  const [visibleItems, setVisibleItems] = useState(10);
  const handleShowMore = () => {
    setVisibleItems(prevVisibleItems => prevVisibleItems + 10);
  };
  const rankLength = rank.rank ? rank.rank.length : 0;
  return (
<div className="table-container">
<h4 className='h4'>Students Rank </h4>
<div className="table-header">
<div className="table-cell1" style={{color: "#ffff", }}><samp className='samp'style={{color: "#ffff", }}><FaUserGraduate /></samp> Name</div>
<div className="table-cell"style={{color: "#ffff", }}>Score</div>
<div className="table-cell" style={{ borderTopRightRadius: '10px', borderBottomRightRadius: '10px' ,color: "#ffff", }} > Time Taken</div> 
</div>
<div className="table-body">

{rank &&rank.rank && rank.rank.slice(0, visibleItems).map((item, index) => (
<div className="table-row" key={index}>
<div className="table-cell1"><samp className='samp'>
<samp className='UserGraduate'> <FaUserGraduate /> </samp></samp> {item.user_full_name }  </div>
<div className="table-cell"><samp className='samp'> <FiTrendingUp /></samp>{item.score}</div>
<div className="table-cell"><samp className='samp'> <TfiTimer /></samp>{item.time_taking}</div>  
</div>))}</div>
{visibleItems < rankLength&& (<button className="button"   onClick={handleShowMore}> Show More  </button> )} 
</div>
   
  );
};

export default StudentRank;

 
    
 