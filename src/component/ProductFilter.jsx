import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from './Card';

const ProductFilter = () => {
  const [api, setApi] = useState([]);
  const [filters, setFilters] = useState({
    language: '',
    category: '',
    minRating: 0,
    maxPrice: 500,
    type: '', // State for Format (IMAX, 2D, etc.)
  });

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    try {
      const res = await axios.get("https://bmsbe-vercel.vercel.app/api/data");
      setApi(res.data);

      // Dynamically set max price based on API data
      if (res.data.length > 0) {
        const highest = Math.max(...res.data.map(m => m.price || 0));
        setFilters(prev => ({ ...prev, maxPrice: highest }));
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  // Generate unique values for dropdowns from API data
  const uniqueLanguages = [...new Set(api.map(m => m.language))].filter(Boolean);
  const uniqueCategories = [...new Set(api.flatMap(m => (m.category || "").split('/')))].filter(Boolean);

  // Core Filtering Logic
  const filteredData = useMemo(() => {
    return api.filter(movie => {
      const languageMatch = !filters.language || movie.language === filters.language;
      const categoryMatch = !filters.category || movie.category.includes(filters.category);
      const ratingMatch = (movie.rating || 0) >= filters.minRating;
      const priceMatch = (movie.price || 0) <= filters.maxPrice;
      
      // Match the format (IMAX, 4DX, etc.)
      const typeMatch = !filters.type || movie.type === filters.type;

      return languageMatch && categoryMatch && ratingMatch && priceMatch && typeMatch;
    });
  }, [filters, api]);

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container-fluid bg-light" style={{ minHeight: '100vh', padding: '20px 60px' }}>
      <div className="row">

        {/* LEFT SIDEBAR: FILTERS */}
        <div className="col-lg-3 col-md-4">
          <div className="card border-0 shadow-sm p-4 sticky-top" style={{ top: '20px', borderRadius: '12px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0" style={{ fontWeight: '700' }}>Filters</h4>
              <button
                className="btn btn-link text-danger text-decoration-none p-0"
                onClick={() => setFilters({ language: '', category: '', minRating: 0, maxPrice: 500, type: '' })}
              >
                Clear All
              </button>
            </div>

            {/* Language Filter */}
            <div className="mb-4">
              <label className="form-label fw-bold small text-uppercase">Language</label>
              <select
                className="form-select"
                value={filters.language}
                onChange={(e) => handleFilterChange('language', e.target.value)}
              >
                <option value="">All Languages</option>
                {uniqueLanguages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
              </select>
            </div>

            {/* Genre Filter */}
            <div className="mb-4">
              <label className="form-label fw-bold small text-uppercase">Genre</label>
              <select
                className="form-select"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Genres</option>
                {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            {/* Price Filter */}
            <div className="mb-4">
              <label className="form-label fw-bold small text-uppercase">Max Price: ₹{filters.maxPrice}</label>
              <input
                type="range"
                className="form-range"
                min="0"
                max="500"
                step="50"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
              />
              <div className="d-flex justify-content-between small text-muted">
                <span>₹0</span>
                <span>₹500</span>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-4">
              <label className="form-label fw-bold small text-uppercase">Min Rating: {filters.minRating}★</label>
              <input
                type="range"
                className="form-range"
                min="0"
                max="5"
                step="1"
                value={filters.minRating}
                onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
              />
            </div>

            {/* Format Filter (IMAX/2D/3D) */}
            <div className="mb-2">
              <label className="form-label fw-bold small text-uppercase">Format</label>
              <div className="d-flex flex-wrap gap-2">
                {['2D', '3D', 'IMAX', '4DX'].map((f) => (
                  <button
                    key={f}
                    type="button"
                    className={`btn btn-sm ${filters.type === f ? 'btn-danger' : 'btn-outline-secondary'}`}
                    style={{ fontSize: '12px', borderRadius: '20px', padding: '5px 15px' }}
                    onClick={() => handleFilterChange('type', filters.type === f ? '' : f)}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: MOVIE GRID */}
        <div className="col-lg-9 col-md-8">
          <div className="d-flex justify-content-between align-items-end mb-4 px-2">
            <h2 style={{ fontWeight: '800' }}>Movies in Chennai</h2>
            <p className="text-muted mb-1">{filteredData.length} movies found</p>
          </div>

          <div className="row g-4">
            {filteredData.length > 0 ? (
              filteredData.map((da) => (
                <div className="col-xl-3 col-lg-4 col-sm-6" key={da.id}>
                  <Link to={`/edit/${da.id}`} className="text-decoration-none">
                    <Card
                      id={da.id}
                      img={da.posterUrl}
                      title={da.title}
                      language={da.language}
                      rating={da.rating}
                      format={da.type} // Pass the IMAX/2D format to the Card
                    />
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center py-5 w-100">
                <h4 className="text-muted">No movies match your selected filters.</h4>
                <button 
                    className="btn btn-sm btn-outline-danger mt-2"
                    onClick={() => setFilters({ language: '', category: '', minRating: 0, maxPrice: 1000, type: '' })}
                >
                    Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;