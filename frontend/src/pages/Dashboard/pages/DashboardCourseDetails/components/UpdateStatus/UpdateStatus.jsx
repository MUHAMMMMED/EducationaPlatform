 
import React, { useState } from 'react';
import Config from '../../../../../../config';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';

export default function UpdateStatus({ Id,fetchUser }) {
    const [status, setStatus] = useState('');
    const handleUpdateStatus = async (event) => {
        setStatus(event.target.value);
        try {
          if (!Id) return;
          await AxiosInstance.put(`${Config.baseURL}/Courses/UpdateStatus/${Id}`, { status: event.target.value });
          fetchUser();
        } catch (error) {
       
        }
    };

    return (
        <td>
            <select className="action-box" onChange={handleUpdateStatus} value={status}>
                <option >Actions</option>
                <option value="E">Enrolled</option>
                <option value="O">Out</option>
            </select>
        </td>
    );
}
