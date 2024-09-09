
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import CategoryFilter from '../CategoryFilter';
import CoursesList from '../CoursesList/CoursesList';
import { CourseSButton, CoursesSearch, Coursestop, MainTitle, SearchInput, TopTitle } from './styles';

export default function CoursesTop({ categories }) {
    const [searchTerm, setSearchTerm] = useState('');
    const handleSearch = (event) => { setSearchTerm(event.target.value); };

    return (
        <>
            <CategoryFilter categories={categories} />
            <Coursestop>
                <TopTitle><MainTitle>Find The Right <span style={{ color: '#58a58f' }}>  Course</span>  For You</MainTitle> </TopTitle>
                <CoursesSearch>
                    <form action="#">
                        <SearchInput type="text" onChange={handleSearch} value={searchTerm} placeholder="Search your course" />
                        <CourseSButton><FaSearch /></CourseSButton>
                    </form></CoursesSearch>
            </Coursestop>
            <CoursesList query={searchTerm} />
        </>
    );
}
