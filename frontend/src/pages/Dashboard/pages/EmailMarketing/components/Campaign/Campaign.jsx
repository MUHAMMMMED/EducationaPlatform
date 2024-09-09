

import React, { useEffect, useState } from 'react';
import { MdOutlineCampaign } from "react-icons/md";
import { PiStudentLight } from "react-icons/pi";
import Config from '../../../../../../config';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';
import Loading from '../../../../../../desing-system/components/Loading';
import ErrorPage from '../../../../../../desing-system/components/Loading/ErrorPage';
import Sidebar_dashboard from '../../../../components/Sidebar_dashboard/Sidebar_dashboard';
import CampaignCreate from './CampaignCreate';
import CampaignUpdate from './CampaignUpdate';


const Campaign = () => {
  const [Campaign, setCampaign] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    fetchCampaign();
  }, []);

  const fetchCampaign = async () => {
    try {
      const response = await AxiosInstance.get(`${Config.baseURL}/EmailMarketing/campaigns/`);
      setCampaign(response.data);
    } catch (error) {
      setError(error.response.data.error || "You do not have permission to access this data.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage head="Error Occurred" error={error} />;
  }





  return (
    <div className='Dashboard_container'>
      <Sidebar_dashboard showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
      <CampaignCreate fetchCampaign={fetchCampaign} />
      {Campaign.map((campaign) => (
        <div key={campaign.id} className="Course_card">
          <div className="Course_card_content">
            <div className="Course_card_info">
              <div style={{ float: 'left', width: '65px' }}>
                <span className='onLine-icon'><MdOutlineCampaign /></span>
              </div>
              <div style={{ float: 'left' }}>
                <p className="Course_card_title" >{campaign.name}</p>
                <p className="Course_card_title" > <PiStudentLight />  :   {campaign.customers_count}</p>
              </div>  </div>
            <div className="Course_cardicon">
              {campaign && <CampaignUpdate item={campaign} fetchCampaign={fetchCampaign} />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Campaign;
