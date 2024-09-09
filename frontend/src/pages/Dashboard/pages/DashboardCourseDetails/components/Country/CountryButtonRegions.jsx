import React, { useEffect, useState } from 'react';
import Config from '../../../../../../config';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';
import ApexChart_Location_country from '../../../../components/ApexChart/ApexChart_Location_country';
import './styles.css';


export default function CountryButtonRegions({ region, courseId }) {

  const [CityData, setCityData] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedCity) {
          const response = await AxiosInstance.get(
            `${Config.baseURL}/dashboard/City_counts_Course/${courseId}?City=${selectedCity}`
          );
          setCityData(response.data);
        }
      } catch (error) {
        console.error('Error fetching Region data:', error);
      }
    };

    fetchData();
  }, [selectedCity, courseId]);

  const handleButtonClick = (Region) => {
    setSelectedCity(Region);
  };





  return (
    <div className='CountryBut'>
      <div className='CountryBut_flex'>
        {region && region.map((item, index) => (
          <div><button key={index} className='Country_button' onClick={() => handleButtonClick(item)}>  {item}</button></div>
        ))}

        <div style={{ width: '100%', marginTop: '30px', float: 'left' }} >

          {CityData && CityData.cities_count && <ApexChart_Location_country title={CityData?.City_name} data={CityData.cities_count} />}
        </div>

      </div></div>


  )
}
