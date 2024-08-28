import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import Config from '../../../../config';
import Loading from '../../../../desing-system/components/Loading';
import Post from '../Post/Post';
import './SidebarFilter.css';

function SidebarFilter() {
    const [data, setData] = useState({ categories: [],instructors: [] });
    const [results, setResults] = useState([]); 
    const [searchTerm, setSearchTerm] = useState('');
    const [checkCategories, setCheckCategories] = useState([]);
    const [checkInstructors, setCheckInstructors] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showSidebar, setShowSidebar] = useState(true);

    const toggleSidebar = () => { setShowSidebar(!showSidebar);  };
     
    useEffect(() => {const handleResize = () => { setShowSidebar(window.innerWidth >= 1200);};
      handleResize(); // Check initial width
      window.addEventListener('resize', handleResize); // Listen for resize events
      return () => {
        window.removeEventListener('resize', handleResize); // Clean up event listener
      };
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {const response = await axios.get(`${Config.baseURL}/Query/filter_value/`);
                
                if (response.status !== 200) { throw new Error('Failed to fetch topic');  }
                   
                setData(response.data.results);
            } catch (error) {
              
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${Config.baseURL}/tips/tips_filter/`, {
                    params: {
                        query: searchTerm,
                        category: checkCategories.join(','),
                        instructor: checkInstructors.join(','),
                    }
                });
                setResults(response.data);
    
    } catch (error) {
        console.error('Error fetching topic:', error);
    } finally {
        setLoading(false);
      }
    };
   

        fetchCourses();
    }, [searchTerm, checkCategories, checkInstructors]);

    const handleSearch = (event) => { setSearchTerm(event.target.value);  };
    const handleCategoryCheckboxChange = (categoryId) => {
    if (checkCategories.includes(categoryId)) { setCheckCategories(checkCategories.filter(id => id !== categoryId));
        } else { setCheckCategories([...checkCategories, categoryId]); }
      };     
       
    const handleInstructorCheckboxChange = (instructorId) => {
        if (checkInstructors.includes(instructorId)) { setCheckInstructors(checkInstructors.filter(id => id !== instructorId));
        } else { setCheckInstructors([...checkInstructors, instructorId]); }
  
    };

    if (loading) {
        return <Loading />;
      }

 

  return (
 <div className='filter-section'>
 {showSidebar && (
 <aside className="sidebar">
 <div className="content-wrapper">
 <div className="widget">
 <div className="widget-title"> Category </div>                     
 <div className="collapse show"  >
 <div className="CArd card-body">
 {data.categories.map(cat => (
     <div className="checkbox-item" key={cat.id}>
     <div  className='checkbox-input'>
     <input id={`checkbox-${cat.id}`} type="checkbox" onChange={() => handleCategoryCheckboxChange(cat.id)} checked={checkCategories.includes(cat.id)} /></div> 
     <div  className='checkbox-label'>
     <label htmlFor={`checkbox-${cat.id}`}>
     <div className='space'>{cat.title}</div> </label></div> </div>))}
    
   </div></div></div>

    <div className="widget">
     <div className="widget-title" >  Instructors </div>
    <div className="collapse show" >
    <div className="CArd card-body">
    {data.instructors.map(inst => (
    <div className="checkbox-item" key={inst.id}>
    <div  className='checkbox-input'>
    <input id={`checkbox-${inst.id}`} type="checkbox" onChange={() => handleInstructorCheckboxChange(inst.id)} checked={checkInstructors.includes(inst.id)} /></div>
    <div  className='checkbox-label'>                     
    <label htmlFor={`checkbox-${inst.id}`}>
    <div  className='space'>{inst.user_full_name}</div></label>   </div></div> ))}
 </div></div></div>
 
</div></aside>  )}

 <div className="card-list"> 
 <div className="widget-input">
<div className="widget-center">
 <div className='button-center'><button className="filter-button" onClick={toggleSidebar}> <FaFilter className="filter-icon" /> Filter  </button>   </div> 
 <div className='button-center1'><input className='Search' type="text" onChange={handleSearch} value={searchTerm} placeholder="Search your topic" /></div>
</div></div>

<div className='list'>
  
 <Post data={results}/>
 </div> </div></div>
);}
export default SidebarFilter;
