import styled from "@emotion/styled";

export const ReviewBDIV = styled("div")`
  label: ReviewBDIV;
  float: left;
  width: 100%;
`;

export const Reviewwrapper = styled("div")`
  label:Reviewwrapper;
  border-radius: 10px;
  padding: 15px;
  width: 50%;  
  margin-left:25%;
  border: 1px solid #58a58f;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
  @media (max-width: 768px) {
    margin-left:5%;
    width: 90%; 
 }
`;

export const ReviewImageWrapper = styled.div`
   float:left;
   width: 100%;  
`;

export const ReviewImage = styled.img`
   width: 100%;
   height: auto;
   border: 1px solid #58a58f;
   border-radius: 10px;
  @media (max-width: 768px) {
    width: 100%;  
}
`;

export const ReviewTextWrapper = styled.div`
  /* flex-grow: 1; */
`;

export const ReviewSubTitle = styled("p")`
  label: SubTitle;
  font-size: 15px;
  font-weight: 500;
  color:#58a58f;
  margin-top: 5px;
  width: 100%;  
`;

export const ReviewMainTitle = styled("h3")`
  label: MainTitle;
  font-size: 27px;
  font-weight: 500;
  margin-bottom: 0;
  line-height: 1.4;
  width: 100%;  
  text-align:center;
  @media (max-width: 768px) {
    font-size: 20px;
    line-height: 1.4;
    text-align:center;
}
`;

export const ReviewMainTitleSpan = styled("span")`
  label: MainTitle;
  color: #58a58f;
  position: relative;
  text-align:center;

`;
export const ReviewSubTitleP = styled("p")`
  label: SubTitle;
  font-size: 17px;
  font-weight: 200;
  color: #000;
  margin-bottom: 0px;
  line-height: 1.8;
  padding: 20px;
  padding-top: 5px;
  width: 100%;  
  text-align:center;
  @media (max-width: 768px) {
    font-size: 15px;
}
`;
export const ReviewButtonWrapper = styled.div`
  text-align: center;
  margin-top: 10px;
  width:100%;
  @media (max-width: 768px) {
 float:left;
}
`;

export const ReviewBtnPrimary = styled("button")`
    label: ReviewBtnPrimary;
    font-weight: 700;
    display: inline-block;
    font-family: "Gordita";
    font-weight: 700;
    line-height: 2.75rem;
    text-align: center;
    padding: 0 2.188rem;
    font-size: 1.125rem;
    border-radius: 5px;
    background-color: #58a58f;
    border-color: #58a58f;
    color: #fff;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
    width:50%;
    &:hover {
    background-color: #58a58f;
    color: #ffff; 
  }
  @media (max-width: 768px) {
    width:70%;
}
`;



