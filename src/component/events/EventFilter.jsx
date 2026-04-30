import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ECard from './Ecard';
// Ensure your Card component is generic enough to handle event data


const EventFilter = () => {
  const [api, setApi] = useState([]);
  const [filters, setFilters] = useState({
    musicDirector: '',
    city: '',
    dateRange: 'all', // all, upcoming, past
  });

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = async () => {
    try {
      // Updated to your Express backend endpoint
      const res = await axios.get("https://bmsbe-vercel.vercel.app/api/events");
      setApi(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  // Generate unique values for dropdowns from API data
  const uniqueDirectors = [...new Set(api.map(e => e.music_director))].filter(Boolean);
  const uniqueCities = [...new Set(api.map(e => e.city))].filter(Boolean);

  // Core Filtering Logic
  const filteredData = useMemo(() => {
    return api.filter(event => {
      const directorMatch = !filters.musicDirector || event.music_director === filters.musicDirector;
      const cityMatch = !filters.city || event.city === filters.city;
      
      // Basic Date Filtering
      const eventDate = new Date(event.event_date);
      const today = new Date();
      let dateMatch = true;
      if (filters.dateRange === 'upcoming') dateMatch = eventDate >= today;
      if (filters.dateRange === 'past') dateMatch = eventDate < today;

      return directorMatch && cityMatch && dateMatch;
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
                onClick={() => setFilters({ musicDirector: '', city: '', dateRange: 'all' })}
              >
                Clear All
              </button>
            </div>

            {/* Music Director Filter */}
            <div className="mb-4">
              <label className="form-label fw-bold small text-uppercase">Music Director</label>
              <select
                className="form-select"
                value={filters.musicDirector}
                onChange={(e) => handleFilterChange('musicDirector', e.target.value)}
              >
                <option value="">All Directors</option>
                {uniqueDirectors.map(dir => <option key={dir} value={dir}>{dir}</option>)}
              </select>
            </div>

            {/* City Filter */}
            <div className="mb-4">
              <label className="form-label fw-bold small text-uppercase">City</label>
              <select
                className="form-select"
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
              >
                <option value="">All Cities</option>
                {uniqueCities.map(city => <option key={city} value={city}>{city}</option>)}
              </select>
            </div>

            {/* Date Range Filter */}
            <div className="mb-2">
              <label className="form-label fw-bold small text-uppercase">Timeline</label>
              <div className="d-flex flex-wrap gap-2">
                {['all', 'upcoming', 'past'].map((range) => (
                  <button
                    key={range}
                    type="button"
                    className={`btn btn-sm ${filters.dateRange === range ? 'btn-danger' : 'btn-outline-secondary'}`}
                    style={{ fontSize: '12px', borderRadius: '20px', padding: '5px 15px', textTransform: 'capitalize' }}
                    onClick={() => handleFilterChange('dateRange', range)}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: EVENT GRID */}
        <div className="col-lg-9 col-md-8">
          <div className="d-flex justify-content-between align-items-end mb-4 px-2">
            <h2 style={{ fontWeight: '800' }}>Musical Events</h2>
            <p className="text-muted mb-1">{filteredData.length} events found</p>
          </div>

          <div className="row g-4">
            {filteredData.length > 0 ? (
              filteredData.map((event) => (
                <div className="col-xl-4 col-lg-6 col-sm-12" key={event.id}>
                    <ECard
                      id={event.id}
                      img={event.poster_url}
                      title={event.event_name}
                      director={event.music_director} // Director as subtitle
                      label={event.city} // City as badge
                      date={new Date(event.event_date).toLocaleDateString('en-GB')}
                    />
                </div>
              ))
            ) : (
              <div className="text-center py-5 w-100">
                <h4 className="text-muted">No events match your filters.</h4>
                <button 
                    className="btn btn-sm btn-outline-primary mt-2"
                    onClick={() => setFilters({ musicDirector: '', city: '', dateRange: 'all' })}
                >
                    Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventFilter;