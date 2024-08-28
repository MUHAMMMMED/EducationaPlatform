import styled from "@emotion/styled";
import theme from "../../config";

export const SingleReview = styled.div`
  background-color: #fff;
  /* border: 1px solid #e0e0e0; */
  border-radius: 8px;
  margin: auto;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  /* border: 1px solid  ${theme.primary}; */
  @media (max-width: 768px) {
   padding: 10px;
     }
`;

export const ReviewAuthor = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

export const AuthorThumb = styled.div`
    margin-right: 15px;
    display: block;
    border: 1px solid  ${theme.primary};
    border-radius: 50%;
    padding: 3px  3px 0px 2px;
`;

export const IMG = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  @media (max-width: 768px) {
   width: 35px;
  height: 35px;
     }
`;

export const AuthorContent = styled.div`
margin-top:1px;
@media (max-width: 768px) {
   margin-top:  5px;
 }
`;

export const Name = styled.h3`
  margin: 0;
  color: #333;
  
  @media (max-width: 768px) {
   margin-top: 3px;
   font-size: 14px;
     }
`;





export const SPEN = styled.span`
    color: #ffba00;
`;

export const P = styled.p`
  color: ${theme.padding};
  padding: 5px;
  font-size: 18px;
  text-align:center;
  @media (max-width: 768px) {
   font-size: 13px;
   margin-top:-10px;
     }
`;
