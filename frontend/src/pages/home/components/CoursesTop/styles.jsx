
import styled from "@emotion/styled";



export const Coursestop = styled ("div")`
   label:Coursestop;
   float:left;
   margin-bottom:  37px;
   font-family: inherit;
   font-size: inherit;
   line-height: inherit;
   width: 90%;
   margin-top:20px;
   margin-left:5%;

   @media (max-width: 768px) {
      margin-left:5%;
      width: 90%;

    
  
    }
 
`;

export const TopTitle = styled ("div")`
   label:TopTitle;
   margin-top: 15px;
   float:left;
   width: 50%;
   text-align: left;
   @media (max-width: 768px) {
      width:100%;
      

    }
`;


export const MainTitle = styled ("h2")`
   label:MainTitle;
   font-size: 30px;
   font-weight: 700;
   margin-bottom: 0;
   line-height: 1.4;
   text-align: left;
 
   @media (max-width: 768px) {
      margin-left: 0px;
      font-size:20px;
      width: 100%;
      padding:10px;
      text-align: center;
      margin-bottom: 15px;
      margin-left: 15px;

    }


`;

 
export const CoursesSearch = styled ("div")`
   label:CoursesSearch;
   position: relative;
    width: 50%;
    float:left;
   @media (max-width: 768px) {
       width: 100%;

    }

`;

export const SearchInput  = styled ("input")`
   label:SearchInput;
   width: 100%;
   height: 64px;
   border: 1px solid #58a58f;
   border-radius: 15px!!important;
   padding: 0 30px;
   padding-right: 90px;
   outline: none;
   -webkit-transition: all 0.3s ease 0s;
   -o-transition: all 0.3s ease 0s;
   transition: all 0.3s ease 0s;

   @media (max-width: 768px) {
      height: 50px;
      border-radius: 5px;

   }

`;
 
export const CourseSButton = styled ("p")`
   label:CourseSButton;
   position: absolute;
   width: 50px;
   height: 50px;
   line-height: 54px;
   text-align: center;
   border-radius: 10px;
   background-color: rgba(48, 146, 85, 0.2);
 
   border: 0;
   top: 12px;
   right: 7px;
   font-size: 16px;
   color:#58a58f;
   @media (max-width: 768px) {
      width: 40px;
      height: 40px;
      top: 10px;
      right: 5px;
      border-radius: 5px;
      font-size: 16px;

   }
`;
 

 