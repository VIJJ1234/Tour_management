import React from "react"; 

import '../styles/Home.css'
import {Container,Row,Col} from 'reactstrap';
import heroImg from '../assets/images/hero-img01.jpg'
import heroImg2 from '../assets/images/hero-img02.jpg'
import heroVideo from '../assets/images/hero-video.mp4'
import Subtitle from "../shared/Subtitle";
import worldImg from "../assets/images/world.png";
import experienceImg from "../assets/images/experience.png";
import SearchBar from "../shared/SearchBar";
import ServiceList from "../services/ServiceList";
import FeaturedTourList from "../components/Featured-tours/featuredTourLisr";
import MasonryImagesGallery from "../components/Image-gallery/MasonryImagesGallery";
import Testimonials from "../components/testimonial/Testimonials";
import Newsletter from "../shared/Newsletter";

const Home=()=>{
  return(
    <>
    <section>
      <Container>
        <Row>
          <Col lg='6'>
          <div className="hero__content">
            <div className="hero__subtitle d-flex align-items-center">
              <Subtitle subtitle={'Know before You Go'}/>
              <img src={worldImg} alt="" />
            </div>
            <h1>Travelling Opens The door to creating{""}
              <span className="highlight"> memories</span>
            </h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus natus in iusto! Dolorem pariatur nisi voluptatum doloribus, recusandae earum exercitationem laboriosam incidunt expedita laudantium dicta facere odit voluptatibus, aspernatur aliquid.</p>
          </div>
      
          </Col>
          <Col lg='2'>
          <div className="hero__img-box">
            <img src={heroImg} alt="" />
            </div>
          </Col>
          <Col lg='2'>
            <div className="hero__img-box hero__video-box">
              <video
                src={heroVideo}
                controls
                autoPlay
                muted
                loop
                className="video"
              />
            </div>
          </Col>
          <Col lg='2'>
          <div className="hero__img-box" mt-5>
            <img src={heroImg2} alt="" />
            </div>
          </Col>


        <SearchBar/>
        </Row>
      </Container>
    </section>

    {/* Hero section start */}

    <section>
      <Container>
        <Row>
          <Col lg='3'>
          <h5 className="services__subtitle">What we serve</h5>
          <h2 className="services__title">We offer our best services</h2> 
          </Col>

         <ServiceList/>
          </Row>
          </Container>   

    </section>
    

    {/* ================TOUR SECTION START========= */}

    <section>
      <Container>
        <Row>
          <Col lg="12">
          <Subtitle subtitle={'Explore'}/>
          <h2 className="featured__tour-titel">OUR FEATURED TOURS</h2>
          </Col>
          <FeaturedTourList/>

        </Row>
      </Container>
    </section>

                  {/* EXPERIENCE SECTION STARTED */}
      <section>
        <Container>
          <Row>
            <Col lg='6'>
            <div className="experience__content">
              <Subtitle subtitle={"Experience"}/>
              <h2>
                with our all experience <br />we will serve you
              </h2>
              <p>
                Lorem ipsum dolor sit amet consectetur <br />
                 adipisicing elit. 
              </p>
            </div>
            <div className="counter__wrapper d-flex align-items-center gap5">
              <div className="counter__box">
                <span>12K+</span>
                <h6>Successful Trip </h6>
              </div>  


              <div className="counter__box">
                <span>2K+</span>
                <h6>Regular Clients </h6>
              </div>



              <div className="counter__box">
                <span>15</span>
                <h6>    Year Experience </h6>
              </div>
            </div>
          </Col>
          <Col lg='6'>
          <div className="experience__img">
            <img src={experienceImg} alt="" />
          </div>
          
          </Col>
          </Row>
        </Container>
      </section>
{/* EXPERIENCE OVER............... */}

{/* GALLARY START.......... */}


      <section>
        <Container>
          <Row>
            <Col lg="12">
            <Subtitle subtitle={'Gallery'}/>
            <h2 className="gallery__title">Visit our customers tour gallery </h2>
              </Col>
              <Col lg='12'>
                <MasonryImagesGallery/>
              </Col>
          </Row>
        </Container>
      </section>

      {/* Gallery is end=================== */}
      {/* TESTIMOTIONAL SECTION START ==========*/}

      <section>
        <Container>
          <Row>
            <Col lg='12'>
            <Subtitle subtitle={"Fans Love"}/>
            <h2 className="testimonial__title">What our fans say about us</h2>
            
            </Col>
            <Col lg='12' >
            <Testimonials/>
            
            
           </Col>
          </Row>
        </Container>
      </section>

      {/* testimonial end */}

      <Newsletter/>

    </>

  );
};
export default Home