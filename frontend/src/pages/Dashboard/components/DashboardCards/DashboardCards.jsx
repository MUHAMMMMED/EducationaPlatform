import React from 'react';
import { BiTrendingDown, BiTrendingUp, BiUser } from "react-icons/bi";
import './styles.css';



export default function DashboardCards({data}) {
  return (
<>
  <div class="container_DashboardCards">
  
          <div class="c-dashboardInfo col-lg-3 col-md-6">
          <div class="wrap">
          <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">this month</h4>
          <p><BiUser/> : {data.total_User_current_month}</p> 
          <span class="hind-font caption-12 c-dashboardInfo__count">${data.total_price_current_month}</span>
          <div class="CENTER_Span"> 

          {data.status_current_month === 'up' ? (
          <div class="Card-Icon" style={{background:'#6dd7b9'}}>
          <span className='Span_icon'><BiTrendingUp /></span>
          <p style={{float:'left'}}>{data.percent_current_month }%</p> </div>
          ) : (
          <div class="Card-Icon" style={{background:'#c9484c'}}>
          <span className='Span_icon'><BiTrendingDown /></span>
          <p style={{float:'left'}}>{data.percent_current_month }%</p> </div>
          )}
            

          </div></div> </div>
         
          <div class="c-dashboardInfo col-lg-3 col-md-6">
          <div class="wrap">
          <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Previous Month</h4>
          <p><BiUser/> : {data.total_User_previous_month}</p> 
          <span class="hind-font caption-12 c-dashboardInfo__count">${data.total_price_previous_month}</span>
          <div class="CENTER_Span"> 
          
          {data.status_previous_month === 'up' ? (
          <div class="Card-Icon" style={{background:'#6dd7b9'}}>
          <span className='Span_icon'><BiTrendingUp /></span>
          <p style={{float:'left'}}>{data.percent_previous_month }%</p> </div>
          ) : (
          <div class="Card-Icon" style={{background:'#c9484c'}}>
          <span className='Span_icon'><BiTrendingDown /></span>
          <p style={{float:'left'}}>{data.percent_previous_month }%</p> </div>
          )}
 
          </div></div></div>

          <div class="c-dashboardInfo col-lg-3 col-md-6">
          <div class="wrap">
          <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">this year </h4>
          <p><BiUser/> : {data.total_User_current_year}</p> 
          <span class="hind-font caption-12 c-dashboardInfo__count">${data.total_price_current_year}</span>
          <div class="CENTER_Span"> 
  
           {data.status_current_year === 'up' ? (
          <div class="Card-Icon" style={{background:'#6dd7b9'}}>
          <span className='Span_icon'><BiTrendingUp /></span>
          <p style={{float:'left'}}>{data.percent_current_year }%</p> </div>
          
          ) : (
          <div class="Card-Icon" style={{background:'#c9484c'}}>
          <span className='Span_icon'><BiTrendingDown /></span>
          <p style={{float:'left'}}>{data.percent_current_year }%</p> </div>

          )}  

          </div></div>  </div>
         
          <div class="c-dashboardInfo col-lg-3 col-md-6">
          <div class="wrap">
          <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">  previous year</h4>
          <p><BiUser/> : {data.total_User_previous_year}</p> 
          <span class="hind-font caption-12 c-dashboardInfo__count">${data.total_price_previous_year}</span>
          <div class="CENTER_Span"> 
          {data.status_previous_year === 'up' ? (
          <div class="Card-Icon" style={{background:'#6dd7b9'}}>
          <span className='Span_icon'><BiTrendingUp /></span>
          <p style={{float:'left'}}> {data.percent_previous_year }% </p> </div>
          ) : (
          <div class="Card-Icon" style={{background:'#c9484c'}}>
          <span className='Span_icon'><BiTrendingDown /></span>
          <p style={{float:'left'}}>{data.percent_previous_year }%</p> </div>
          )}
          </div></div></div>

 
    </div>
</>
  
  )
}
 
 