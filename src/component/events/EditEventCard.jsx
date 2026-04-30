import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditEventCard() {
    const { id } = useParams();
    const navigate = useNavigate();

    // State reflects the Supabase 'events' table structure
    const [data, setdata] = useState({
        event_date: "",
        music_director: "",
        event_name: "",
        venue: "",
        city: "",
        poster_url: "",
    });

    const [loading, setLoading] = useState(true);
    const [success, setsuccess] = useState("");

    // 1. Fetch data on load from the events endpoint
    useEffect(() => {
        handleFetch();
    }, [id]);

    const handleFetch = () => {
        // Updated to your events API
        fetch("https://bmsbe-vercel.vercel.app/api/events")
            .then((res) => res.json())
            .then((res) => {
                const itemToEdit = res.find(item => item.id == id);

                if (itemToEdit) {
                    setdata({
                        event_date: itemToEdit.event_date || "",
                        music_director: itemToEdit.music_director || "",
                        event_name: itemToEdit.event_name || "",
                        venue: itemToEdit.venue || "",
                        city: itemToEdit.city || "",
                        poster_url: itemToEdit.poster_url || "",
                    });
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                setLoading(false);
            });
    };

    // 2. Handle input changes
    const handleevent = (e) => {
        const { name, value } = e.target;
        setdata({
            ...data,
            [name]: value
        });
    };

    // 3. Save updates using PUT or PATCH
    const handlesave = async () => {
        if (!id) {
            console.error("No ID found in URL parameters");
            return;
        }

        try {
            const body = {
                event_date: data.event_date,
                music_director: data.music_director,
                event_name: data.event_name,
                venue: data.venue,
                city: data.city,
                poster_url: data.poster_url
            };

            const res = await axios.put(`https://bmsbe-vercel.vercel.app/api/edit-event/${id}`, body);

            // If res.data is empty, the backend didn't find the ID
            if (res.data && res.data.length > 0) {
                setsuccess("Update Successful!");
                setTimeout(() => navigate('/explore/event'), 2000);
            } else {
                setsuccess("Failed: Event not found in database.");
            }
        } catch (error) {
            console.error("Update error:", error);
            setsuccess("Failed to update.");
        }
    };

    if (loading) return <div className="text-center mt-5">Loading Event Details...</div>;

    return (
        <div className="container mt-5 pb-5">
            <h2 className="mb-4">Edit Event: <span className="text-warning">{data.event_name}</span></h2>

            {success && (
                <div className={`alert ${success.includes("Successful") ? "alert-success" : "alert-danger"}`}>
                    {success}
                </div>
            )}

            <div className="row">
                {/* Left Column: Poster Preview */}
                <div className="col-md-4">
                    <div className="card shadow-sm border-0">
                        <img
                            src={data.poster_url || "https://placehold.co/400x600?text=No+Poster"}
                            className="card-img-top shadow"
                            alt="Event Preview"
                            style={{ height: '450px', objectFit: 'cover', borderRadius: '15px' }}
                        />
                        <div className="card-body px-0 pt-3">
                            <h5 className="fw-bold">{data.event_name || "Event Name"}</h5>
                            <p className="text-muted">{data.music_director} • {data.city}</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Full Edit Form */}
                <div className="col-md-8">
                    <div className="card shadow-sm p-4 border-0" style={{ borderRadius: '15px' }}>
                        <div className="row g-3">
                            {/* Event Name */}
                            <div className="col-12">
                                <label className="form-label fw-bold">Event Name</label>
                                <input type="text" name="event_name" className="form-control" onChange={handleevent} value={data.event_name} />
                            </div>

                            {/* Music Director & Date */}
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Music Director</label>
                                <input type="text" name="music_director" className="form-control" onChange={handleevent} value={data.music_director} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Event Date</label>
                                <input type="date" name="event_date" className="form-control" onChange={handleevent} value={data.event_date} />
                            </div>

                            {/* City & Venue */}
                            <div className="col-md-6">
                                <label className="form-label fw-bold">City</label>
                                <input type="text" name="city" className="form-control" onChange={handleevent} value={data.city} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Venue</label>
                                <input type="text" name="venue" className="form-control" onChange={handleevent} value={data.venue} />
                            </div>

                            {/* Poster URL */}
                            <div className="col-12">
                                <label className="form-label fw-bold">Poster URL</label>
                                <input type="text" name="poster_url" className="form-control" onChange={handleevent} value={data.poster_url} />
                            </div>

                            {/* Buttons */}
                            <div className="col-12 d-flex gap-2 mt-4">
                                <button onClick={handlesave} className="btn btn-warning px-5 fw-bold">Update Event</button>
                                <Link to="/events" className="btn btn-outline-secondary px-4">Cancel</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}