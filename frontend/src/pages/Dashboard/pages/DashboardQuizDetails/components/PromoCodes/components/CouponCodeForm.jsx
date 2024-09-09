import React, { useState } from 'react';
import Config from '../../../../../../../config';
import AxiosInstance from '../../../../../../../desing-system/Authentication/AxiosInstance';

function CouponCodeForm({ Id, fetchCouponCodes }) {

    const [code, setCode] = useState('');
    const [date, setDate] = useState('');
    const [discount, setDiscount] = useState('');
    const [enroll, setEnroll] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!Id) return;
            // Make POST request to create a new coupon code
            await AxiosInstance.post(`${Config.baseURL}/Quiz/exam_coupon_codes_create/${Id}/`, {
                Code: code,
                date,

                Enroll: enroll,
                discount: discount
            });
            // Reset form fields
            setCode('');
            setDate('');
            setDiscount('')
            setEnroll(1);
            // Handle success
            fetchCouponCodes();
            setShowModal(false);
        } catch (error) {

        }
    };
    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => {
        setShowModal(false);
    };
    return (
        <>
            <button onClick={() => setShowModal(true)} class="Creat_button">Creat New</button>
            <div className={`modal ${showModal ? 'show' : ''}`}>
                <form className="modal-content animate" onSubmit={handleSubmit}>
                    <h2 style={{ textAlign: 'center', padding: '15px' }}>Create Coupon Code</h2>

                    <div className="FOrm-container">
                        <div className="form-container-half">
                            <label className='label'> Coupon Code:
                                <input type="text" placeholder="Coupon Code" value={code} onChange={(e) => setCode(e.target.value)} />
                            </label></div>
                        <div className="form-container-half">
                            <label className='label'> discount:
                                <input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} /></label>
                        </div></div>

                    <label className='label'>   Expiry Date: :
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></label>

                    <div className="FOrm-container">
                        <label className='label' style={{ width: '100%' }}> Enroll :
                            <input type="number" value={enroll} onChange={(e) => setEnroll(e.target.value)} /></label>
                    </div>
                    <div className="FOrmContainer" style={{ marginTop: '50px' }}>
                        <div style={{ width: '78%' }}><button className="button-form" type="submit">Save</button> </div>
                        <div style={{ width: '20%' }}><button className="cancel-button" onClick={handleCloseModal}>Cancel</button>  </div>

                    </div> </form> </div>
        </>);
}

export default CouponCodeForm;
