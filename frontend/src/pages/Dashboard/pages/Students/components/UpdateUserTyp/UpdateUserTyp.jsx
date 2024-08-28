 
import React, { useState } from 'react';
import Config from '../../../../../../config';
import AxiosInstance from '../../../../../../desing-system/Authentication/AxiosInstance';

export default function UpdateUserTyp({ Id,fetchUser }) {
    const [type_value, setType_value] = useState('');
    const handleUpdateStatus = async (event) => {
        setType_value(event.target.value);
        try {
          if (!Id) return;
          await AxiosInstance.put(`${Config.baseURL}/dashboard/update_type/${Id}/`, { type_value: event.target.value });
          fetchUser();
        } catch (error) {
       
        }
    };

    return (
        <td>
            <select className="action-box" onChange={handleUpdateStatus} value={type_value}>
                <option >Actions</option>
                <option value="S">Student</option>
                <option value="T">Teacher</option>
                <option value="M">Manager</option>


            </select>
        </td>
    );
}
 