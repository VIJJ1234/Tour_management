import React from "react";
import ServiceCard from "./ServiceCard";
import { Col } from "reactstrap";

import weatherImg from '../assets/images/weather.png';
import guideImg from '../assets/images/guide.png';
import customizationImg from '../assets/images/customization.png'


const servicedata=[
    {

        imgUrl : weatherImg,
        title : "Calculate Weather",
        desc : "lorem lets go to explore the wordl!!"
        
    },
    {
        imgUrl : guideImg,
        title : "Best Tour Guide",
        desc : "lorem lets go to explore the world!!"
    },
    {
        imgUrl : customizationImg,
        title : "Customization Service",
        desc : "lorem lets go to explore the world!!"
    }
  
    
    
]
const ServiceList=()=>{
    return(
       <>
       
       {
        servicedata.map((item,index)=> (<Col lg='3' md='6' sm='12' className='mb-4' key={index}>
            <ServiceCard item={item}/>
        </Col>)
       )}
       
       </>
    );
};

export default ServiceList;