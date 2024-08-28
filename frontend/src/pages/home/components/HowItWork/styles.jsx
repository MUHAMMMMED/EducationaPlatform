
import styled from "@emotion/styled";
                                                                                                    
export const HowItwork = styled ("div")`
   label:HowItwork;
    width: 100%;
   margin: 0 auto;
   padding:0px;
   background-color: #fff;
   margin-top:50px;
   margin-bottom: 50px;
   @media (max-width: 768px) {  margin-top: 0px;}
`;


export const Sectioncenter = styled ("div")`
   label:Sectioncenter;
    width: 100%;
   margin: 0 auto;
   padding:0px;
   background-color: #fff;


`;
  


export const SectionTitle = styled ("div")`
   label:SectionTitle;
   width: 100%;
   margin: 0 auto;
   padding:0px;
   text-align:center;

`;
export const SubTitle = styled ("h5")`
   label:SectionTitle;
   font-size: 20px;
   font-weight: 500;
   color:#666ee8;
   margin-bottom: 00px;

`;
export const MainTitle  = styled ("h2")`
   label:MainTitle;
   font-size: 35px;
   font-weight: 500;
   margin-bottom: 0;
   line-height: 1.4;
   color:#58a58f; 
   @media (max-width: 768px) { font-size:30px; }
  
   
`;
 
 
 
export const HowItWorkWrapper = styled("div")`
  /* Base styles */
  label: HowItWorkWrapper; /* This can be removed if not used */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;

  @media (max-width: 768px) {
    width: 90%;
    margin-left:5%;
    display: ;
    flex-wrap: wrap;
    -webkit-box-pack: initial;
    -webkit-justify-content: initial;
    justify-content: initial;
    padding-top: 0px;


  }
`;
 


export const SingleWork  = styled ("div")`
label:SingleWork;
padding: 20px;
 width: 300px;
border-radius: 10px;
background-color:#fff;
padding: 38px;
padding-bottom: 35px;
margin-top: 30px;
overflow: hidden;
position: relative;
z-index: 1;
border: 1px solid  #58a58f;
box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);

@media (max-width: 768px) {
   width:100%;
 float:left;
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


`;


  



export const WorkContent  = styled ("div")`
label:WorkContent;
padding-top: 13px;
`;
 

export const WorkContentTitle  = styled ("h3")`
label:WorkContentTitle;
font-size: 25px;
font-weight: 500;
color: #212832;
margin-bottom: 0;
`;
export const WorkContentP  = styled ("p")`
label:WorkContentP;
font-size: 14px;
color: #696969;
margin-bottom: 0;
margin-top: 15px;
`;
 


export const WorkArrow  = styled ("p")`
label:WorkArrow;
font-size: 40px;
color: #58a58f; 
display:block;

@media (max-width: 768px) {
   display:none;
 }
`;