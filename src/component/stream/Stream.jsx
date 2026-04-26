import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import axios from 'axios';
import { Link } from 'react-router-dom';
// We will create this file for the dots

export default function Stream() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:3000/movies')
            .then(response => {
                setMovies(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching movies:", error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="bg-dark text-white p-5 vh-100">Loading Theater...</div>;

    return (

        <div>
            <Navbar />

            <div className="bg-white min-vh-100">
                {/* 1. FIXED: Removed position-absolute so it doesn't overlap */}


                <div id="movieHeroCarousel" className="carousel slide carousel-fade" data-bs-ride="carousel">

                    {/* 2. FIXED: Added custom-indicators class */}
                    <div className="carousel-indicators custom-indicators">
                        {movies.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                data-bs-target="#movieHeroCarousel"
                                data-bs-slide-to={index}
                                className={index === 0 ? "active" : ""}
                                aria-current={index === 0 ? "true" : "false"}
                            ></button>
                        ))}
                    </div>

                    <div className="carousel-inner">
                        {movies.map((movie, index) => (
                            <Link to={`/editall/${movie.id}`}>
                                <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={movie.id || index} data-bs-interval="5000">

                                    <section
                                        className="movie-hero d-flex align-items-center position-relative text-white"
                                        style={{
                                            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.2) 100%), url(${movie.bannerUrl})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center 20%',
                                            minHeight: '80vh', // Slightly shorter to fit sub-nav layouts better
                                        }}
                                    >
                                        {/* Video Library Button moved lower to avoid top nav */}
                                        <div className="position-absolute top-0 end-0 m-4 d-none d-md-block">
                                            <button className="btn btn-outline-light border-secondary bg-dark bg-opacity-25 px-4 py-2 rounded-3">
                                                <i className="bi bi-tv me-2"></i> Video Library <i className="bi bi-chevron-right ms-2 small"></i>
                                            </button>
                                        </div>

                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col-md-4 col-lg-3 d-none d-md-block">
                                                    <div className="card border-0 shadow-lg bg-transparent">
                                                        <img src={movie.posterUrl} className="card-img rounded-4 border border-secondary border-opacity-25" alt={movie.title} />
                                                    </div>
                                                </div>

                                                <div className="col-md-8 col-lg-7 ps-md-5">
                                                    <div className="d-flex align-items-center mb-3">
                                                        <span className="badge rounded-pill bg-white text-dark px-3 py-2 me-3">
                                                            <span className="text-danger me-2">●</span> PREMIERE
                                                        </span>
                                                        <span className="small text-white-50">Brand new releases every Friday</span>
                                                    </div>

                                                    <h1 className="display-2 fw-bold mb-3">{movie.title}</h1>

                                                    <div className="d-flex align-items-center  gap-2 mb-4 text-white-50">
                                                        <span>{movie.duration}</span> • <span>{movie.category}</span> •
                                                        <span className="border border-warning px-2 rounded-1 small text-warning">{movie.certificate}</span>
                                                    </div>

                                                    <p className="lead fs-6 opacity-75 mb-4" style={{ maxWidth: '650px' }}>
                                                        {movie.description}
                                                    </p>

                                                    <div className="d-flex gap-3">
                                                        <button className="btn btn-light btn-lg px-5 rounded-pill fw-bold">Rent Now</button>
                                                        <Link to={`/video/${encodeURIComponent(movie.trailerUrl)}`}>
                                                            <button className="btn btn-outline-light btn-lg px-5 rounded-pill fw-bold">
                                                                Trailer
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div></Link>
                        ))}
                    </div>

                    <button className="carousel-control-prev" type="button" data-bs-target="#movieHeroCarousel" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#movieHeroCarousel" data-bs-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </button>
                </div>
            </div>
        </div>
    );
}