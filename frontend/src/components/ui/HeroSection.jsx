import React, { useState } from 'react';
import './HeroSection.css';
import { Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  return (
    <div className="hero-container">
      <div className="hero-content">
        <span className="hero-badge">No. 1 Job Hunt Website</span>
        <h1 className="hero-heading">
          Search, Apply & <br /> Get Your <span className="highlight">Dream Jobs</span>
        </h1>
        <p className="hero-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aspernatur temporibus nihil tempora dolor!
        </p>
        <div className="hero-search">
          <input
            type="text"
            placeholder="Find your dream jobs"
            onChange={(e) => setQuery(e.target.value)}
            className="hero-input"
          />
          <button className="hero-button" onClick={searchJobHandler}>
            <Search className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
