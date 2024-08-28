
import styled from "@emotion/styled";
  
export const List = styled ("div")`
   label:List;
    width:100%;
    border: 0px solid #3092552e; 
    margin-bottom:0px;
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;


`;

 

export const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 10px;
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

  
  &:hover {
    background-color:   #58a58f;
    color: #ffff; 
  }
`;
export const No_Available = styled.div`
 
float: left;
 margin-top: 50px;
 width: 100%;
 color: #58a58f;
 padding: 30px;
 background-color: #fff;
 box-shadow: 0 3rem 6rem rgba(0, 0, 0, 0.1);
 transition: 0.2s;
 font-size: 20px;
 border: 1px solid rgba(48, 146, 85, 0.2);
 margin-bottom:150px;

`;