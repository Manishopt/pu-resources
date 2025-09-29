import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import "../App.css"
export default function Btech() {
  // Auth removed
  return (
    <div>
      <Navbar/>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card1 p-2 bg-dark border">
              <div className="card-body1">
                <h5 className="card-title text-light ">1st Year</h5>
                <h6 className="card-subtitle mb-2 text-muted">Notes & previous Questions Papers</h6>
                <Link to="/Btech1stYear"  style={{color:"#e31a1a"}} className="card-link">Click here</Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-4 mb-4">
            <div className="card1 p-2 bg-dark border">
              <div className="card-body1">
                <h5 className="card-title text-light ">2nd Year</h5>
                <h6 className="card-subtitle mb-2 text-muted">Notes & previous Questions Papers</h6>
                <p style={{color:"#e31a1a"}}>Coming soon...</p>
                {/* <Link to="/Btech2ndYear" style={{color:"#e31a1a"}} className="card-link">Click here</Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
