import React from 'react'
import { Link } from 'react-router-dom'



export default function Card(props) {
    return (
        <div className="card h-100 border-0 shadow-sm bg-transparent">
            {/* We remove the fixed width so it fills the Bootstrap Column correctly */}
            <img 
                src={props.img} 
                className="card-img-top shadow" 
                alt={props.title} 
                style={{ 
                    height: '380px', 
                    objectFit: 'cover', 
                    borderRadius: "15px" 
                }} 
            />
            <div className="card-body px-0 pt-3">
                <h6 className="card-title text-start fw-bold mb-0">{props.title}</h6>
                <p className="text-muted small text-start">{props.language} • {props.rating}<span className='text-danger'>★</span> </p>
                <Link to={`/editall/${props.id}`} ><button className='btn btn-warning' type='submit'>edit</button></Link>
            </div>
        </div>
        
    )
}