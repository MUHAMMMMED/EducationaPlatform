import styled from "@emotion/styled";
import theme from "../config";

export const SingleReview = styled.div`

  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 50px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: auto;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  border: 1px solid  ${theme.primary};
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
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  @media (max-width: 768px) {
   width: 50px;
  height: 50px;
     }
`;

export const AuthorContent = styled.div``;

export const Name = styled.h3`
  margin: 0;
  color: #333;
  @media (max-width: 768px) {
   margin-top: 25px;
   font-size: 17px;
     }
`;

export const SPEN = styled.span`
    color: #ffba00;
    margin-top:  0px;
`;

export const P = styled.p`
  color: ${theme.padding};
  padding: 20px;
  font-size: 20px;
  text-align:center;


  @media (max-width: 768px) {
   font-size: 14px;
   margin-top:-10px;
     }
`;
