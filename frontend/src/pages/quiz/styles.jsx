import styled from "@emotion/styled";

export const Containerq = styled("div")`
    label:Container;
    width:  90%;
    margin: 0 auto;
    margin-top: 50px; 
    color: #ffff;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 10px;
    font-family: 'Poppins', sans-serif;
    border: 2px solid #d1ae20; 
    margin-bottom: 150px; 
    border-radius: 8px;
    background-repeat: no-repeat ;
    background-position: center ;
    height:  50%;
    opacity:3; 
  

    @media (max-width: 768px) {
        /* Apply styles for screens up to 768px wide (typical tablet size) */
        width: 97%;
        padding:0px;
        border-radius: 0px;
        border: 0px solid #686868;
        margin-top: 80px; 

       }
    
      @media (max-width: 480px) {
        /* Apply styles for screens up to 480px wide (typical mobile size) */
        width: 97%;
        padding: 0px;
        border-radius: 0px;
        border: 0px solid #686868;
        margin-top: 80px; 

       }
    `;


export const Head = styled("div")`
    label:Head;
    width: 100%;
    margin:0px; 
    float:left;
    background:#d1ae20; 
    border-radius: 5px 5px  0px  0px ;
    color: #fff;
    `;


export const Row = styled("div")`
    label:Head;
    width: 70%;
    float:left;
    padding-left:15px;

    `;

export const H4 = styled("h4")`
       label:H4;
       margin-top:12px; 
       font-size: 15px;
       font-weight: 500; 
       @media (max-width: 768px) { font-size: 13px; }
        
       `;
export const Time = styled("p")`
   label:Time;
   margin-top:14px; 
   font-size: 16px;
    width: 100%;
    text-align: left;
    @media (max-width: 768px) {
      font-size:9.5px;
     }
     
`;

export const HR = styled("div")`
    label:HR;
    height:1px;
    border: none;
    background: #707070; 
    margin-top:0px; 

 `;


export const Ques = styled("div")`
    label:Ques;
    width:90%;
    margin: auto;
    margin-bottom: 50px; 
    @media (max-width: 768px) {
      width:98%;
      margin: auto;
     }
 `;




export const H2 = styled("h2")`
    label:H2;
    width:99%;
    font-size: 22px;
    padding:  15px ;
    font-weight: 500;
    margin-top: 20px; 
    margin-bottom: 30px; 
    text-align: left;
    color: #fff;
    border: 2px solid #d1ae20; 
    border-radius:20px;

    @media (max-width: 768px) {
        font-size: 20px;
        padding-left:5px;
        margin-bottom: 10px; 
        text-align: left;
        margin-top: 0px; 


       }
 `;


export const Iframe = styled("iframe")`
    label:Iframe;
    width:99%;
    margin: auto;
    height:455px;
    margin-bottom: 5px; 
    border: 2px solid #d1ae20; 
    border-radius:20px;
    @media (max-width: 768px) {
        width:100%;
        height:250px;
        margin-bottom: 10px; 
       }
 `;
export const Video = styled("video")`
    label:Video;
    width:99%;
    margin-bottom: 5px; 
    @media (max-width: 768px) {
      margin-bottom: 10px; 
     }


     
 `;

export const Img = styled("img")`
    label:Img;
    width:99%;
    margin: auto;
    margin-bottom: 5px; 
    border: 2px solid #d1ae20; 
    border-radius:20px;
    @media (max-width: 768px) {
      margin-bottom: 10px; 
     }
       
 `;
export const UL = styled("ul")`
    label:UL;
    width:90%;
    margin: auto;
    padding:0px;
    margin-left: 5%; 


 `;
export const Q_LI = styled("button")`
    label:Q_LI;
    float:left;
    margin:0px; 
    width:49%;
    margin-right: 1%; 
    margin-bottom: 20px; 
    list-style-type: none; 
    align-items:center;
    height:auto;
    padding:3px;
    border: 2px solid #d1ae20; 
    border-radius: 50px;
    margin-bottom: 20px; 
    font-size: 15px;
    cursor:pointer;
    @media (max-width: 768px) {
        width: 99%;
        font-size: 15px;
        margin-bottom: 25px; 
        margin-bottom: 25px; 

       }
 `;





export const LIButton = styled("div")`
    label:LIButton;
    width:90%;
    margin: auto;
    margin-right:5%; 
    @media (max-width: 768px) {
      margin-bottom: 10px; 
      width:95%;
      margin: auto;
      margin-right:3.5%; 
     
       }
 `;


export const Button = styled("button")`
   label:Button;
   margin: auto; 
   width: 99%;
   height:40px;
   background:#d1ae20; 
   color: #fff;
   font-size: 20px;
   font-weight: 500; 
   border-radius: 50px;
   cursor:pointer;
   border:none;
   @media (max-width: 768px) {
    font-size: 20px;
    height:46px;
 
   }
`;

export const SPan = styled("spen")`
label:SPan;
float:left;
font-weight: 700; 
margin-top: 0px; 
border-radius: 50px;
padding:10px 15px 10px 15px   ;
background:#d1ae20;
color: #fff;

 
`;

export const Index = styled("div")`
label:Index;
width: 100%;
margin: auto; 
font-size:18px;
text-align: center;
padding-bottom: 15px; 
`;
export const Result = styled("div")`
label:Result;
width: 90%;
float: left;
font-size:18px;
padding-bottom: 15px; 
text-align: center;
@media (max-width: 768px) {
   font-size: 20px;
   text-align: left;
   width: 100%;

  }

`;
export const BUtton = styled("button")`
label:Button;
margin: auto; 
width: 100%;
padding:5px 20px 5px 20px; 
background: #553f9a; 
color: #fff;
font-size:17px;
font-weight: 500; 
border-radius: 0px;
cursor:pointer;
@media (max-width: 768px) {
 font-size: 17px;
}
`;

export const ButtonBack = styled("button")`
label:ButtonBack;
margin: auto; 
width: 210px;
margin-left: 15px; 
height:40px;
background: #d1ae20;
color: #fff;
font-size: 17px;
font-weight: 500; 
border-radius: 50px;
cursor:pointer;
border:none;
border: 3px solid #ffff; 
margin-bottom: 15px;

@media (max-width: 768px) {
 font-size: 20px;
 height:46px;
 width: 70%;
 margin-left:15%; 



}
`; 
