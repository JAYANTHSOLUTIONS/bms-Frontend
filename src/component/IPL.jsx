import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';

export default function IPL() {
    const [allTeams, setAllTeams] = useState([]); // Used for logo lookup
    const [sidebarTeams, setSidebarTeams] = useState([]); // Used for the Sidebar display
    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);

    /**
     * Helper Method: findTeamLogo
     * Now searches the FULL team list so match cards always have logos.
     */
    const findTeamLogo = (teamName) => {
        const team = allTeams.find(t => t.name === teamName);
        return team ? team.logo : 'https://via.placeholder.com/60';
    };

    /**
     * Method: handleFetchData
     */
    const handleFetchData = async () => {
        try {
            setLoading(true);
            const teamRes = await fetch('https://bmsbe-vercel.vercel.app/teams');
            const teamData = await teamRes.json();
            const fetchedTeams = teamData.teams || teamData;
            
            setAllTeams(fetchedTeams); // Store all teams for match cards
            setSidebarTeams(fetchedTeams.slice(0, 4)); // Only 4 for the sidebar

            const matchRes = await fetch('https://bmsbe-vercel.vercel.app/matches');
            const matchData = await matchRes.json();
            setMatches(matchData.matches || matchData);
        } catch (err) {
            console.error("API Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleFetchData();
    }, []);

    return (
        <div className="bg-white min-vh-100">
            <Navbar />

            <div className="container mt-5 pb-5">
                {/* STICKY HEADER - zIndex: 1030 / top: 0 */}
                <div className="d-flex justify-content-between align-items-center mb-4 sticky-top bg-white py-3 shadow-sm" 
                     style={{ zIndex: 1030, top: 0 }}>
                    <h1 className="fw-bold h2 m-0" style={{ letterSpacing: '-1px' }}>
                        TATA IPL 2026
                    </h1>
                    <button className="btn btn-light rounded-circle shadow-sm border">
                        <i className="bi bi-share"></i>
                    </button>
                </div>

                <div className="row g-5">
                    {/* LEFT COLUMN: Matches */}
                    <div className="col-lg-8">
                        <div className="mb-4">
                            <img
                                src="https://i.pinimg.com/1200x/97/d6/1e/97d61ef8f61f907a45ed14728ae31db4.jpg"
                                alt="IPL Banner"
                                className="img-fluid rounded-4 shadow-sm w-100"
                            />
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-3 border-bottom pb-3">
                            <span className="badge bg-dark px-3 py-2 fs-6">Cricket</span>
                            <div className="d-flex align-items-center gap-4">
                                <span className="fw-bold text-secondary">
                                    <i className="bi bi-hand-thumbs-up-fill text-success me-2"></i>
                                    114.2k are interested
                                </span>
                                <button className="btn btn-outline-danger btn-sm rounded px-4 py-2 fw">
                                    I'm Interested
                                </button>
                            </div>
                        </div>

                        <div className="mt-5">
                            <h3 className="fw mb-4">{matches.length} Events</h3>

                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status"></div>
                                </div>
                            ) : (
                                matches.map((match) => (
                                    <div key={match.id} className="mb-5">
                                        <h5 className="fw mb-3 text-dark">
                                            {match.date} <span className="text-muted fw-normal ms-2">| {match.location}</span>
                                        </h5>

                                        <div className="card shadow-sm rounded-4" style={{ maxWidth: '500px' }}>
                                            <div className="card-body p-4">
                                                <p className="text-muted fw mb-4" style={{ fontSize: '0.95rem' }}>
                                                    Match {match.id}
                                                </p>

                                                <div className="d-flex align-items-center justify-content-between text-center">
                                                    <div className="d-flex flex-column align-items-center" style={{ width: '150px' }}>
                                                        <img src={findTeamLogo(match.home_team)} alt="home" style={{ height: '45px', objectFit: 'contain' }} className="mb-2" />
                                                        <h4 className="fw lh-sm mb-0 text-dark" style={{ fontSize: '1.05rem' }}>{match.home_team}</h4>
                                                    </div>

                                                    <div className="badge text-dark rounded-pill border px- mx-5 fw-bold shadow-sm" style={{ backgroundColor: "#a4a6a9" }}>VS</div>

                                                    <div className="d-flex flex-column align-items-center" style={{ width: '150px' }}>
                                                        <img src={findTeamLogo(match.away_team)} alt="away" style={{ height: '45px', objectFit: 'contain' }} className="mb-2" />
                                                        <h4 className="fw lh-sm mb-0 text-dark" style={{ fontSize: '1.05rem' }}>{match.away_team}</h4>
                                                    </div>
                                                </div>

                                                <hr className="my-4 border opacity-100" />

                                                <div className="d-flex flex-column gap-2">
                                                    <span className="text" style={{ fontSize: '1rem', fontWeight: '500' }}>
                                                        <strong className="fs-5">{match.time}</strong> | {match.venue}
                                                    </span>
                                                    <h5 className="text-danger fw fs-6" style={{ cursor: 'pointer' }}>
                                                        {match.status}. Book Now <i className="bi bi-chevron-right ms-1"></i>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sidebar - Sticky at top: 100px / zIndex: 1020 */}
                    <div className="col-lg-4">
                        <div className="card border-dark shadow-sm rounded-4 p-4 sticky-top" 
                             style={{ top: '100px', zIndex: 1020 }}>
                            <p className="text-dark fw-bold mb-4" style={{ fontSize: '1.1rem' }}>Teams ({sidebarTeams.length})</p>
                            <div className="row g-3">
                                {sidebarTeams.map((da) => (
                                    <div className="col-4" key={da.id}>
                                        <div className="d-flex align-items-center justify-content-center border border-secondary-subtle rounded-4 bg-light shadow-inner"
                                            style={{ aspectRatio: '1/1', padding: '10px' }}
                                            title={da.name}>
                                            <img src={da.logo} alt={da.shortName} className="img-fluid" style={{ maxHeight: '100%', objectFit: 'contain' }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}