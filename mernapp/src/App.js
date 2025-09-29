import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Card from './components/Card';
// import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner'; // Import the loading spinner
import './App.css'; // Import the CSS file for additional styles
// import { analytics } from './firebase'; // Firebase analytics - temporarily disabled

export default function App() {
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [page, setPages] = useState(1);
  const [loading, setLoading] = useState(true); // New loading state

  const loadData = async () => {
    setLoading(true); // Set loading to true when fetching data

    // Check if data is cached and still fresh (cache for 1 hour)
    const cachedData = localStorage.getItem('pu-resources-data');
    const cacheTime = localStorage.getItem('pu-resources-cache-time');
    const now = Date.now();
    const cacheExpiry = 60 * 60 * 1000; // 1 hour in milliseconds

    if (cachedData && cacheTime && (now - parseInt(cacheTime) < cacheExpiry)) {
      try {
        const parsedData = JSON.parse(cachedData);
        setData(parsedData);
        setLoading(false);
        return; // Use cached data
      } catch (error) {
        console.error('Error parsing cached data:', error);
      }
    }

    try {
      let response = await fetch("https://pu-resources-lf6n.onrender.com/api/Data", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        cache: 'default' // Use browser cache when possible
      });
      response = await response.json();

      setData(response[0]);
      setLoading(false); // Set loading to false after data is fetched

      // Cache the data in localStorage
      try {
        localStorage.setItem('pu-resources-data', JSON.stringify(response[0]));
        localStorage.setItem('pu-resources-cache-time', now.toString());
      } catch (storageError) {
        console.warn('Failed to cache data in localStorage:', storageError);
      }

    } catch (error) {
      setLoading(false);
      console.error('Error loading data:', error);

      // If API fails and we have cached data, use it as fallback
      if (cachedData && cacheTime && (now - parseInt(cacheTime) < cacheExpiry * 24)) { // Allow up to 24 hours old
        try {
          const parsedData = JSON.parse(cachedData);
          setData(parsedData);
          console.log('Using cached data as fallback');
        } catch (fallbackError) {
          console.error('Error using cached fallback data:', fallbackError);
        }
      }
    }
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
    <div>
      <Navbar />
      {loading ? ( // Show loading spinner while data is being fetched
        <div className="loading-container">
          <TailSpin
            height="80"
            width="80"
            color="#f11946"
            ariaLabel="loading"
          />
        </div>
      ) : (
        <div className="container">
          <form className="d-flex mt-3 mb-3">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search Subject"
              aria-label="Search"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPages(1); }}
            />
          </form>
          <div className="row">
            {filteredData.length !== 0 ? (
              filteredData.slice((page - 1) * 3, page * 3).map((data) => {
                return (
                  <div key={data._id} className="col-12 col-md-6 col-lg-4 mb-3">
                    <Card name={data.name} cie={data.CIE1} mid={data.MID} end={data.END} notes={data.notes} />
                  </div>
                );
              })
            ) : (
              <div className="no-data-message">
                <h3>📭 No subjects found</h3>
                <p>Try adjusting your search terms or clear the search to see all available subjects.</p>
              </div>
            )}
          </div>
          {filteredData.length > 0 && (
            <div className="pagination">
              <span onClick={() => selectPageHandler(page - 1)} className="pagination-btn">PREV</span>
              {[...Array(Math.ceil(filteredData.length / 3))].map((_, i) => {
                return (
                  <span
                    className={page === i + 1 ? "pagination-btn active" : "pagination-btn"}
                    onClick={() => selectPageHandler(i + 1)}
                    key={i}
                  >
                    {i + 1}
                  </span>
                );
              })}
              <span onClick={() => selectPageHandler(page + 1)} className="pagination-btn">NEXT</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
 } 
//  hello
