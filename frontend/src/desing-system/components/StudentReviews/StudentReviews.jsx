import React from 'react';
import studentImg from './Student.png';
import {
    AuthorContent,
    AuthorThumb,
    IMG,
    Name,
    P,
    ReviewAuthor,
    SPEN,
    SingleReview
} from './styles'; // Import your custom styles

import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";

export default function StudentReviews({ ratingsList }) {
    return (
        <>
            {ratingsList?.map(rating => (
                <SingleReview key={rating.id}>
                    <ReviewAuthor>
                        <AuthorThumb>
                            <IMG  alt="Student" src={studentImg}/>  <i className="icofont-quote-left"></i> </AuthorThumb>
 
                        <AuthorContent>
                            <Name>{rating.user_full_name } </Name>
                            <SPEN>
                           
                                {[...Array(parseInt(rating.rate_number))].map((_, index) => (
                                    <GoStarFill key={index} />
                                ))}
                            </SPEN>
                        </AuthorContent>
                    </ReviewAuthor>
                    <P>
                        <SPEN> <FaQuoteLeft />-</SPEN> {rating.message}<SPEN > - <FaQuoteRight /></SPEN>
                       
                    </P>
                </SingleReview>
            ))}
        </>
    );
};
