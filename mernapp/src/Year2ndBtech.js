import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
// import { useNavigate } from 'react-router-dom';
import './App.css'; // Import the CSS file for additional styles

export default function App() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [page, setPages] = useState(1);

  const loadData = async () => {
    let response = await fetch("https://pu-resources-backend.onrender.com/api/Data", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      }
    });
    response = await response.json();
    setData(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= Math.ceil(filteredData.length / 3) &&
      selectedPage !== page
    ) {
      setPages(selectedPage);
    }
  };

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="main-wrapper">
      <Navbar />
      <div className="container">
        <form className="d-flex mt-3 mb-3">
          <input
            className="form-control me-2 search-input"
            type="search"
            placeholder="Search Subject"
            aria-label="Search"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPages(1); }}
          />
        </form>
        <div className="row justify-content-center">
          {filteredData.length !== 0
            ? filteredData.slice((page - 1) * 3, page * 3).map((data) => {
              return (
                <div key={data._id} className="col-12 col-sm-6 col-lg-4 mb-3">
                  <Card name={data.name} cie={data.CIE1} mid={data.MID} end={data.END} notes={data.notes} />
                </div>
              );
            })
            : <div className="no-data">No data found</div>
          }
        </div>
        <div className="social-links text-center mt-4 mb-4">
          <a href="https://www.instagram.com/harsh._.naruka/" target="_blank" rel="noopener noreferrer" className="instagram-link">
            Follow us on Instagram
          </a>
        </div>
        {filteredData.length > 0 && (
          <div className="pagination">
            <span onClick={() => selectPageHandler(page - 1)} className="pagination-btn">PREV</span>
            {
              [...Array(Math.ceil(filteredData.length / 3))].map((_, i) => {
                return (
                  <span
                    className={page === i + 1 ? "pagination-btn active" : "pagination-btn"}
                    onClick={() => selectPageHandler(i + 1)}
                    key={i}
                  >
                    {i + 1}
                  </span>
                );
              })
            }
            <span onClick={() => selectPageHandler(page + 1)} className="pagination-btn">NEXT</span>
          </div>
        )}
      </div>
    </div>
  );
}
