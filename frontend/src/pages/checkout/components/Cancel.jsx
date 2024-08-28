import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './styles.css';

const Cancel = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timer to navigate after 5 seconds
    const timer = setTimeout(() => {
      navigate('/AllCourses');
    }, 3000);

    // Cleanup the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-container">
      <h1 className="Cancel-h1">Cancel</h1>
      <h2>Your payment was canceled.</h2>
    </div>
  );
};

export default Cancel;
