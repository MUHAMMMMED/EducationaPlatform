
import styled from "@emotion/styled";
                                                                                                    
export const Supporterscontainer = styled ("div")`
   label:Supporterscontainer;
   width: 100%;
   float: left;

   padding:0px;
   background-color: #fff;
   margin-top:50px;
   margin-bottom: 50px;
`;


 


export const SectionTitle = styled ("div")`
   label:SectionTitle;
   width: 100%;
   margin: 0 auto;
   padding:0px;
   text-align:center;
   padding-bottom: 20px;

   `;


export const SubTitle = styled ("h5")`
   label:SubTitle;
   font-size: 20px;
   font-weight: 500;
   color:#58a58f;
   margin-bottom: 5px;
   @media (max-width: 768px) { font-size:15px; }


`;


export const MainTitle  = styled ("h2")`
   label:MainTitle;
   font-size: 35px;
   font-weight: 500;
   margin-bottom: 0;
   line-height: 1.4;
   color:#000; 
   @media (max-width: 768px) { font-size:20px; }

`;

 
export const ImageSlider = styled.div`
  position: relative;
  margin: 0px auto;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  width: 100%;
  border: 1px solid #58a58f;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
  @media (max-width: 768px) {
    width: 90%;
    margin-left:5%;
  
  }
`;



export const SlickSlideImg  = styled.img`
width: 70%;
height: auto;
margin-left: 20%;
@media (max-width: 768px) {
   width: 100%;

  
  }
`;
