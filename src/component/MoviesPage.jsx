
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from './Card';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Slider from './Slider';
import ProductFilter from './MovieFilter';

export default function MoviesPage() {
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

           <ProductFilter/>

            

        </div>
    )
}
