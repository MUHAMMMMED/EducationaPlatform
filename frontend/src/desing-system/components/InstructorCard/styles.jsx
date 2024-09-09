import styled from "@emotion/styled";
import theme from "../../config";

export const Card = styled("div")`
   label:Card;
   -ms-flex: 0 0 auto;
   flex: 0 0 auto;
   width:25%;
   margin-right:20px;

   @media (max-width: 768px) {
      width: 100%;
   }
`;


export const SingleTeam = styled("div")`
   label:SingleTeam;
   margin-top: 35px;
  
`;

export const TeamThumb = styled("div")`
   label:TeamThumb;
   -ms-flex: 0 0 auto;
   flex: 0 0 auto;
   width: 200px;
   height: 200px;
   margin : auto;
`;


export const IMG = styled("img")`
   label:IMG;
   border-radius: 50%;
   padding: 10px;
   width: 100%;
   height: 100%;
   border: 1px solid rgba(48, 146, 85, 0.2);
   -webkit-transition: all 0.3s ease 0s;
   -o-transition: all 0.3s ease 0s;
   transition: all 0.3s ease 0s;
   &:hover {
      border: 1px solid #309255;
     }


`;

export const TeamContent = styled("div")`
   label:TeamContent;
   padding-top:5px;
   text-align:center;
 
`;
export const H4 = styled("h4")`
   label:H4;
   text-align:center;
   font-size: 15px;
   font-weight: 500;
   color:  ${theme.gray};
   line-height: 1.5;
   font-family: 'DGBaysan', sans-serif;
   padding:0px;
   margin:0;
   @media (max-width: 768px) {
      font-size: 17px;
   }
`;

export const Designation = styled("span")`
   label:Designation;
   text-align:center;
   width: 100%; 
   display: block;
   font-size: 14px;
   color: ${theme.primary};
   margin-top: 10px;
  
`;
export const P = styled("p")`
label:P;
text-align:center;
width: 100%; 
display: block;
font-size: 14px;
color: ${theme.primary};
margin-top: 10px;

`;
