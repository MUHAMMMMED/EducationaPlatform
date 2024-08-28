import styled from "@emotion/styled";
import theme from "../../../../config";
 


  

export const SingleCourses = styled.div`
  label: SingleCourses;
  margin-top: 0px;
  /* border: 1px solid${theme.gray}; */
  border-radius: 15px;
  padding: 20px;
  -webkit-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  width:33% ;/* Adjusted width to make space between cards */
    margin-bottom: 20px; /* Added margin between cards */
 
  @media (max-width: 768px) {
    width: calc(100% - 20px); /* Adjust width for tablet screens */
  }
 
`;

  
 export const CoursesImages = styled ("div")`
    label:CoursesImages;
    position: relative;
 `; 
 export const IMG = styled ("img")`
   label:IMG;
   width: 100%;
   border-radius: 10px;
   border: 1px solid  #58a58f;
  

`; 

 export const CoursesContent = styled ("div")`
    label:CoursesContent;
    padding-top: 25px;


 `; 
 export const CoursesAuthor  = styled ("div")`
    label:CoursesAuthor ;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    `; 

    export const AUthor = styled ("div")`
    label:AUthor;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
 `; 
 export const AuthorThumb = styled ("div")`
 label:AuthorThumb;

`; 
export const ImgAvatar = styled ("img")`
label:ImgAvatar;
width: 50px;
height: 50px;
border-radius: 50%;
border: 1px solid  #58a58f;  
`; 


  
export const AuthorName = styled ("div")`
label:AuthorName;
-webkit-box-flex: 1;
-webkit-flex: 1;
-ms-flex: 1;
flex: 1;
padding-left:8px;
color: ${theme.balck};
 
font-size: 14px;
font-weight: 400;
hight:100px;

`; 
export const Tag = styled ("div")`
label:Tag;

height: 35px;
line-height: 35px;
background-color: #eefbf2; 
border-radius: 5px;
font-size: 11px;
color:#58a58f;
display: inline-block;
text-align: center;
border-radius: 5px;
padding: 0 10px;
font-weight: bold;
`; 
export const Title = styled ("h4")`
label:Title;
font-size: 15px;
font-weight: 500;
color: ${theme.balck};
margin-top: 13px;
padding-bottom: 15px;
height: 50px;
display: inline-block;
line-height: 1.4;
`; 
export const CoursesMeta = styled ("div")`
label:CoursesMeta;
display: -webkit-box;
display: -webkit-flex;
display: -ms-flexbox;
display: flex;
-webkit-box-pack: justify;
-webkit-justify-content: space-between;
-ms-flex-pack: justify;
justify-content: space-between;
padding-top: 10px;
`; 


export const Span = styled ("span")`
label:CoursesPriceReview;
font-size: 14px;
font-weight: 400;
color:  ${theme.balck};
margin-right: 20px;
display: inline-block;
line-height: 1;
`; 

 

export const CoursesPriceReview = styled ("div")`
label:CoursesPriceReview;
// background-color: #eefbf2; 
border-radius: 5px;
align-items: center;
margin-top: 20px;
width:100%;  
padding: 15px 20px;
display: flex;
justify-content: space-between;
flex-wrap: wrap;
font-family: 'DGBaysan', sans-serif;
box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.07);


`; 

export const CoursesPrice = styled ("div")`
label:CoursesPrice;
white-space: nowrap;
width:50%;  

`; 
export const SaleParice = styled ("span")`
label:SaleParice;
font-size: 17px;
font-weight: 700;
color:#58a58f; 
width:100%;  
margin-right: 10px; 

`; 
export const Oldparice = styled ("span")`
label:Oldparice;
font-size: 15px;
font-weight: 500;
color: ${theme.gray};
text-decoration: line-through;
width:100%;  
margin-left: 2px;
`; 

export const CoursesButton = styled ("div")`
label:CoursesReview;
width:40%; 
 
`; 
 
export const RatingCount = styled ("span")`
label:RatingCount;
font-size: 15px;
font-weight: 500;
color: #212832;
margin-right: 2px;
`; 
export const RatingStar = styled ("span")`
label:RatingStar;
position: relative;


`; 
export const Button = styled ("button")`
label:Button;
border-radius: 5px;
background-color:#58a58f;
border: none;
color: #ffff;
padding: 10px 8px;
font-size: 10px;
cursor: pointer;
width:100%;  
font-weight: 700;

`; 
export const ContainerCenter = styled ("div")`
label:ContainerCenter;
display: flex;
flex-wrap: wrap;
justify-content: space-between;   

`; 
export const IconText = styled ("div")`
label:IconText;
display: flex;
align-items: center;
margin-bottom: 10px;


`; 
export const Icon= styled ("div")`
label:Icon;
margin-right: 10px; 
color: #58a58f;



`; 

export const Last= styled ("spen")`
label:Last;
font-size: 10px;
  
`; 
