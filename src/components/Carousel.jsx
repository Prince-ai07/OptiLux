import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const Mycarousel = () => {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-10 mx-auto">
            <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
       
        {/* Indicators */}
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" className="active"></button>
          <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1"></button>
          <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2"></button>
         <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="3"></button>

        </div>

        {/* Slides */}
        <div className="carousel-inner">

          <div className="carousel-item active">
            <div className="carousel-overlay"></div> {/* 👈 ADD THIS */}

            <img
              src="/images/carousel1.avif"
              className="d-block w-100 carousel-img"
              alt="First slide"
            />
            <div
                  className="carousel-caption"
                  style={{
                    top: '50%',
                    transform: 'translateY(-50%)',
                    animation: 'fadeIn 1s ease'
                  }}
                >
                  <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>
                    See the World in Style 👓
                  </h1>
                  <p style={{ fontSize: '18px' }}>
                    Premium eyewear that defines your personality
                  </p>

                  <button
                    onClick={scrollToProducts}
                    className="hero-btn"
                  >
                    Explore Specs
                  </button>
                </div>
          </div>

          <div className="carousel-item">
            <img
              src="/images/carousel2.avif"
              className="d-block w-100 carousel-img"
              alt="Second slide"
              height="450px"
            />
            <div
                  className="carousel-caption"
                  style={{
                    top: '50%',
                    transform: 'translateY(-50%)',
                    animation: 'fadeIn 1s ease'
                  }}
                >
                  <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>
                    See the World in Style 👓
                  </h1>
                  <p style={{ fontSize: '18px' }}>
                    Premium eyewear that defines your personality
                  </p>

                  <button
                    onClick={scrollToProducts}
                    className="hero-btn"
                  >
                    Explore Specs
                  </button>
                </div>
          </div>

          <div className="carousel-item">
            <img
              src="/images/carousel3.avif"
              className="d-block w-100 carousel-img"
              alt="Third slide"
              height="450px"
            />
            <div
                  className="carousel-caption"
                  style={{
                    top: '50%',
                    transform: 'translateY(-50%)',
                    animation: 'fadeIn 1s ease'
                  }}
                >
                  <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>
                    See the World in Style 👓
                  </h1>
                  <p style={{ fontSize: '18px' }}>
                    Premium eyewear that defines your personality
                  </p>

                  <button
                    onClick={scrollToProducts}
                    className="hero-btn"
                  >
                    Explore Specs
                  </button>
                </div>
          </div>
	<div className="carousel-item">
            <img
              src="/images/carousel4.webp"
              className="d-block w-100 carousel-img"
              alt="Third slide"
              height="450px"
            />
            <div
                  className="carousel-caption"
                  style={{
                    top: '50%',
                    transform: 'translateY(-50%)',
                    animation: 'fadeIn 1s ease'
                  }}
                >
                  <h1 style={{ fontSize: '3rem', fontWeight: 'bold' }}>
                    See the World in Style 👓
                  </h1>
                  <p style={{ fontSize: '18px' }}>
                    Premium eyewear that defines your personality
                  </p>

                  <button
                    onClick={scrollToProducts}
                    className="hero-btn"
                  >
                    Explore Specs
                  </button>
                </div>
          </div>



        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon"></span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon"></span>
        </button>

      </div>
        </div>
      </div>
    </div>
  )
}

export default Mycarousel;