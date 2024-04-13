import React, { useState } from 'react';
import './TripsBuddy.css'; // Import CSS file for styling

const TripsBuddy = () => {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`https://trips-buddy.onrender.com/trip-info?source=${source}&destination=${destination}`);
      const data = await response.json();
      // Replace line breaks and ** with appropriate HTML tags
      data.data.poi = data.data.poi.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />');
      setTripData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching trip info:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Trip Planner</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="source">Source:</label>
          <input id="source" className="input" type="text" value={source} onChange={(e) => setSource(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="destination">Destination:</label>
          <input id="destination" className="input" type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
        </div>
        <button className="button" type="submit" disabled={loading}>Plan Trip</button>
      </form>

      {loading && <p>Loading...</p>}
      {tripData && (
        <div>
          <h2 className="section-title">Trip Information</h2>
          <div className="info">
            <h4>Source: {tripData.data.source.name}</h4>
            <p>Temperature: {tripData.data.source.main.temp} K</p>
            <h4>Destination: {tripData.data.destination.name}</h4>
            <p>Temperature: {tripData.data.destination.main.temp} K</p>
          </div>
          <div className="poi-section" dangerouslySetInnerHTML={{ __html: tripData.data.poi }}></div>
        </div>
      )}
    </div>
  );
};

export default TripsBuddy;
