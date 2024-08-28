import styled from "@emotion/styled";
 
export const Container = styled ("div")`
    label:Container;
    width:70%;
    margin: 0 auto;
    margin-top: 150px; 
    color: #262626;
    display: flex;
    flex-direction: column;
    gap: 20px;
    border-radius: 10px;
   //  padding: 40px 50px;
   //  background-color: red; 
    font-family: 'Poppins', sans-serif;
    border: 1px solid #686868;
    margin-bottom: 150px; 


    @media (max-width: 768px) {
        /* Apply styles for screens up to 768px wide (typical tablet size) */
        width:  97%;
        padding:0px;
        border-radius: 0px;
        border: 0px solid #686868;
        margin-top:  20px; 

       }
    
      @media (max-width: 480px) {
        /* Apply styles for screens up to 480px wide (typical mobile size) */
        width: 97%;
        padding: 0px;
        border-radius: 0px;
        border: 0px solid #686868;
        margin-top:  20px; 

       }
    `;
 
    
 export const Head = styled ("div")`
    label:Head;
    width: 100%;
    margin:0px; 

    float:left;
    background: #553f9a; 
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
       font-size: 17px;
       font-weight: 500; 
       @media (max-width: 768px) {
         font-size: 13px;

        }

    
       `; 
 export const Time = styled ("p")`
   label:Time;
   margin-top:25px; 
   font-size: 18px;
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
    background: #707070; 
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
    height:2px;
    font-size: 22px;
    padding:15px;
    font-weight: 500; 
    @media (max-width: 768px) {
        /* Apply styles for screens up to 768px wide (typical tablet size) */
        font-size: 20px;
        padding-left:5px;
        margin-bottom: 40px; 
        text-align: left;


       }
 `; 

 
 export const Iframe = styled ("iframe")`
    label:Iframe;
    width:100%;
    height:455px;
    margin-bottom: 50px; 

    @media (max-width: 768px) {
        /* Apply styles for screens up to 768px wide (typical tablet size) */
        width:100%;
        height:300px;
      
       }
 `; 
 export const Video = styled ("video")`
    label:Video;
    width:100%;
    margin-bottom: 50px; 
      
       }
 `; 

 export const Img = styled ("img")`
    label:Img;
    width:100%;
    margin: auto;
       }
 `; 
 export const UL = styled ("ul")`
    label:UL;
    width:95%;
    margin: auto;
    padding:0px;


 `; 
 export const LI = styled ("li")`
    label:LI;
    float:right;
    margin:0px; 
    width:49%;
    margin-right: 1%; 
    margin-bottom: 20px; 
    list-style-type: none; 
    align-items:center;
    height:50px;
    padding-left:15px;
    border: 1px solid #686868;
    border-radius: 0px;
    margin-bottom: 20px; 
    font-size: 18px;
    cursor:pointer;
    @media (max-width: 768px) {
        /* Apply styles for screens up to 768px wide (typical tablet size) */
        width: 100%;
        font-size: 15px;
        height:40px;
        margin-bottom: 10px; 
      
       }
 `; 


 export const  LIButton = styled ("div")`
    label:LIButton;
    width:94%;
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
   width: 100%;
   height:56px;
   background: #553f9a; 
   color: #fff;
   font-size: 25px;
   font-weight: 500; 
   border-radius: 0px;
   cursor:pointer;
   @media (max-width: 768px) {
 
    font-size: 20px;
    height:46px;
 


   }
`; 

export const Span = styled ("div")`
label:Span;
margin-top:10px; 
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
font-size:20px;
font-weight: 500; 
border-radius: 0px;
cursor:pointer;

@media (max-width: 768px) {
 font-size: 17px;
 
}
`; 