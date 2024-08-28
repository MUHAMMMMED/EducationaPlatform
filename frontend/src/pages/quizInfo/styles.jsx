import styled from "@emotion/styled";
import theme from "../../desing-system/config";
  








export const CardWrapper = styled ("div")`
label:CardWrapper;
display: flex;
justify-content: space-between;
flex-wrap: wrap;
font-family: 'DGBaysan', sans-serif;
max-width: 1200px 
margin: auto;
margin-top:0px;
background-color:#000; 
@media (max-width: 768px) {
   width:100%;
   margin-top:5px;
}
`;

 
export const Content = styled ("div")`
   label:Content;
   display: flex;
   flex-wrap: wrap;
   font-family: 'DGBaysan', sans-serif;
   width:100%;
   margin: auto;
   margin-top:15px;
   background-color:#fff; 
   border-radius: 50px  50px 0px 0px ;
   @media (max-width: 768px) {
      width:100%;
      margin-top:5px;
      border-radius: 20px  20px 0px 0px ;

   }
`;
 
export const RowInfo = styled ("div")`
   label:RowInfo;

   flex: 0 0 auto;
   width:70%; 
    border-radius: 5px;
    margin-top: 23px;
   @media (max-width: 768px) {
      width:100%;
   }

`;
export const Banner = styled ("iframe")`
   label:Banner;
   width:100%;
   height: 745px;
   border-radius: 10x;
   @media (max-width: 768px) {
      height: 405px;
   }
`;
 
export const Title = styled ("h2")`
   label:Title;
   width:100%;
   font-size: 25px;
   font-weight: 500;
   color:  ${theme.white}; 
   line-height: 1.5;
   margin-top: 7px;
   margin-bottom: 5px;
   padding:6px;
   text-align:center;
   font-family: 'DGBaysan', sans-serif;
   @media (max-width: 768px) {
      font-size: 15px;
   }
`;
 

export const InfoAuthor = styled ("div")`
   label:InfoAuthor;
   justify-content: space-between;
   display: flex;
   width: 90%; 
   margin: auto;
   margin-bottom: 20px;  
   @media (max-width: 768px) {
      font-size: 17px;
      width: 95%; 
      display: blank;
   }
`;
export const AuthorItem = styled ("div")`
   label:AuthorItem;
    width:auto; 
   @media (max-width: 768px) {
      font-size: 17px;
      width: 100%; 
   }
`;


export const Enroll = styled ("div")`
   label:Enroll;
   font-size: 14px;
   font-weight: 400;
   color:${theme.gray}; 
   margin-top: 18px;
   display: inline-block;
   line-height: 22px;
   @media (max-width: 768px) {
      font-size: 11px;
      width: 100%; 
   }
`;
 
export const Sidebar = styled ("div")`
label:Sidebar;
height: 560px;
margin-top:0px;
flex: 0 0 auto;
width: 30%;  
@media (max-width: 768px) {
   width:100%;
   height: auto;
 }

`;


export const SidebarWidget = styled ("div")`
label:SidebarWidget;
width:70%;
float :left;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
border: 1px solid #f3f3f3; 
margin-left: 30px;
padding: 10px ;
border-left: 0px solid ${theme.primary}; 
border-right: 0px solid ${theme.primary}; 
border-radius:10px;
margin-top:110px;
 

@media (max-width: 768px) {
   margin-top: 10px;

   width:90%;
   margin-left:5%;
 }

`;

export const InfoPrice = styled ("div")`
   label:InfoPrice;
   text-align: center;
    background-color: ${theme.secondary}; 
   width:100%;
   border-radius:4px;
`;
export const Price = styled ("span")`
   label:Price;
   font-size: 30px;
   font-weight: 700;
   padding:10px ;
   color: ${theme.primary} ;
   display: block;

`;
 
