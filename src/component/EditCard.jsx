import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function EditCard() {


    const { id } = useParams();
    const navigate = useNavigate(); // For redirecting after save

    // This state holds the values the user is typing
    const [data, setdata] = useState({
        title: "",
        language: "",
        rating: 0,
        category: "",
        type: "",
        duration: "",
        certificate: "",
        releaseDate: "",
        price: 0,
        description: "",
        cast: [],
        trailerUrl: "",
        posterUrl: "",
        bannerUrl: ""

    });

    const [loading, setLoading] = useState(true);
    const [success, setsuccess] = useState("");

    // 1. Fetch data on load
    useEffect(() => {
        handleFetch();
    }, [id]);

    const handleFetch = () => {
        fetch("http://127.0.0.1:8000/api/data")
            .then((res) => res.json())
            .then((res) => {
                // Find the specific item matching the URL ID
                const itemToEdit = res.find(item => item.id == id);

                if (itemToEdit) {
                    // Map backend keys to your local state keys
                    setdata({
                        title: itemToEdit.title || "Viduthalai Part 1",
                        language: itemToEdit.language || "Tamil",
                        rating: itemToEdit.rating || 4.7,
                        category: itemToEdit.category || "Drama/Action",
                        type: itemToEdit.type || "2D",
                        duration: itemToEdit.duration || "150 mins",
                        certificate: itemToEdit.certificate || "A",
                        releaseDate: itemToEdit.releaseDate || "2023-03-31",
                        price: itemToEdit.price || 160,
                        description: itemToEdit.description || "A rookie police officer finds himself conflicted during a operation to capture a rebel leader.",
                        cast: itemToEdit.cast || [],
                        trailerUrl: itemToEdit.trailerUrl || "",
                        posterUrl: itemToEdit.posterUrl || "https://placehold.co/300x450?text=Viduthalai",
                        bannerUrl: itemToEdit.bannerUrl || "https://placehold.co/300x450?text=Viduthalai",
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

    // 3. Save updates
    const handlesave = async () => {
        try {
            const body = {
                title: data.title,
                language: data.language,
                rating: Number(data.rating),
                category: data.category,
                type: data.type,
                duration: data.duration,
                certificate: data.certificate,
                releaseDate: data.releaseDate,
                price: Number(data.price),
                description: data.description,
                cast: data.cast, // Assuming this is an array or string already
                trailerUrl: data.trailerUrl,
                posterUrl: data.posterUrl,
                bannerUrl: data.bannerUrl
            };

            await axios.put(`http://127.0.0.1:8000/api/edit/${id}`, body);

            setsuccess("Update Successful!");
            console.log("successfully updated");

            // Optional: Redirect back to home after 2 seconds
            setTimeout(() => navigate('/explore/stream'), 2000);
        } catch (error) {
            console.error("Update error:", error);
            setsuccess("Failed to update.");
        }
    };
    return (
        <div>

            <div className="container mt-5 pb-5">
                <h2 className="mb-4">Edit Movie: <span className="text-primary">{data.title}</span></h2>

                {success && (
                    <div className={`alert ${success.includes("Successful") ? "alert-success" : "alert-danger"}`}>
                        {success}
                    </div>
                )}

                <div className="row">
                    {/* Left Column: Preview Card */}
                    <div className="col-md-4">
                        <div className="card shadow-sm">
                            <img
                                src={data.posterUrl || "https://placehold.co/300x450?text=No+Poster"}
                                className="card-img-top"
                                alt="Poster Preview"
                                style={{ height: '450px', objectFit: 'cover' }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{data.title || "Movie Title"}</h5>
                                <p className="badge bg-info text-dark me-2">{data.certificate}</p>
                                <p className="badge bg-secondary">{data.type}</p>
                            </div>
                        </div>

                        <div className="card shadow-sm my-5">
                            <img
                                src={data.bannerUrl || "https://placehold.co/300x450?text=No+Banner"}
                                className="card-img-top"
                                alt="Banner Preview"
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            
                        </div>
                    </div>


                    {/* Right Column: Full Edit Form */}
                    <div className="col-md-8">
                        <div className="card shadow-sm p-4">
                            <div className="row g-3">
                                {/* Title */}
                                <div className="col-12">
                                    <label className="form-label fw-bold">Movie Title</label>
                                    <input type="text" name="title" className="form-control" onChange={handleevent} value={data.title} />
                                </div>

                                {/* Language & Category */}
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Language</label>
                                    <input type="text" name="language" className="form-control" onChange={handleevent} value={data.language} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Category</label>
                                    <input type="text" name="category" className="form-control" onChange={handleevent} value={data.category} />
                                </div>

                                {/* Rating, Price, & Type */}
                                <div className="col-md-4">
                                    <label className="form-label fw-bold">Rating (⭐)</label>
                                    <input type="number" name="rating" step="0.1" className="form-control" onChange={handleevent} value={data.rating} />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label fw-bold">Ticket Price (₹)</label>
                                    <input type="number" name="price" className="form-control" onChange={handleevent} value={data.price} />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label fw-bold">Type (e.g. 2D/3D)</label>
                                    <input type="text" name="type" className="form-control" onChange={handleevent} value={data.type} />
                                </div>

                                {/* Duration & Release Date */}
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Duration</label>
                                    <input type="text" name="duration" className="form-control" placeholder="150 mins" onChange={handleevent} value={data.duration} />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label fw-bold">Release Date</label>
                                    <input type="date" name="releaseDate" className="form-control" onChange={handleevent} value={data.releaseDate} />
                                </div>

                                {/* Certificate & Poster URL */}
                                <div className="col-md-4">
                                    <label className="form-label fw-bold">Certificate</label>
                                    <select name="certificate" className="form-select" onChange={handleevent} value={data.certificate}>
                                        <option value="U">U</option>
                                        <option value="U/A">U/A</option>
                                        <option value="A">A</option>
                                    </select>
                                </div>
                                <div className="col-md-8">
                                    <label className="form-label fw-bold">Poster URL</label>
                                    <input type="text" name="posterUrl" className="form-control" onChange={handleevent} value={data.posterUrl} />
                                </div>
                                {/* banner url */}
                                <div className="col-md-8">
                                    <label className="form-label fw-bold">Banner URL</label>
                                    <input type="text" name="bannerUrl" className="form-control" onChange={handleevent} value={data.bannerUrl} />
                                </div>

                                {/* Trailer URL */}
                                <div className="col-12">
                                    <label className="form-label fw-bold">Trailer URL</label>
                                    <input type="text" name="trailerUrl" className="form-control" onChange={handleevent} value={data.trailerUrl} />
                                </div>

                                {/* Description */}
                                <div className="col-12">
                                    <label className="form-label fw-bold">Description</label>
                                    <textarea name="description" className="form-control" rows="3" onChange={handleevent} value={data.description}></textarea>
                                </div>

                                {/* Cast (Optional: simple text input for now) */}
                                <div className="col-12">
                                    <label className="form-label fw-bold">Cast (Comma separated)</label>
                                    <input type="text" name="cast" className="form-control" onChange={handleevent} value={data.cast} />
                                </div>

                                {/* Buttons */}
                                <div className="col-12 d-flex gap-2 mt-4">
                                    <button onClick={handlesave} className="btn btn-primary px-5">Update Movie</button>
                                    <Link to="/" className="btn btn-outline-secondary">Cancel</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}
