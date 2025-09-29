import React from 'react';
import "../Card.css"

export default function Card(props) {
  return (
    <div className="card-container">
      <div className="card">
        <div className="card-body">
          <h4 className="subject-title">{props.name}</h4>
          <h6 className="section-title">📚 Previous Question Papers</h6>
          <div className="links">
            <span className="fw-bold">CIE-1</span>
            <a className="card-link bg-primary text-white" href={props.cie} target="_blank" rel="noopener noreferrer">
              📄 View Paper
            </a>
          </div>
          <div className="links">
            <span className="fw-bold">Mid Semester</span>
            <a className="card-link bg-primary text-white" href={props.mid} target="_blank" rel="noopener noreferrer">
              📄 View Paper
            </a>
          </div>
          <div className="links">
            <span className="fw-bold">End Semester</span>
            <a className="card-link bg-primary text-white" href={props.end} target="_blank" rel="noopener noreferrer">
              📄 View Paper
            </a>
          </div>
          <h6 className="section-title">📖 Study Materials</h6>
          <div className="links">
            <span className="fw-bold">Notes</span>
            <a className="card-link bg-danger text-white" href={props.notes} target="_blank" rel="noopener noreferrer">
              📕 View Notes
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
