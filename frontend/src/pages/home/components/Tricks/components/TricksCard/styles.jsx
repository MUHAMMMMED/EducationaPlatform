import styled from "@emotion/styled";




export const WRapper = styled("div")`
  label:WRapper;
  position: relative;
  float:left;
  width: 30%;  
  margin-left: 2%;
  padding: 0px;
  /* margin-top: 15px; */
  height:auto; 
  border:  1px solid #58a58f;  
  border-radius: 5px;
  border-right:  4px solid #58a58f;  
  margin-bottom: 15px;

   @media (max-width: 768px) {
    float:left;

    margin-top:  110px;
    margin-bottom: 150px;

    margin-left: 0%;
    width: 100%;  
    margin:auto;
  }
`;

export const ImageWrapper = styled.div`
  flex-grow: 1;
  float:left;
  margin: 0px;
  margin-right: 0px;
  padding:0px;
  width:100%;

  @media (max-width: 768px) {
    margin-right:0px;
    float:left;
    margin-top:  0px;
  }
`;

export const Image = styled.img`
  padding:0px;
  height:auto; 
  margin: 0px;
  width:100%;
  border-radius: 5px;

  @media (max-width: 768px) {
 width:100%;  
 height:auto;
 float:left;
  }
`;

export const TextWrapper = styled.div`
  flex-grow: 1;
  padding:10px;
  @media (max-width: 768px) {
    float:left;
    height:auto; 
  }

`;

export const Categorytitle = styled("div")`
  label: Categorytitle;
  float: left;
  width: 90%;
  padding-top: 80px;
  @media (max-width: 768px) {
    padding-top: 5px;
   }
`;




export const SubTitle = styled("p")`
  label: SubTitle;
  font-size: 15px;
  font-weight: 500;
  color:#58a58f; 
  margin-top: 30px;
  @media (max-width: 768px) {text-align:center; }


`;

export const MainTitle = styled("h3")`
  label: MainTitle;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 5px;
  text-align:center; 
  @media (max-width: 768px) {  font-size: 18px;}
 
`;

export const MainTitleSpan = styled("span")`
  label: MainTitle;
  color: #58a58f; 
  position: relative;
`;
export const SubTitleP = styled("p")`
  label: SubTitle;
  font-size: 15px;
  font-weight: 200;
  color: #000;
  margin-bottom: 0px;
  line-height: 1.8;
  padding-left:  5px;
  padding-right: 10px;
  padding-top: 0px;
  text-align:center; 

  @media (max-width: 768px) {text-align:center;   padding-right: 0px;  padding: 5px;   font-size: 15px;  }


`;




export const ButtonWrapper = styled.div`
  text-align: center;
  padding-top: 25px;
  width:100%;
`;

export const ButtonshowMore = styled.button`
 
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-weight: 500;
    border: 1px solid  #58a58f;
    color: #58a58f;
    background-color:  #fff;
    line-height: 1.8rem;
    padding:0 2rem;
    font-size: .9rem; 
    margin-bottom:15px;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
    border-right:  5px solid #58a58f;  
    border-bottom:  5px solid #58a58f;  

  &:hover {
    background-color:   #58a58f;
    color: #ffff; 
    border-right:  5px solid #fff;  
    border-bottom:  5px solid #fff;  
  }
  @media (max-width: 768px) {
    margin-bottom:15px;
 
  }  
`;

export const ButtoNWrapper = styled.button`
 
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-weight: 500;
    border: 1px solid  #58a58f;
    color: #58a58f;
    background-color:  #fff;
    line-height: 1.8rem;
    padding:0 2rem;
    font-size: .9rem; 
    margin-bottom:15px;
    box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);
    border-right:  5px solid #58a58f;  
    border-bottom:  5px solid #58a58f;  
    margin-bottom: 70px;

  &:hover {
    background-color:   #58a58f;
    color: #ffff; 
    border-right:  5px solid #fff;  
    border-bottom:  5px solid #fff;  
  }
  @media (max-width: 768px) {
    margin-bottom: 70px;
 
  }  
`;