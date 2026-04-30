import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditEventForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State keys match the column names in your Supabase 'events' table
  const [data, setdata] = useState({
    event_name: "",
    poster_url: "",
  });

  useEffect(() => {
    handleFetch();
  }, [id]);

  const handleFetch = () => {
    // Updated to your new events endpoint
    fetch("https://bmsbe-vercel.vercel.app/api/events")
      .then((res) => res.json())
      .then((res) => {
        // Find the specific event matching the ID from the URL
        const eventToEdit = res.find(item => item.id == id);
        
        if (eventToEdit) {
          setdata({
            event_name: eventToEdit.event_name, 
            poster_url: eventToEdit.poster_url,
          });
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  };

  const handleevent = (e) => {
    const { name, value } = e.target;
    setdata({
      ...data,
      [name]: value
    });
  };

  const handlesave = async () => {
    try {
      // Body should match the column name in Supabase
      const body = {
        poster_url: data.poster_url
      };

      // Ensure your backend PATCH route handles /api/edit-event/:id 
      // or whatever your event update endpoint is named
      await axios.patch(`https://bmsbe-vercel.vercel.app/api/edit-event/${id}`, body);
      
      console.log("Event Update successful");
      
      // Navigate back to the events filter page after success
      setTimeout(() => navigate('/events'), 1500); 
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow-sm">
        <h2 className="mb-4">Edit Event: <span className="text-primary">{data.event_name}</span></h2>
        
        <div className="mb-3">
          <label className="form-label fw-bold">Poster Image URL:</label>
          <input 
            type='url' 
            name='poster_url' 
            className="form-control" 
            onChange={handleevent} 
            value={data.poster_url} 
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="mt-3">
            <h6>Preview:</h6>
            <img 
                src={data.poster_url} 
                alt="Preview" 
                style={{ width: '200px', borderRadius: '10px', display: data.poster_url ? 'block' : 'none' }} 
                onError={(e) => e.target.style.display = 'none'}
            />
        </div>

        <div className="mt-4 d-flex gap-2">
          <button onClick={handlesave} className="btn btn-warning px-4 fw-bold">Save Changes</button>
          <button onClick={() => navigate('/events')} className="btn btn-outline-secondary">Cancel</button>
        </div>
      </div>
    </div>
  )
}