
import React, { useState } from 'react';
import Config from '../../../../../../../../config';
import AxiosInstance from '../../../../../../../../desing-system/Authentication/AxiosInstance';
export default function UpdateBlock({ Id, fetchUser }) {
    const [status, setStatus] = useState('');
    const handleUpdateStatus = async (event) => {
        setStatus(event.target.value);
        try {
            if (!Id) return;
            await AxiosInstance.put(`${Config.baseURL}/Event/UpdateStatus/${Id}`, { status: event.target.value });
            fetchUser();
        } catch (error) {

        }
    };

    return (
        <td>
            <select className="action-box" onChange={handleUpdateStatus} value={status}>
                <option >Actions</option>
                <option value="L">Live</option>
                <option value="B">Block</option>
            </select>
        </td>
    );
}
