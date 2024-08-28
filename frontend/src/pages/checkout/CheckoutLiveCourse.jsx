 
import React, { useState } from 'react';
import Config from '../../config';
import AxiosInstance from '../../desing-system/Authentication/AxiosInstance';
import FreeCheckoutLiveCourse from './FreeCheckoutLiveCourse';
import { Bay, CouponButton, CouponInput, CouponWrapper, DIVButton, DIVInput, Error, Form, Success } from './styles';
import './styles.css';

const CheckoutLiveCourse = ({ Id, name, price, Img }) => {
    const [couponCode, setCouponCode] = useState('');
    const [discountedPrice, setDiscountedPrice] = useState(price);
    const [discount, setDiscount  ] = useState(0);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const convertToCents = (price) => Math.round(parseFloat(price) * 100);
 
    const  url_Type='LiveCourse'
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

<FreeCheckoutLiveCourse  Id={Id}  />
 
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
 
 












// import './ProductDisplay.css';
// import Config from '../../config';
// import React, { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import QueryString from 'query-string';

// const ProductDisplay = ({ Id, name, price, Img }) => {
//     const location = useLocation();
//     // Create a list of items, ensuring the image URL is correctly formatted
//     // const Items = [
//     //     { id: Id, price, name, img: `${Config.baseURL}${Img}` },
//     //     { id: 1, price:434, name, img: `${Config.baseURL}${Img}` },
//     //     { id: 2, price:43, name, img: `${Config.baseURL}${Img}` },
//     //     { id: 3, price:555, name, img: `${Config.baseURL}${Img}` },
//     //     { id: 4, price:34434 , name, img: `${Config.baseURL}${Img}` },
//     //     { id: 5, price:7654, name, img: `${Config.baseURL}${Img}` },
//     // ];
//     const Items = [
//         { id: Id, price, name, img: 'https://pbs.twimg.com/media/GBQo1yRW0AAZ_ll?format=jpg&name=small' },
//         { id: 1, price: 434, name, img: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/IMG_Academy_Logo.svg/640px-IMG_Academy_Logo.svg.png' },
//         { id: 2, price: 43, name, img: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/IMG_Academy_Logo.svg/640px-IMG_Academy_Logo.svg.png' },
//         { id: 3, price: 555, name, img: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/IMG_Academy_Logo.svg/640px-IMG_Academy_Logo.svg.png' },
//         { id: 4, price: 34434, name, img: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/IMG_Academy_Logo.svg/640px-IMG_Academy_Logo.svg.png' },
//         { id: 5, price: 7654, name, img: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e2/IMG_Academy_Logo.svg/640px-IMG_Academy_Logo.svg.png' },
//     ];

//     useEffect(() => {
//         const values = QueryString.parse(location.search);

//         if (values.success) {
//             console.log('Order placed! You will receive an email confirmation.');
//         }

//         if (values.canceled) {
//             console.log("Order canceled -- continue to shop around and checkout when you're ready.");
//         }
//     }, [location.search]);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const response = await fetch(`${Config.baseURL}/payments/create-checkout-session/`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ items: Items }),
//         });

//         const data = await response.json();
//         if (data.url) {
//             window.location.href = data.url;
//         } else {
//             console.error('Error:', data.error);
//         }
//     };

//     return (
//         <section>
//             <div className='product'>
//                 <img src={`${Config.baseURL}${Img}`} alt='Product Image' />
//                 <div className='description'>
//                     <h3>{name}</h3>
//                     <h5>${(price / 100).toFixed(2)}</h5> {/* Convert cents to dollars */}
//                 </div>
//             </div>
//             <form onSubmit={handleSubmit}>
//                 <button className='button' type='submit'>
//                     Checkout
//                 </button>
//             </form>
//         </section>
//     );
// };

// export default ProductDisplay;
