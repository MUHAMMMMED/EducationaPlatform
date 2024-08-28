import React from 'react'
import InstructorCard from '../../../../desing-system/components/InstructorCard'
import { CardWrapper } from './styles'

export default function Instructor({items}) {
  return (<CardWrapper>

 {items && items.instructors.map(item => (
<InstructorCard key={item.id}  image={item.teacher.width_image} name={item.teacher.user_full_name} info={item.teacher.job_title}  /> )) }
     </CardWrapper>
  )
}
