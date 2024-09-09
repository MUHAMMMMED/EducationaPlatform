
import React, { useEffect, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import Config from '../../../../../../config';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';
import Loading from '../../../../../../desing-system/components/Loading';
import ErrorPage from '../../../../../../desing-system/components/Loading/ErrorPage';
import QuestionList from "./components/QuestionList/QuestionList";

const QuestionBank = () => {
  const { id: Id } = useParams();
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchQuestions();
  }, [Id, category, searchTerm]); // Trigger API call whenever id, exam, or searchTerm changes

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      if (!Id) return;
      const response = await AxiosInstance.get(`${Config.baseURL}/Quiz/question_Filter/${Id}/`, {
        params: {
          search: searchTerm,
          categoryId: category,
        }
      });
      setData(response.data);
    } catch (error) {
      setError(error.response.data.error || "You do not have permission to access this data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage head="Error Occurred" error={error} />;
  }
  return (
    <>
      <div className="CourseCard" style={{ border: '0px solid #58a58f', boxShadow: 'none' }}>

        <div className="form-container-half"  >
          <Link to={`/dashboard_Quiz`}> <span className='onLine-icon' ><IoIosArrowBack /></span> </Link>
        </div></div>

      <div className="Course_card" style={{ marginLeft: '20%' }}>
        <form className="form">
          <div className="Course_card_content" style={{ padding: '0px 10px 10px 20px ' }}>
            <div className="Course_card_info">
              <input type="text" className='Search' onChange={handleSearch} value={searchTerm} placeholder="Search.." />
            </div>

            <div className="Course_card_info">
              <select className="Action-Box" onChange={handleCategory} value={category}>
                <option value=''>Select category</option>
                {data.category && data.category.map(ex => (<option value={ex.id} key={ex.id}>{ex.title}</option>))}
              </select>
            </div> </div></form> </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && data && data.questions && <QuestionList data={data} exams={data.exams} creator={Id} fetchQuestions={fetchQuestions} />}
    </>
  );
};

export default QuestionBank;
