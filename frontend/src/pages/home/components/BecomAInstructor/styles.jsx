import styled from "@emotion/styled";

export const Categorytitle = styled("div")`
  label: Categorytitle;
  float: left;
  width: 100%;
  padding-top: 80px;

  @media (max-width: 768px) {
 
  }
`;

export const Categorywrapper = styled("div")`
  label:Categorywrapper;
  background-color: #fff;
  border-radius: 10px;
  padding: 25px;
  padding-top: 40px;
  position: relative;
  margin-top: 80px;
  width: 100%;  
  border: 1px solid #58a58f;
  float: left;
  height: 230px;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
  @media (max-width: 768px) {
    width: 90%;  
    margin-left:5%;
    height: auto;
}
`;

export const CategoryImageWrapper = styled.div`
  flex-grow: 1;
  float:left;
  margin-right: 20px;

`;

export const CategoryImage = styled.img`
  width: 340px;
  height: auto;
  @media (max-width: 768px) {
    width: 100%;  
 
}

`;

export const CategoryTextWrapper = styled.div`
  flex-grow: 1;
`;

export const SubTitle = styled("p")`
  label: SubTitle;
  font-size: 15px;
  font-weight: 500;
  color:#58a58f;
  margin-top: 5px;
`;

export const MainTitle = styled("h3")`
  label: MainTitle;
  font-size: 27px;
  font-weight: 500;
  margin-bottom: 0;
  line-height: 1.4;
  @media (max-width: 768px) {
    font-size: 20px;
    line-height: 1.4;
    text-align:center;
}
`;

export const MainTitleSpan = styled("span")`
  label: MainTitle;
  color: #58a58f;
  position: relative;
`;
export const SubTitleP = styled("p")`
  label: SubTitle;
  font-size: 17px;
  font-weight: 200;
  color: #000;
  margin-bottom: 0px;
  line-height: 1.8;
  padding: 20px;
  padding-top: 5px;
  @media (max-width: 768px) {
    font-size: 15px;

}
`;
export const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 10px;
  width:100%;

  @media (max-width: 768px) {
 

    float:left;
}

`;

export const BtnPrimary = styled("button")`
label: BtnPrimary;
    font-weight: 700;
    display: inline-block;
    font-family: "Gordita";
    font-weight: 500;
    line-height: 2.75rem;
    text-align: center;
    /* text-decoration: none;
    vertical-align: middle;
    cursor: pointer; */
  
    /* background-color: transparent;
    border: 0 solid transparent; */
    padding: 0 2.188rem;
    font-size: 1.125rem;
    border-radius: 5px;
    background-color: #58a58f;
    border-color: #58a58f;
    color: #fff;
    margin-left: 350px;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
 
    &:hover {
    background-color:   #58a58f;
    color: #ffff; 
  }


  @media (max-width: 768px) {
    margin-left: 0px;

}




`;



