import styled from "@emotion/styled";

export const LinkContainer = styled.div`
 justify-content: center;  
 max-width: 1200px;
 margin: auto;
 padding-bottom:22px;

`;

export const MaterialLink = styled.a`
    color: #58a58f;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #58a58f;
    text-decoration: none;
    font-weight: bold;
    margin-top:0;
    font-size:15px;

    &:hover { background-color: #58a58f; color: #ffffff;    }
    @media (max-width: 768px) {
    margin: auto;
    width:  200px;
    padding: 4px;
    margin-top:-10;
    margin-left:5px;
    font-size:13px;

}
`;


