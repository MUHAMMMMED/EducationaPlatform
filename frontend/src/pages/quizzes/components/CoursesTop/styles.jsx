
import styled from "@emotion/styled";

export const Coursestop = styled("div")`
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
      flex-wrap: wrap;
      -webkit-box-pack: initial;
      -webkit-justify-content: initial;
      justify-content: initial;
    
    }
 
`;

export const TopTitle = styled("div")`
   label:TopTitle;
   margin-top: 8px;
    @media (max-width: 768px) {
      margin-top: 15px;
      width: 100%;


    }
`;


export const MainTitle = styled("h2")`
   label:MainTitle;
   font-size: 30px;
   font-weight: 700;
   margin-bottom: 0;
   line-height: 1.4;
   margin-left: 50px;


   @media (max-width: 768px) {
      font-size:20px;
      width: 100%;
      padding:10px;
      text-align: center;
      margin-bottom: 5px;
      margin-left: 15px;

    }


`;


export const CoursesSearch = styled("div")`
   label:CoursesSearch;
   position: relative;
    width: 500px;
   margin-right: 50px;
   @media (max-width: 768px) {
       width: 95%;
       margin-left: 10%;
    }

`;


export const SearchInput = styled("input")`
  label: SearchInput;
  width: 100%;
  height: 64px;
  border: 1px solid #58a58f;
  border-radius: 5px !important;  /* Corrected to use !important */
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


export const CoursesButton = styled("p")`
   label:CoursesButton;
   position: absolute;
   width: 50px;
   height: 50px;
   line-height: 54px;
   text-align: center;
   border-radius: 8px;
   background-color: rgba(48, 146, 85, 0.2);
   border: 0;
   top:17px !important;
   right: 7px;
   font-size: 16px;
   color:#58a58f;
   @media (max-width: 768px) {
      width: 40px;
      height: 40px;
      top: 15px !important;
      right: 5px;
      border-radius: 5px;
      font-size: 16px;

   }
`;