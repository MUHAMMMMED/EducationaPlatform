
import React, { useEffect, useState } from 'react';
import { PiNewspaperClipping } from "react-icons/pi";
import Config from '../../../../config';
import AxiosInstance from '../../../../desing-system/Authentication/AxiosInstance';
import Loading from '../../../../desing-system/components/Loading';
import ErrorPage from '../../../../desing-system/components/Loading/ErrorPage';
import Sidebar_dashboard from '../../components/Sidebar_dashboard/Sidebar_dashboard';
import TrickCreate from './components/TrickCreate/TrickCreate';
import TrickUpdate from './components/TrickUpdate/TrickUpdate';
import './styles.css';

export default function TricksList() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [data, setData] = useState({ categories: [], instructors: [] });
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState(''); // Storing the selected category ID
  const [instructor, setInstructor] = useState(''); // Storing the selected instructor ID
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get(`${Config.baseURL}/Query/filter_value/`);
        if (response.status !== 200) {
          throw new Error();
        }
        setData(response.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  const fetchTricks = async () => {
    try {
      const response = await AxiosInstance.get(`${Config.baseURL}/tips/tips_filter_dash/`, {
        params: {
          query: searchTerm,
          category: category,
          instructor: instructor,
        }
      });
      if (response.status !== 200) {
        throw new Error();
      }
      setResults(response.data);
    } catch (error) {
      setError(error.response.data.error || "You do not have permission to access this data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTricks();
  }, [searchTerm, category, instructor]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategories = (event) => {
    setCategory(event.target.value);
  };

  const handleInstructorsSelection = (event) => {
    setInstructor(event.target.value);
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


      <TrickCreate categories={data.categories} instructors={data.instructors} fetchTricks={fetchTricks} />

      <div className="Course_card">
        <form className="form" >
          <div className="Course_card_content" style={{ padding: '0px 10px 10px 20px ' }}>
            <div className="Course_card_info">
              <input type="text" className='Search' onChange={handleSearch} value={searchTerm} placeholder="Search.." />
            </div>

            <div className="Course_card_info">
              <select className="Action-Box" onChange={handleInstructorsSelection} value={instructor}>
                <option value=''>Select Teacher</option>
                {data.instructors.map(inst => (<option value={inst.id} key={inst.id}>{inst.user_full_name}</option>))}
              </select>

              <select className="Action-Box" onChange={handleCategories} value={category}>
                <option value='' >Select category</option>
                {data.categories.map(cat => (<option value={cat.id} key={cat.id}>{cat.title}</option>))}
              </select> </div> </div></form>

      </div>
      {results.map(tip => (
        <div key={tip.id} className="Course_card">
          <div className="Course_card_content">
            <div className="Course_card_info">
              <div style={{ float: 'left', width: '65px' }}><span className='onLine-icon'><PiNewspaperClipping /></span></div>
              <div style={{ float: 'left' }}>
                <p className="Course_card_title">{tip.title}</p>
                <p className="Course_card_amount">{tip.author.user_full_name}</p> </div> </div>
            <div className="Course_card_info"><p className="Course_card_title">  </p></div>
            <div className="Course_cardicon">

              <TrickUpdate tip={tip} fetchTricks={fetchTricks} categories={data.categories} instructors={data.instructors} />


            </div></div></div>))}

    </div>
  );
}
