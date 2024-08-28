import React from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import BlockList from './components/StudentsList/BlockList';
export default function StudentsBlockList() {
  return (
  
<div className="CourseCard" style={{  border:'0px solid #58a58f', boxShadow:'none',width:'80%',marginLeft:'10%',marginBottom:'50px'}}>
<div className="form-container-half"  >
<Link to={`/dashboard`}> <span className='onLine-icon' ><IoIosArrowBack /></span> </Link> 
 </div>
 <BlockList/>

 </div>
  )
}
