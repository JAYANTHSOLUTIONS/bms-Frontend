import React from 'react'
import { Link } from 'react-router-dom'

export default function ECard(props) {
    return (
        <div className="card h-100 border-0 shadow-sm bg-transparent">
            <img 
                src={props.img} 
                className="card-img-top shadow" 
                alt={props.title} 
                style={{ 
                    height: '380px', 
                    objectFit: 'cover', 
                    borderRadius: "15px" 
                }} 
                onError={(e) => { e.target.src = 'https://placehold.co/400x600?text=Event+Poster'; }}
            />
            <div className="card-body px-0 pt-3">
                {/* Event Name */}
                <h6 className="card-title text-start fw-bold mb-0 text-truncate">{props.title}</h6>
                
                {/* Music Director & City */}
                <p className="text-muted small text-start mb-2">
                    {props.director} • <span className="text-primary">{props.city}</span>
                </p>

                {/* Venue & Date */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge bg-light text-dark border small fw-normal">
                        <i className="bi bi-calendar3 me-1"></i>{props.date}
                    </span>
                    <span className="small text-muted text-truncate ms-2" style={{maxWidth: '120px'}}>
                        {props.venue}
                    </span>
                </div>

                {/* Edit Link */}
                <Link to={`/editeve/${props.id}`}>
                    <button className='btn btn-warning w-100 fw-bold' style={{borderRadius: '10px'}}>
                        <i className="bi bi-pencil-square me-2"></i>Edit Event
                    </button>
                </Link>
            </div>
        </div>
    )
}