import React from 'react'
import Config from '../../../../../config'

export default function Head({ data }) {
  return (

    <div className='SigRow'>
      {data.card_image && <img className='SigRowImg' src={`${Config.mediaURL}${data.card_image}`} alt={data.title} />}
      <h1 className='SigRowTitle'>{data.title}</h1>
    </div>
  )
}
