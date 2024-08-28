
import React, { useEffect, useState } from 'react';
import { GrUpdate } from "react-icons/gr";
import Config from '../../../../../../config';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';
import Loading from '../../../../../../desing-system/components/Loading';
import ErrorPage from '../../../../../../desing-system/components/Loading/ErrorPage';
import SidebarDashboard from '../../../../components/Sidebar_dashboard/Sidebar_dashboard';
import Create from './components/Form/Create';
import Update from './components/Form/Update';

export default function QuizCategories() {
  const [categories, setCategories] = useState([]);
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const fetchCategories = async () => {
    try {
      const response = await AxiosInstance.get(`${Config.baseURL}/Quiz/Categories_filter/`, {
        params: {
          query: searchTerm,
        }
      });
      setCategories(response.data);
    } catch (error) {
      setError(error.response.data.error  || "You do not have permission to access this data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [searchTerm]); // Refetch categories when searchTerm changes

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage head="Error Occurred" error={error} />;
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <div className='Dashboard_container'>
        <SidebarDashboard showSidebar={showSidebar} toggleSidebar={toggleSidebar} />
        <div className="head-flex-container">
          <div>
            <samp>
              <button className="ButtonSidebar" onClick={toggleSidebar}>
                =
              </button>
            </samp>
            Course Categories
          </div>
          <div>
            <Create fetchCategories={fetchCategories} />
          </div>
        </div>
        <div className="Course_card">
          <form className="form">
            <div className="Course_card_content" style={{ padding: '0px 10px 10px 20px ' }}>
              <input type="text" className='Search' onChange={handleSearch} value={searchTerm} placeholder="Search.." />
            </div>
          </form>
        </div>

        {categories.map(category => (
          <div className="CourseCard" style={{ marginLeft: '15%' }} key={category.id}>
            <div className="Course_card_content">
              <div className="Course_card_info">
                <div style={{ float: 'left', width: '65px' }}>
                  <span className='onLine-icon'><GrUpdate /></span>
                </div>
                <div style={{ float: 'left' }}>
                  <p className="Course_card_title">{category.title}</p>
                  <p className="Course_card_amount">{category.description}</p>
                </div>
              </div>
              <div className="Course_cardicon">
                <Update item={category} fetchCategories={fetchCategories} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
