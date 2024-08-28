import React from 'react'
import Material from '../Material/Material'
import Quiz from '../Quiz/Quiz'
import Transcript from '../Transcript/Transcript'
export default function Details({data, fetchData}) {
 
  return (
    <>
    <Transcript  data={data} />
    {data && data.material_link && (    
    <div  style={{ display: 'flex', justifyContent: 'space-between' }} > <Material Link={data}/></div> )} 
    <div style={{  width: '100%' , borderRadius: '110px 110px  0px  0px '  }}>
     <Quiz data={data}fetchData={fetchData} /></div>
 
    </>
  )
}
 