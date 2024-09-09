
import React, { useState } from 'react';
import Config from '../../config';
import AxiosInstance from '../../desing-system/Authentication/AxiosInstance';
import FreeCheckoutLiveCourse from './FreeCheckoutLiveCourse';
import { Bay, CouponButton, CouponInput, CouponWrapper, DIVButton, DIVInput, Error, Form, Success } from './styles';
import './styles.css';

const CheckoutLiveCourse = ({ Id, name, price, Img }) => {
    const [couponCode, setCouponCode] = useState('');
    const [discountedPrice, setDiscountedPrice] = useState(price);
    const [discount, setDiscount] = useState(0);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const convertToCents = (price) => Math.round(parseFloat(price) * 100);

    const url_Type = 'LiveCourse'
    const Items = [
        {
            id: Id,
            price: convertToCents(discountedPrice),
            name,
            img: `${Config.baseURL}${Img}`,
            discount,
            url_Type
        }
    ];
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await AxiosInstance.post(`${Config.baseURL}/payments/create-checkout-session/`, { items: Items }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.data;
            if (data.url) {
                window.location.href = data.url;
            } else {
                console.error('Error:', data.error);
                setError('Failed to create checkout session');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while creating checkout session');
        }
    };

    const handleApplyCoupon = async () => {
        if (couponCode.trim() !== '') {
            try {
                const response = await AxiosInstance.post(`${Config.baseURL}/payments/Check-CouponCode-LiveCourse/`, { id: Id, couponCode }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.data;
                if (data.valid) {
                    setDiscountedPrice(data.discountedPrice);
                    setDiscount(data.discount);
                    setError('');
                    setSuccessMessage('Coupon applied successfully!');
                } else {
                    setError('Invalid or expired coupon code');
                    setSuccessMessage('');
                }
            } catch (error) {
                console.error('Error:', error);
                setError('An error occurred while applying the coupon code');
                setSuccessMessage('');
            }
        } else {
            setError('Please enter a coupon code');
            setSuccessMessage('');
        }
    };

    return (
        <section>
            {discountedPrice < 1 ? (

                <FreeCheckoutLiveCourse Id={Id} />

            ) : (
                <>
                    <CouponWrapper>
                        <DIVInput>
                            <CouponInput
                                type="text"
                                placeholder="Enter coupon code"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)} />
                        </DIVInput>

                        <DIVButton>
                            <CouponButton onClick={handleApplyCoupon}>Apply</CouponButton>
                        </DIVButton>
                        {error && <Error>{error}</Error>}
                        {successMessage && <Success>{successMessage}</Success>}
                    </CouponWrapper>
                    <Form onSubmit={handleSubmit}>
                        <Bay type='submit'>
                            Pay $ {discountedPrice}
                        </Bay>
                    </Form>
                </>
            )}
        </section>
    );
};

export default CheckoutLiveCourse;









