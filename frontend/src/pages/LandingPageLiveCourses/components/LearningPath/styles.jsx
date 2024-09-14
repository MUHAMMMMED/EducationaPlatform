import styled from "@emotion/styled";

export const ROWLearningPath = styled("div")`
    label:ROWLearningPath;
    width:70%;
    margin:0 auto; 
    padding: 10px;
 

    @media (max-width: 1200px) {
      width:60%;
     
     }
       @media (max-width: 768px) {
        /* Tablet styles */
        width:100%;
      
      }

    `;



export const TitlE = styled("h2")`
label:TitlE;
padding-top: 50px;
font-size: 2.5rem;
text-align: center!important;
font-weight: 700!important;
width: 100%;
color:#fff;
padding-bottom: 0px;
@media (max-width: 1200px) {
font-size: 1.2rem;
padding-top: 30px;
text-align: center!important;
padding-right:35px; 
padding-bottom: -70px;

 }
`;



export const ULL = styled("ul")`
label:ULL;
list-style-type: none; /* Remove default list bullets */
padding: 0;
margin: 0;
width: 100%;

`;

export const Li_ar = styled("li")`
label:Li;
width: 100%;
color: #fff; 
margin-top: 0.5rem;
margin-bottom: 0.5rem;
text-align: right; 
float: right;
margin-bottom: 2px; /* Add space between list items */
border-radius: 5px; /* Rounded corners */
padding: 5px; /* Padding inside each list item */
line-height: 2; /* Adjust as needed */
font-size: 18px;
/* Styles for mobile devices */
/* Media query for tablets and larger screens */
 
@media (max-width: 1200px) {
   font-size: 13px;
   line-height: 2; /* Adjust as needed */
 
 }
`;

export const Li_en = styled("li")`
label:Li;
width: 100%;
color: #fff; 
margin-top: 0.5rem;
margin-bottom: 0.5rem;
text-align: left; 
float: left;
margin-bottom: 2px; /* Add space between list items */
border-radius: 5px; /* Rounded corners */
padding: 5px; /* Padding inside each list item */
line-height: 2; /* Adjust as needed */
font-size: 18px;
@media (max-width: 768px) {
  /* Tablet styles */
  font-size: 13px;
}
 
`;


export const span_point = styled("span")`
label:span_point;
 
font-size: 16px;
@media (max-width: 768px) {
 
  font-size: 13px;
}
 
`;