import styled from "@emotion/styled";

export const HeadRow = styled("div")`
    label:HeadRow;
    width:100%;
    float:right;
    flex-direction: column;
   //  border-radius: 10px;
   //  border: 1px solid #686868;
    margin-bottom: 0px; 
    background:#1da29d;
    margin-top: 0px;
    padding-top: 100px;
    @media (max-width: 1200px) {}
    `;

export const HeadRowCenter = styled("div")`
        label:HeadRowCenter;
        width:100%;
        float:right;
        border-radius: 50px 50px 0px 0px  ;
        margin-top: 150px; 
       //  height:600px;
        background:#fff;
       @media (max-width: 1200px) { }
    `;





export const HeaderInfo = styled("div")`
        label:HeaderInfo;
        color: #ffffff; 
        padding: 20px; 
        text-align: center;
     
        @media (max-width: 1200px) { }
        `;


export const HeaderLogo = styled("div")`
        label:HeaderLogo;
        margin-bottom: 20px;  
        @media (max-width: 1200px) {}
        `;

export const HeaderLogoImg = styled("img")`
        label:HeaderLogo;
        max-height: 100px; /* Maximum height of the logo */
        @media (max-width: 1200px) {}
        `;




export const Title = styled("h2")`
label:Title;
padding-top: 30px;
font-size: 3rem;
text-align: center!important;
font-weight: 700!important;
width: 100%;
color:#fff;
padding-bottom: 0px;
@media (max-width: 768px) {
font-size: 1.2rem;
padding-top: 30px;
text-align: center!important;
 
 }
`;

export const H3 = styled("H4")`
label:H3;
font-weight: 600!important;
font-size:  1rem;
@media (max-width: 768px) {
   font-size: .8rem;
   font-weight: 100!important;
   line-height: 2; /* Adjust as needed */

    
    
    
   }
`;
export const Iframe = styled("iframe")`
label:Iframe;
width:95%;
margin-left:2.5%;
border-radius: 10px ;
border: none;
z-index:100;
margin-top: -150px; 
height:655px;

@media (max-width: 1200px) { height:450px;}

`;



export const SomeText = styled("div")`
label:SomeText;
margin-bottom: 15px;
padding: 4px 12px;
background-color: #3db7b0;
border-bottom: 6px solid #000;
margin-top: 20px; 
margin: 0auto;
width:40%;
margin-left:30%;
font-weight: 500!important;
border-radius: 10px ;
box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
text-align: center!important;
color: #fff;
font-size: 1rem;

@media (max-width: 1200px) {
 width:90%;
 margin-left:5%;

 font-size: .7rem;


}

`;