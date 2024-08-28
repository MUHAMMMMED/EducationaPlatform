import styled from "@emotion/styled";

 
export const Timer = styled ("div")`
        label:DefinitionRow;
        width:85%;
        margin:0 auto; 
        padding: 10px;
        background-color:red;

        @media (max-width: 1200px) {
          width:98%;
          margin-top: 50px;

           }
        `;
 
     
export const Countdown = styled ("h2")`
        label:Countdown;
        padding-top: 30px;
        font-size: 2rem;
        text-align: center!important;
        font-weight: 700!important;
        width: 100%;
        color:#fff;
        padding-bottom:  0px;
        @media (max-width: 1200px) {
        font-size: .8rem;
        padding-top: 0px;
      

         }
        `;

 




 
 export const CountButton = styled.button`
          label: CountButton;
          background-color: #2d7586;
          color: #fff;
          border: none;
          padding: 20px 100px;
          font-size: 18px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
          &:hover {
            background-color:#ffff; /* Change to desired hover background color */
            color: #000; /* Change to desired hover text color */
            box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
          }
        
          @media (max-width: 1200px) {
            font-size: 16px; /* Adjusted font size for smaller screens */
            padding: 15px 30px; /* Adjusted padding for smaller screens */
            width: 70%;
          }
        `;
        


 

      export const  P = styled ("P")`
        label:PS;
        padding-top:  0px;
        font-size: 1rem;
        text-align: center!important;
        font-weight: 100!important;
        width: 100%;
        color:#fff;
        padding-bottom:  0px;
        @media (max-width: 768px) {
        font-size: .7rem;
        margin-top:  -20px;
      
  

         }
        `;