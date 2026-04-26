import React from 'react'

export default function Slider() {

   const bannerHeight = "300px"; 

    // Container style for the side margins
    const containerStyle = {
        marginTop: "30px", // Space from the navbar
        paddingLeft: "60px", // Left margin
        paddingRight: "60px", // Right margin
    };

    const carouselStyle = {
        borderRadius: "8px", // The rounded corners from your image
        overflow: "hidden",   // Ensures the image follows the rounded corners
    };

    const imageStyle = {
        height: bannerHeight,
        width: "100%",
        objectFit: "cover",
    };

    return (
        /* Standard div instead of container-fluid for better control */
        <div style={containerStyle}>
            <div 
                id="carouselExampleIndicators" 
                className="carousel slide shadow-sm" 
                data-bs-ride="carousel"
                style={carouselStyle}
            >
                {/* Indicators */}
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></button>
                </div>

                {/* Slides */}
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="3000">
                        <img 
                            className="d-block w-100" 
                            src="https://i.pinimg.com/736x/96/16/6d/96166dc527781eb7c9f8608056227e5a.jpg" 
                            alt="Slide 1" 
                            style={imageStyle}
                        />
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img 
                            className="d-block w-100" 
                            src="https://i.pinimg.com/1200x/ec/13/44/ec1344b1184b3277a71299f244feed89.jpg" 
                            alt="Slide 2" 
                            style={imageStyle}
                        />
                    </div>
                </div>

                {/* Left/Right Buttons */}
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
}