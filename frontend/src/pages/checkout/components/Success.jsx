import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './styles.css';

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timer to navigate after 5 seconds
    const timer = setTimeout(() => {
      navigate('/MyLearning');
    }, 3000);

    // Cleanup the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="success-container">
      <h1 className="success-h1">Success</h1>
      <h2>Thank you for your purchase!</h2>
    </div>
  );
};

export default Success;
