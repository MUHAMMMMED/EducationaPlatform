 
 import React, { useEffect, useState } from 'react';
import Config from '../../../../config';
import AxiosInstance from '../../../../desing-system/Authentication/AxiosInstance';
import Loading from '../../../../desing-system/components/Loading';
import ErrorPage from '../../../../desing-system/components/Loading/ErrorPage';
import Sidebar_dashboard from '../../components/Sidebar_dashboard/Sidebar_dashboard';
import Info from './components/Info/Info';
import Rate from './components/Rate/Rate';
import Slide from './components/Slide/Slide';
import Supporters from './components/Supporters/Supporters';
import TeamMembers from './components/TeamMembers/TeamMembers';
 
  
  
  export default function Settings() {
 
    const [date, setDate] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);

const fetchData = async () => {
  try {
    const response = await AxiosInstance.get(`${Config.baseURL}/home/Setting/`);
    setDate(response.data);
  } catch (error) {
    setError(error.response.data.error  || "You do not have permission to access this data.");
  } finally {
    setLoading(false);
  }
};

 

    useEffect(() => {
      fetchData();  
    }, []);
  
  
    if (loading) {
      return <Loading />;
    }
  
    if (error) {
      return <ErrorPage head="Error Occurred" error={error} />;
    }
  

    const toggleSidebar = () => { setShowSidebar(!showSidebar); };
  
    return (
      <>
          <div className='Dashboard_container'>

        <Sidebar_dashboard showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
        <div className="head-flex-container">
        <div><samp> <button className="ButtonSidebar" onClick={toggleSidebar}> = </button></samp> Settings </div>
      
        <div> 
    
    </div></div>     
            
 {date&&(
 <>
<Info date={date} fetchDate={fetchData}/>
 
<Slide date={date} fetchDate={fetchData}/>
 <Rate date={date} fetchDate={fetchData}/> 
 <TeamMembers  date={date} fetchDate={fetchData}/> 
<Supporters date={date} fetchDate={fetchData}/>
</> 
)}
</div>  
 </>
 );}
  