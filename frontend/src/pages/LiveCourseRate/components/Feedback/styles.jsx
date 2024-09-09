
import styled from "@emotion/styled";

export const Feedbackcontainer = styled("div")`
   label:Feedbackcontainer;
    width: 100%;
   margin: 0 auto;
   padding:0px;
   background-color: #fff;
   margin-top:50px;
   margin-bottom: 50px;
`;



export const SectionTitle = styled("div")`
   label:SectionTitle;
   width: 100%;
   margin: 0 auto;
   padding:0px;
   text-align:center;
   padding-bottom: 20px;

   `;


export const SubTitle = styled("h5")`
   label:SubTitle;
   font-size: 20px;
   font-weight: 500;
   color:#58a58f;
   margin-bottom: 5px;
   @media (max-width: 768px) { font-size:15px; }

`;


export const MainTitle = styled("h2")`
   label:MainTitle;
   font-size: 35px;
   font-weight: 500;
   margin-bottom: 0;
   line-height: 1.4;
   color:#000; 
   @media (max-width: 768px) { font-size:30px; }

`;



export const TestimonialWrapper = styled("div")`
label:TestimonialWrapper;
display: -webkit-box;
display: -webkit-flex;
display: -ms-flexbox;
display: flex;
-webkit-box-pack: justify;
-webkit-justify-content: space-between;
-ms-flex-pack: justify;
justify-content: space-between;
-webkit-box-align: center;
-webkit-align-items: center;
-ms-flex-align: center;
align-items: center;
padding-top: 10px;

`;





export const Singletestimonial = styled("div")`
label:Singletestimonial;
   text-align: center;
    border: 1px solid rgba(48, 146, 85, 0.2);
    border-radius: 10px;
    padding: 45px 45px 40px;
    position: relative;
    width:100%;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
    @media (max-width: 768px) {
      width:90%;
      margin-left:5%;
      padding: 25px 25px 20px;
    }
`;


export const AuthorThumb = styled("div")`
label:AuthorThumb;
position: relative;
width:100%;

`;








export const AuthorThumbImg = styled("img")`
label:AuthorThumbImg;
display: block;
width: 90px;
height: 90px;
border: 1px solid rgba(48, 146, 85, 0.2);
border-radius: 50%;
padding: 8px;
margin: 0 auto;

`;

export const AuthorThumbSpen = styled("spen")`
label:AuthorThumbSpen;
width: 30px;
height: 30px;
line-height: 30px;
text-align: center;
background-color: #309255;
color: #fff;
font-size: 13px;
border-radius: 50%;
display: inline-block;
position: absolute;
bottom: -13px;
left: 0;
right: 0;
margin: 0 auto;

`;




export const RatingStar = styled("span")`
label:RatingStar-star;
position: relative;
display: inline-block;
margin-top: 35px;
`;



export const RatingBar = styled("span")`
label:RatingBar-star;
    color: #ffba00;
    font-size: 14px;
    letter-spacing: 2px;
    width: 80%;
`;


export const TestimonialContentP = styled("p")`
label:TestimonialContentP;
font-size: 15px;
   color: #52565b;
   font-weight: 400;
   margin-bottom: 0;
`;



export const TestimonialContentName = styled("h4")`
label:TestimonialContentName;
font-size: 22px;
font-weight: 500;
margin-bottom: 0;
margin-top: 16px;
`;

export const TestimonialContentDesignation = styled("P")`
label:TestimonialContentDesignation;
font-size: 14px;
font-weight: 400;
color: #309255;
margin-top: 5px;
display: block;
`;

