
import React, { useEffect, useState } from 'react';
import { GrCompliance } from "react-icons/gr";
import { PiStudentLight } from "react-icons/pi";
import Config from '../../../../../../config';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';
import './styles.css';

export default function RunCampaign() {
  const [data, setData] = useState([]);
  const [dataCampaign, setDataCampaign] = useState({});
  const [campaign, setCampaign] = useState('');
  const [customerStatus, setCustomerStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get(`${Config.baseURL}/EmailMarketing/campaign_data/`);
        if (response.status !== 200) {
          throw new Error('Error fetching data');
        }
        setData(response.data);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  const handleRun = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await AxiosInstance.get(`${Config.baseURL}/EmailMarketing/Run_Campaign/`, {
        params: {
          campaignId: campaign,
          customer_status: customerStatus,
          status: 'run',
        },
      });
      setDataCampaign(response.data);
    } catch (error) {
      setError('Error running campaign');
      console.error('Error running campaign:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStop = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await AxiosInstance.get(`${Config.baseURL}/EmailMarketing/Run_Campaign/`, {
        params: {
          campaignId: campaign,
          customer_status: customerStatus,
          status: 'stop',
        },
      });
      setDataCampaign(response.data);
    } catch (error) {
      setError('Error stopping campaign');
      console.error('Error stopping campaign:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Course_card">
      <div className="Course_card_content">
        <form className="form">
          <div className="Course_card_content" style={{ padding: '0px 10px 10px 20px' }}>
            <div className="Course_card_info">
              <select className="Action-Box" onChange={(e) => setCampaign(e.target.value)} value={campaign}>
                <option value=''>Select Campaign</option>
                {data.map(item => (
                  <option value={item.id} key={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div className="Course_card_info">
              <select className="Action-Box" onChange={(e) => setCustomerStatus(e.target.value)} value={customerStatus}>
                <option value=''>Select Status</option>
                <option value='active'>Active</option>
                <option value='inactive'>Inactive</option>
              </select>
            </div>
            <div className="Course_card_info">
              <button type="button" onClick={handleRun} disabled={loading} className="Run_button">Run</button>
            </div>
            <div className="Course_card_info">
              <button type="button" onClick={handleStop} disabled={loading} className="Stop_button">Stop</button>
            </div>
            <div className="Course_card_info">
              {dataCampaign.customers_count && ( <div className='customers'><PiStudentLight /> : {dataCampaign.customers_count}  </div> )}
         
            </div>
          </div>
        </form>
      </div>

      {error && <div className="ERror">{error}</div>}
      <div className="massage_container">
        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <div className='Load'>Loading...</div>
          </div>
        )}
        {dataCampaign.message && (  <div className="Course_card_info">  <GrCompliance /> {dataCampaign.message} </div> )}
     </div>
    </div>
  );
}
