import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div>
            {/* Main Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
                <div className="container-fluid">
                    {/* Logo */}
                    <img 
                        src='https://upload.wikimedia.org/wikipedia/commons/7/75/Bookmyshow-logoid.png' 
                        alt='BookMyShow' 
                        style={{ width: "140px", height: "40px", marginLeft: "50px" }} 
                    />

                    {/* Mobile Toggler */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {/* 1. The Search Container - flex-grow-1 makes this fill all empty space */}
                        <div className="flex-grow-1 mx-lg-5 mx-3">
                            <input 
                                className="form-control w-100" 
                                type="search" 
                                placeholder="Search for Movies, Events, Plays, Sports and Activities" 
                                aria-label="Search" 
                            />
                        </div>

                        {/* 2. The Right Side (Sign In & Menu) */}
                        <div className="d-flex align-items-center">
                            <button className="btn btn-danger px-4 py-1" type="submit" style={{ whiteSpace: "nowrap" }}>
                                Sign In
                            </button>
                            
                            {/* Corrected Toggler for the side menu */}
                            <button className="btn ms-2 d-lg-inline-block d-none" type="button">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Secondary Navbar (Categories) */}
            <nav className="navbar navbar-expand-lg " >
                <div className="container-fluid px-5">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link to="/explore/movies-chennai" className="nav-link  small" >Movies</Link></li>
                        <li className="nav-item"><Link to="/explore/stream" className="nav-link  small" >Stream</Link></li>
                        <li className="nav-item"><Link to="/explore/event" className="nav-link  small" >Events</Link></li>
                        <li className="nav-item"><a className="nav-link  small" href="#">Plays</a></li>
                        <li className="nav-item"><a className="nav-link  small" href="#">Sports</a></li>
                        <li className="nav-item"><a className="nav-link  small" href="#">Activities</a></li>
                        <li className="nav-item"><Link to="/sports/tata-ipl-2026" className="nav-link  small" >Tata IPl 2026</Link></li>
                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item"><a className="nav-link  fs-6" href="#">ListYourShow</a></li>
                        <li className="nav-item"><a className="nav-link  small" href="#">Corporates</a></li>
                        <li className="nav-item"><a className="nav-link  small" href="#">Offers</a></li>
                        <li className="nav-item"><a className="nav-link  small" href="#">Gift Cards</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}