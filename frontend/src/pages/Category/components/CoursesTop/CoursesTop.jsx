 
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import CoursesList from '../CoursesList/CoursesList';
import { CoursesBUtton, CoursesSearch, Coursestop, MainTitle, SearchInput, TopTitle } from './styles';

export default function CoursesTop({CategoryId}) {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (event) => { setSearchTerm(event.target.value);};
       
 return (
 <> 
<Coursestop>
<TopTitle><MainTitle>Find The Right <span style={{color:'#58a58f'}}> Category</span>  For You</MainTitle> </TopTitle>
<CoursesSearch>
<form action="#">
<SearchInput type="text" onChange={handleSearch} value={searchTerm} placeholder="Search your course" />
<CoursesBUtton><FaSearch /></CoursesBUtton>
</form></CoursesSearch>
</Coursestop> 
 <CoursesList query={searchTerm} CategoryId={CategoryId} /> 
</>
);
}
