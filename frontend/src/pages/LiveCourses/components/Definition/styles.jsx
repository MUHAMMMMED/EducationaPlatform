import styled from "@emotion/styled";
 
export const DefinitionRow = styled ("div")`
    label:DefinitionRow;
    width:60%;
    margin:0 auto; 
    padding: 10px;
    @media (max-width: 785px) {
      width:98%;
       }
       @media (max-width: 1200px) {
        width:98%;
         }
    `;
 
 
    
    export const Samp_en = styled ("samp")`
    label:Samp;
    float: left;
    padding: 1rem;
    color: #fff;
    width: 100%;
    line-height: 2 ;
    font-weight: 400!important;
    font-family: sans-serif;
    font-family: 'DGBaysan', sans-serif;
    text-align: left;
    @media (max-width: 768px) {
      /* Tablet styles */
      font-size: 13px;
    
    }
    @media (max-width: 1200px) {
       font-size: 15px;
       line-height: 2; /* Adjust as needed */
     
     }
    `;
    export const Samp_ar = styled ("samp")`
    label:Samp;   
     text-align: right;

    float: right;
    padding: 1rem;
    color: #fff;
    width: 100%;
    line-height: 2 ;
    font-weight: 400!important;
    font-family: sans-serif;
    font-family: 'DGBaysan', sans-serif;
    @media (max-width: 768px) {
      /* Tablet styles */
      font-size: 13px;
    
    }
    @media (max-width: 1200px) {
       font-size: 15px;
       line-height: 2; /* Adjust as needed */
     
     }
    `;

    export const P_ar = styled ("p")`
    label:P;
    text-align: right;
    font-size: 20px;
    color: #fff;
    width: 100%;
    font-weight: 400;
    @media (max-width: 768px) {
      /* Tablet styles */
      font-size: 13px;
    
    }
    @media (max-width: 1200px) {
       font-size: 15px;
       line-height: 2; /* Adjust as needed */
     
     }
    `;


    export const P_en = styled ("p")`
    label:P;
    text-align: left;
    font-size: 20px;
    color: #fff;
    width: 100%;
    font-weight: 400;
    @media (max-width: 768px) {
      /* Tablet styles */
      font-size: 13px;
    
    }
    @media (max-width: 1200px) {
       font-size: 15px;
       line-height: 2; /* Adjust as needed */
     
     }
     
    `;
  

 