import React from 'react';
import { Link } from 'react-router-dom';
import './Loading.css';
import errorImag from './errorImag.jpg';

export default function ErrorPage({head,error}) {
  return (
<main>
<section className='error'>
<div className='error_row' ><img className='error_img' src={errorImag} alt="404 error" /></div>
        
<div className='error_row' >
{/* <h1 className='error_head' >404 Content Not Found</h1>
<p className='error_p'>We're sorry, the page you are looking for does not exist.</p> */}
<h1 className='error_head' > {head}</h1>
<p className='error_p'>{error}</p></div>
<div className='error_row' >
<div className='error_button-container' >
<Link to={'/'}>   <button className='error_but'> back to home</button></Link>
 </div></div>
 </section>
</main>
  );
}
