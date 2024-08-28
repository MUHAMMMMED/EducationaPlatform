import styled from "@emotion/styled";
 
 
export const Card = styled ("div")`
   label:Card;
   display: flex;
   justify-content: space-between;
   flex-wrap: wrap;
   font-family: 'DGBaysan', sans-serif;
   max-width: 1200px 
   margin: auto;
   padding:5px;
   &:hover {
      border: 1px solid  rgb(27 127 204 / 5%);
       background-color: rgb(27 127 204 / 5%); /* Change the background color on hover */
    }
`;

export const ContentCard = styled ("div")`
   label:ContentCard;
   display: flex;
   width: 100%; 
   font-size: 16px;
   font-weight: 500;
 

`;
 
export const SPAN = styled ("span")`
   label:SPAN;
   font-size: 20px;
   width: 30px;
   color: #333;
   margin-top:1px;
   @media (max-width: 768px) {
      font-size: 17px;
   }
`;
export const H2 = styled ("h2")`
   label:H2;
   font-size: 15px;
   font-weight: 500;
   color: #212832;
   line-height: 1.5;
   font-family: 'DGBaysan', sans-serif;
   padding:0px;
   margin:0;
   @media (max-width: 768px) {
      font-size: 13px;
   }
`;

export const Minutes = styled ("div")`
   label:Minutes;
   justify-content: space-between;
   display: flex;
   width: 100%; 
   font-size: 13px;
   border-radius: 10x;
   color:#636363;
   padding:2px;
`;
export const DIV = styled ("div")`
   label:DIV;
   align-items: center; 
`;

export const StyledButton = styled ("button")`
 
  label: StyledButton;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 10px;
  font-size: 10px;
  font-weight: bold;
  background-color:#58a58f;  
  color: #fff;  
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #58a58f; /* Example hover background color */
  }

  svg {
    margin-right: 8px; /* Adjust the space between the icon and text */
    font-size: 10px;
  }
  @media (max-width: 768px) {
   padding: 7px 7px;
   font-size: 9px;
}

`;









 