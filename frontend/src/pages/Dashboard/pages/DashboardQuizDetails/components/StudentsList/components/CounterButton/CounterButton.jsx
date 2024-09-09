import React, { useState } from 'react';
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';
import './CounterButton.css';

const CounterButton = ({ Id, tries, fetchUser }) => {
  const [count, setCount] = useState(tries);

  const handleUpdatecount = async (newCount) => {
    try {
      if (!Id) return;
      await AxiosInstance.put(`${Config.baseURL}/Quiz/UpdateTries/${Id}`, { count: newCount });
      fetchUser();
    } catch (error) {
      console.error('Error updating count:', error);
    }
  };

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    handleUpdatecount(newCount);
  };

  const decrement = () => {
    if (count <= 0) return;
    const newCount = count - 1;
    setCount(newCount);
    handleUpdatecount(newCount);
  };

  return (
    <div className="counter-container">
      <div className="counter ">

        <button className="counter-button" onClick={decrement}>-</button>
        <span className="counter-value">{count}</span>
        <button className="counter-button" onClick={increment}>+</button>

      </div></div>
  );
};

export default CounterButton;
