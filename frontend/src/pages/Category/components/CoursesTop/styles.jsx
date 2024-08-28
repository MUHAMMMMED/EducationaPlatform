
import styled from "@emotion/styled";



export const Coursestop = styled ("div")`
   label:Coursestop;
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
   margin-bottom:  37px;
   font-family: inherit;
   font-size: inherit;
   line-height: inherit;

   @media (max-width: 768px) {
      width: 100%;
      margin-left:0%;
      display: ;
      flex-wrap: wrap;
      -webkit-box-pack: initial;
      -webkit-justify-content: initial;
      justify-content: initial;
    
  
    }
 
`;

export const TopTitle = styled ("div")`
   label:TopTitle;
   margin-top: 0px;
`;


export const MainTitle = styled ("h2")`
   label:MainTitle;
   font-size: 30px;
   font-weight: 700;
   margin-bottom: 0;
   line-height: 1.4;
   margin-left: 50px;


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
    width: 500px;
   margin-right: 50px;
   @media (max-width: 768px) {
       width: 95%;
       margin-left: 10%;
    }

`;

export const SearchInput  = styled ("input")`
   label:SearchInput;
   width: 100%;
   height: 64px;
   border: 1px solid #58a58f;
   border-radius: 10px!!important;
   padding: 0 30px;
   padding-right: 90px;
   outline: none;
   -webkit-transition: all 0.3s ease 0s;
   -o-transition: all 0.3s ease 0s;
   transition: all 0.3s ease 0s;
   background-color: red;

   @media (max-width: 768px) {
      height: 50px;
      border-radius: 5px;

   }

`;
 
export const CoursesBUtton = styled ("div")`
   label:CoursesBUtton;
   // position: absolute;
   width: 50px;
   height: 50px;
   // line-height: 54px;
   text-align: center;
   border-radius: 10px;
   // background-color: rgba(48, 146, 85, 0.2);
   background-color: red;

   border: 0;
   // top:25px;
   right: 7px;
   font-size: 16px;
   color:#58a58f;
   @media (max-width: 768px) {
      // width: 40px;
      // height: 40px;
      // // top: -11px;
      // right: 5px;
      // border-radius: 5px;
      // font-size: 16px;

   }
`;
 

 