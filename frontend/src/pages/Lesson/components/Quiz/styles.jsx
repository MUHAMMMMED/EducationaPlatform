import styled from "@emotion/styled";
export const Container = styled ("div")`

margin: 0 auto;
margin-top:10px; 
color: #262626;
display: flex;
flex-direction: column;
gap: 20px;
border-radius:  0px;
box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

font-family: 'Poppins', sans-serif;
 border: 1px solid #fff;
padding:3px;
border-radius: 8px;
   background-repeat: no-repeat 
   background-position: center 
   width:  100%;
   height:  50%;
   opacity:3; 
 
@media (max-width: 768px) {
    width:  98%;
    box-shadow:none;

   }
 
 
`;


export const Con  = styled ("div")`
label:Con;
padding:0px;
padding-top:5px;
padding-left:18px;
border-radius: 8px;
color: #fff;

@media (max-width: 768px) {
   padding-left:0px;
   
  }
`;









export const Containerq = styled ("div")`
    label:Container;
    width:80%;
    margin: 0 auto;
    margin-top: 50px; 
    color: #262626;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 10px;
    font-family: 'Poppins', sans-serif;
   //  border: 1px solid #686868;
    margin-bottom: 150px; 



    @media (max-width: 768px) {
        /* Apply styles for screens up to 768px wide (typical tablet size) */
        width:  97%;
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
 
    
export const Head = styled ("div")`
    label:Head;
    width: 100%;
    margin:0px; 
    float:left;
    border-radius: 10px;
    border-radius: 10px 10px  0px  0px ;
    color: #fff;
    `; 
    

export const Row = styled ("div")`
    label:Head;
    width: 70%;
    float:left;
    padding-left:15px;

    `; 
   
export const H4 = styled ("h4")`
       label:H4;
       margin-top:12px; 
       font-size: 15px;
       font-weight: 500; 
       @media (max-width: 768px) { font-size: 13px; }
        
       `; 
 export const Time = styled ("p")`
   label:Time;
   margin-top:14px; 
   font-size: 16px;
    width: 100%;
    text-align: left;
    @media (max-width: 768px) {
      font-size:9.5px;

     }
     
`; 

 export const HR = styled ("div")`
    label:HR;
    height:1px;
    border: none;
   //  background: #707070; 
    margin-top:0px; 

 `; 

 
 export const Ques = styled ("div")`
    label:Ques;
    width:80%;
    margin: auto;
    margin-bottom: 50px; 
    @media (max-width: 768px) {
      width:98%;
      margin: auto;
     }
 `; 






 export const H2 = styled ("h2")`
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
        /* Apply styles for screens up to 768px wide (typical tablet size) */
        font-size: 20px;
        padding-left:5px;
        margin-bottom: 10px; 
        text-align: left;
        margin-top: 0px; 


       }
 `; 

 
 export const Iframe = styled ("iframe")`
    label:Iframe;
    width:99%;
    margin: auto;
    height:455px;
    margin-bottom: 50px; 
    border: 2px solid #d1ae20; 
    border-radius:20px;
    @media (max-width: 768px) {
        /* Apply styles for screens up to 768px wide (typical tablet size) */
        width:100%;
        height:250px;
        margin-bottom: 10px; 
       }
 `; 
 export const Video = styled ("video")`
    label:Video;
    width:99%;
    margin-bottom: 50px; 
      
    @media (max-width: 768px) {
      margin-bottom: 10px; 
     }


       }
 `; 

 export const Img = styled ("img")`
    label:Img;
    width:99%;
    margin: auto;
    margin-bottom: 50px; 
    border: 2px solid #d1ae20; 
    border-radius:20px;
    @media (max-width: 768px) {
      margin-bottom: 10px; 
     }
       }
 `; 
 export const UL = styled ("ul")`
    label:UL;
    width:100%;
    margin: auto;
    padding:0px;


 `; 
 export const LI = styled ("button")`
    label:LI;
    float:left;
    margin:0px; 
    width:49%;
    margin-right: 1%; 
    margin-bottom: 20px; 
    list-style-type: none; 
    align-items:center;
    height:auto;
   //  padding-left:15px;
    padding:3px;

    border: 2px solid #d1ae20; 
    border-radius: 50px;
    margin-bottom: 20px; 
    font-size: 15px;
    cursor:pointer;
    @media (max-width: 768px) {
        /* Apply styles for screens up to 768px wide (typical tablet size) */
        width: 99%;
        font-size: 15px;
      //   height:40px;
        margin-bottom: 10px; 
      
       }
 `; 


 export const  LIButton = styled ("div")`
    label:LIButton;
    width:90%;
    margin: auto;
    margin-right:3.5%; 

    @media (max-width: 768px) {
      margin-bottom: 10px; 
      width:95%;
      margin: auto;
      margin-right:3.5%; 
     
       }
 `; 


 export const Button = styled ("button")`
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

export const SPan = styled ("spen")`
label:SPan;
float:left;
font-weight: 700; 
margin-top: 0px; 
border-radius: 50px;
padding:10px 15px 10px 15px   ;
background:#d1ae20;
color: #fff;

 
`; 

export const Index = styled ("div")`
label:Index;
width: 100%;
margin: auto; 
font-size:18px;
text-align: center;
padding-bottom: 15px; 
`; 
export const Result = styled ("div")`
label:Result;
width: 90%;
margin: auto; 
font-size:18px;
padding-bottom: 15px; 
text-align: center;
@media (max-width: 768px) {
   font-size: 20px;
   height:46px;
   text-align: left;

  }

`; 
export const BUtton = styled ("button")`
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


 

export const CenterBut  = styled ("div")`
label:Con;
padding:0px;
width: 20%;
margin: 0 auto;
@media (max-width: 480px) {
 width: 80%;
 
  }
`;






export const NButton = styled ("button")`
label:NButton;

width: 100%;
height:40px;
margin: auto; 
background:  #666ee8;
color: #fff;
font-size: 18px;
font-weight: 500; 
border-radius: 2px;
cursor:pointer;
border: none;


@media (max-width: 768px) {
 /* Apply styles for screens up to 768px wide (typical tablet size) */
 font-size: 16px;
 height:35px;
 width: 100%;
 margin: auto; 
 
 
}
`; 
 
export const Buttonqiuz = styled ("button")`
label:Buttonqiuz;

width: 100%;
height:40px;
margin: 0 auto; 
background:#58a58f;
color: #fff;
font-size: 18px;
font-weight: 500; 
border-radius: 50px;
cursor:pointer;
border: none;
margin-top: 0px; 
margin-bottom:  0px; 

@media (max-width: 768px) {
 /* Apply styles for screens up to 768px wide (typical tablet size) */
 border-radius: 20px;
 font-size: 15px;
 height:30px;
 width: 100%;
 margin-top: 35px; 
 margin-bottom: -250px; 
 
}
`; 
 

export const Refresh = styled ("button")`
label:Refresh;

padding:4px  20px ;
margin: auto; 
background:  #f00;
color: #fff;
font-size: 15px;
font-weight: 500; 
border-radius: 30px;
cursor:pointer;
border: none;
margin-left:20px;


@media (max-width: 768px) {
 /* Apply styles for screens up to 768px wide (typical tablet size) */
 font-size: 16px;
 margin: auto; 
 
 
}
`; 