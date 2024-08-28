import styled from "@emotion/styled";
  
export const CoursesTabsMenu = styled ("div")`
   label:CoursesTabsMenu;
   border-radius: 10px;
   margin-top: 0px;
   position: relative;
   width:100%;
   margin-bottom:  50px;
`;



export const UL = styled ("ul")`
label:UL;
position: relative;
width:100%;
margin:auto;
border-radius: 10px;
padding: 22px 15px;
box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
&:hover { color: #fff;
}
`;


export const LI = styled ("li")`
   label:LI;
   display: flex;
   font-family: 'DGBaysan', sans-serif;
   margin: auto;
   width:365px;
   box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;   
   border: 1px solid #58a58f;
   border-radius: 8px;
   text-align: left;
   padding: 20px    ;  
 
   &:hover { 
   background-color: #58a58f;
   color: #fff;
 }

 @media (max-width: 768px) {
   width: 95%;
 }

   `;

    
 
export const WorkIcon  = styled ("div")`
label:WorkIcon;
width: 65px;
height: 65px;
line-height: 68px;
text-align: center;
border: 1px solid rgba(48, 146, 85, 0.2);
border-radius: 10px;
color: #58a58f;
display: inline-block;
font-size: 32px;
-webkit-transition: all 0.3s ease 0s;
-o-transition: all 0.3s ease 0s;
transition: all 0.3s ease 0s;
background-color:#eefbf2;
&:hover {  
background-color: #58a58f;
color: #fff;
border: 1px solid #fff;
}

`;
export const P = styled ("P")`
   label:P;
   font-size: 18px;
   font-weight: 700;
   text-align: left;
   margin-top:10px;
   margin-left:5px;
   &:hover { color: #fff;
   } 
   `;
   
   export const Samp = styled ("samp")`
   label:Samp;
   font-size: 15px;
   font-weight: 600;
   text-align: left;
   margin-top:20px;
   color: #58a58f;
   &:hover { color: #fff;
   }
 
   `;