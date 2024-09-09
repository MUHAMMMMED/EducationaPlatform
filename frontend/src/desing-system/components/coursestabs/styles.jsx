import styled from "@emotion/styled";
import theme from "../../config";

export const LI = styled("li")`
   display: flex;
   justify-content: space-between;
   flex-wrap: wrap;
   font-family: 'DGBaysan', sans-serif;
   margin: auto;
   margin-left: 8px;


`;


export const Button = styled("button")`
    height: 60px;
    border: 1px solid rgba(48, 146, 85, 0.2);
    border-radius: 10px;
    background-color:  ${theme.white};
    color:  ${theme.primary};
    font-size: 15px;
    font-weight: 500;
    -webkit-transition: all 0.3s ease 0s;
    -o-transition: all 0.3s ease 0s;
    transition: all 0.3s ease 0s;
    padding: 0 15px;
    white-space: nowrap;

    `;