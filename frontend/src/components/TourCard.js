import React from "react";
import { Link } from "react-router-dom";
import './TourCard.css';


function TourCard({ tour }) {
  return (
    <div className="tour-card">
      <img src={tour.image} alt={tour.name} />
      <h3>{tour.name}</h3>
      <p>{tour.description.substring(0, 100)}...</p>
      <Link to={`/tour/${tour.id}`}>View Details</Link>
    </div>
  );
}

export default TourCard;
