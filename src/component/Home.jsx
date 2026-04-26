import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from './Card';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Slider from './Slider';


export default function Home() {


    const [api, setapi] = useState([])
    useEffect(() => {
        handlefetch();
    }, [])

    const handlefetch = async () => {
        const res = await axios.get("https://bms-backend-96qv.onrender.com/api/data")
        console.log(res.data);

        setapi(res.data)

    }
    return (
        <div>
            <Navbar />
            {/* <h1>My Custom api Creator</h1> */}

            <Slider/>

            <h4 style={{margin:"50px 0px 10px 60px"}}>Recommended movies </h4>

            <div className="container mt-5">
                <div className="row g-4">
                    {api.map((da) => (
                        /* 1. Put the column class on the outermost element of the map */
                        <div className="col-lg-3 col-md-4 col-sm-6" key={da.id}>

                            {/* 2. Put the Link inside the column */}
                            <Link to={`/edit/${da.id}`} className="text-decoration-none text-dark">
                                <Card
                                    id={da.id}
                                    img={da.posterUrl}
                                    title={da.title}
                                    language={da.language}
                                    rating={da.rating}
                                    bannarUrl = {da.bannerUrl}
                                />
                            </Link>

                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}
