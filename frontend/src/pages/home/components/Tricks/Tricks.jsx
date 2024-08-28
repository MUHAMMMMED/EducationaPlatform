 
import React from 'react'
import {Trickscontainer,SectionTitle,SubTitle,MainTitle } from './styles';
import TricksCard from './components/TricksCard/TricksCard';


export default function Tricks({tip}) {
  return (
  
    <Trickscontainer>
            <SectionTitle>
            <SubTitle>Latest News</SubTitle>
            <MainTitle>  Tips &<span style={{color:"#58a58f" }}>  Tricks</span></MainTitle> </SectionTitle>
            <TricksCard tip={tip} />   
    </Trickscontainer>
      );}
    
    





 