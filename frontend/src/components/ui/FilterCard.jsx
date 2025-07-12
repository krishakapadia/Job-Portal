import React, { useEffect, useState } from 'react';
import './FilterCard.css';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';

const filterData = [
  {
    filterType: 'Location',
    array: ['Delhi NCR', 'Bangalore', 'Hyderabad', 'Pune', 'Mumbai'],
  },
  {
    filterType: 'Industry',
    array: ['Frontend Developer', 'Backend Developer', 'FullStack Developer'],
  },
  {
    filterType: 'Salary',
    array: ['0-40k', '42-1lakh', '1lakh to 5lakh'],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setSelectedValue(e.target.value);
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="filter-card">
      <h1 className="filter-title">Filter Jobs</h1>
      <hr className="divider" />
      {
        filterData.map((data, index) => (
          <div key={index}>
            <h2 className="section-title">{data.filterType}</h2>
            {
              data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <div className="radio-row" key={itemId}>
                    <input
                      type="radio"
                      name="job-filter"
                      value={item}
                      id={itemId}
                      checked={selectedValue === item}
                      onChange={changeHandler}
                    />
                    <label htmlFor={itemId}>{item}</label>
                  </div>
                );
              })
            }
          </div>
        ))
      }
    </div>
  );
};

export default FilterCard;
