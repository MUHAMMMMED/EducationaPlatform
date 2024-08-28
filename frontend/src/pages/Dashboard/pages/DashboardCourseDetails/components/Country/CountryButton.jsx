import React, { useEffect, useState } from 'react';
 
import './styles.css';
 
import Config from '../../../../../../config';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';
import ApexChart_Location_country from '../../../../components/ApexChart/ApexChart_Location_country';
import CountryButtonRegions from './CountryButtonRegions';
 

 export default function CountryButton({data,courseId}) {
 
    const [countryData, setCountryData] = useState(null);
    const [selectedRegion, setSelectedRegion] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          if (selectedRegion) {
            const response = await AxiosInstance.get(
              `${Config.baseURL}/dashboard/Region_counts_Course/${courseId}?Region=${selectedRegion}`
            );
            setCountryData(response.data);
          }
        } catch (error) {
          console.error('Error fetching Region data:', error);
        }
      };
  
      fetchData();
    }, [selectedRegion, courseId]);
  
    const handleButtonClick = (Region) => {
        setSelectedRegion(Region);
    };
    
    const validData = Array.isArray(data) ? data : [];

  return (
 <div className='CountryBut'> 
 <div className='CountryBut_flex'>  
 
 {validData.map((item, index) => (
<div><button key={index} className='Country_button'
 onClick={() => handleButtonClick(item)}> {item}</button></div>
))}     
 
<div style={{width:'100%', marginTop:'30px', float:'left'}} > 
{countryData &&countryData.region_counts&& <ApexChart_Location_country title={countryData?.Region_name} data={countryData.region_counts} />}
 </div></div>
 <div style={{width:'100%', marginTop:'30px', float:'left'}} > 
{countryData &&countryData.regions_names && <CountryButtonRegions region={countryData.regions_names}  courseId={courseId}/>}
</div>
</div>
)
}
 