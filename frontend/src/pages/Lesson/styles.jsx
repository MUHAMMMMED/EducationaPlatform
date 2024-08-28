import styled from "@emotion/styled";

 export const ContainerLesson = styled ("div")`
 label:CardWrapper;
 justify-content: space-between;
 flex-wrap: wrap;
 font-family: 'DGBaysan', sans-serif;
 width:100%;
 margin: auto;
 background-color: #000; 
 
 @media (max-width: 768px) {
    width:100%;

 }
 `;
 
 
 
 
 export const CardWrapper = styled ("div")`
 label:CardWrapper;
 display: flex;
 justify-content: space-between;
 flex-wrap: wrap;
 font-family: 'DGBaysan', sans-serif;
 max-width: 1200px 
 margin: auto;
 padding-top:30px;
 border-radius: 50px 50px  0px  0px;
 background-color: #fff; 
 @media (max-width: 768px) {
    width:100%;
    margin-top:5px;
    border-radius: 20px 20px  0px  0px;
 
 }
 `;

 
export const Video = styled ("video")`
label:Video;
width:100%;
height: 745px;
border-radius: 10x;border: 0x;
margin-top: 1px;
@media (max-width: 768px) {
   height: 405px;
   display:block;

  
  }
`; 
 
 
 export const Banner = styled ("iframe")`
 label:Banner;
 width:100%;
 height: 745px;
 border-radius: 10x;border: 0x;
 margin-top: 1px;
 @media (max-width: 768px) {
    height: 405px;
    display:block;

 }
 `;
 export const Title = styled ("h2")`
 label:Title;
 font-size: 25px;
 font-weight: 500;
 color: #fff;
 line-height: 1.5;
 margin-top: 10px;
 margin-bottom: 5px;
 padding:15px;
 font-family: 'DGBaysan', sans-serif;

 @media (max-width: 768px) {
    font-size: 15px;
    margin-bottom: 0px;
    display:block;

 }
`;
 

 export const Content = styled ("div")`
 label:CardWrapper;
 display: flex;
 justify-content: space-between;
 border-radius: 50px 50px  0px  0px;
 width:100%;
 margin: auto;
 padding-top:30px;
 border-radius: 50px 50px  0px  0px;
 background-color: #fff; 
 padding-bottom:50px;
 @media (max-width: 768px) {
    width:100%;
    margin-top:5px;
    border-radius: 20px 20px  0px  0px;
    display:block;

 }
 `;

 export const ContentCenter = styled ("div")`
 label:CardWrapper;
 display: flex;
 justify-content: space-between;
 width:80%;
 margin: auto;
 padding-bottom:50px;
 @media (max-width: 768px) {
    width:100%;
    display:block;

 }
 `;

 
 export const Centerright  = styled ("div")`
 label:Centerright;
 width: 100%;
 margin-right: 50px;
 padding-bottom:15px;
 @media (max-width: 480px) {
   margin-right: 20px;
   padding-bottom:0px;
   display:block;

   }
 `;
 
 
 export const Centerleft  = styled ("div")`
 label:Centerleft;
 width: 100%;
 margin-left:50px;
 padding-bottom:15px;
 @media (max-width: 480px) {
   margin-left:20px;
   padding-bottom:0px;
   display:block;

   }
 `;
  
 export const NButton = styled ("button")`
 label:NButton;
 padding:10px ;
 width: 150px;
 margin: auto; 
 background:  #fff;
 color: #000;
 font-size: 15px;
 font-weight: bold; 
 border-radius: 40px;
 cursor:pointer;
 border: none;
 line-height: 1.5;
 @media (max-width: 768px) {
  padding:8px ;
  font-size: 10px;
  width: 100px;
  border-radius: 30px;
  display:block;

 }
 `; 
 
export const INdex = styled ("button")`
label:INdex;
padding:7px 20px;
background:  #fff;
color: #000;
font-size: 12px;
font-weight: bold; 
border-radius:  50px ;
border:none;
border: 1px solid  #ddd; 
@media (max-width: 768px) {
   padding:7px 20px;
   font-size: 8px;
   display:block;

}
`; 