export const UL = styled ("ul")`
   label:UL;
   // border-top: 1px solid ${theme.gray};
   margin-top:5px;
   width:100%;
   flaot:left;
   padding: 0px ;
   @media (max-width: 768px) {
     
      width:100%;
    }
`;
export const LI = styled("li")`
  label: LI;
  /* border-bottom: 1px solid  ${theme.gray}; */
  padding: 8px 0;
  display: list-item;  
  width:95%;
  margin-left:5%;
  text-align: -webkit-match-parent;
  list-style-type: none; /* Hide the bullet point */
  @media (max-width: 768px) {
    width:100%;
    }
`;
export const Strong = styled("strong")`
  label: Strong;
  color:  ${theme.third}; 
   font-size: 16px;
   font-weight: 500;
   @media (max-width: 768px) {
      font-size: 13px;
      width:90%;
    }
`;


export const Span = styled("span")`
  label: Span;
  color:  ${theme.gray};
   font-size: 15px;
   padding:15px;
`;

 

export const InfoBtn = styled("div")`
  label: InfoBtn;
  text-align: center;
    margin-top: 40px;
`;
export const Button = styled("button")`
  label: Button;
   background-color:  ${theme.primary}; 
   border-color: ${theme.primary}; 
   display: inline-block;
   font-weight: 500;
   line-height: 3.05rem;
   color:  ${theme.white}; 
   text-align: center;
   text-decoration: none;
   vertical-align: middle;
   cursor: pointer;
    /* padding: 0 2.188rem; */
    font-size: 1.125rem;
    border-radius:3px;
    border :none;
    width:100%;
   `;


 
 
 

export const TabDescription = styled ("div")`
   label:TabDescription;
   margin-top: 25px;
   width:100%;
`;


export const DescriptionWrapper = styled ("div")`
   label:DescriptionWrapper;
   margin-top: 25px;
   margin-left: 50px ;
   @media (max-width: 768px) {
      margin-top: 25px;
      margin-left: 13px ;
    }

`;
 
export const P = styled ("p")`
   label:P;
   margin-bottom: 14px;
   margin-top:  5px;
   color: #52565b;
   font-size: 15px;
   font-weight: 400;
   line-height: 2;
   padding-left:20px ;
   width:90%;
   @media (max-width: 768px) {
      font-size: 13px;
      width:90%;
    }
`;

 
export const  SectionRate = styled("div")`
label: SectionRate;
border-radius: 50px 50px  0px  0px;
background-color: rgb(92 137 141); 
position: relative;
float:left;
overflow: hidden;
width:100%;
padding-bottom: 50px;  
 margin-top: -50px;   
padding-top:50px  ;
@media (max-width: 768px) {
 border-radius: 20px 20px  0px  0px;  padding-bottom:  50px;  
}

`;



export const  Section = styled("div")`
label: Section;
border-radius: 50px 50px  0px  0px;
background-color: rgb(92 137 141); 
position: relative;
float:left;
overflow: hidden;
width:100%;
padding-bottom: 250px;  
 margin-top:  50px;   
padding-top:50px  ;
@media (max-width: 768px) {
 border-radius: 20px 20px  0px  0px;
}

`;


export const ReviewsSection = styled("div")`
label: ReviewsSection;
border-radius: 50px 50px  0px  0px;
background-color: ${theme.white}; 
position: relative;
float:left;
overflow: hidden;
width:100%;
margin-bottom: 50px;  
margin-top: -150px;  
padding-top:50px  ;
@media (max-width: 768px) {
 border-radius: 20px 20px  0px  0px;
}

`;

export const H2 = styled ("h2")`
label:H3;
font-size: 35px;
font-weight: 500;
color:  ${theme.balck}; 
line-height: 1.5;
padding-bottom: 15px;
padding-top:10px;
text-align:center;
font-family: 'DGBaysan', sans-serif;
@media (max-width: 768px) {
 font-size: 15px;
}
`;


export const H4 = styled.h2`
color: #000;  
font-weight: 700;
text-align: center;
margin-bottom:  1rem; 
fontSize:35px;

`;




