import React from 'react';
import './Job.css';
import { Bookmark } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="job-card">
      <div className="job-header">
        <p className="job-date">
          {daysAgoFunction(job?.createdAt) === 0
            ? 'Today'
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <button className="job-icon-btn">
          <Bookmark size={20} />
        </button>
      </div>

      <div className="job-company">
        <button className="company-logo-btn">
          <img className="company-logo" src={job?.company?.logo} alt="Company" />
        </button>
        <div className="company-info">
          <h1 className="company-name">{job?.company?.name}</h1>
          <p className="company-location">India</p>
        </div>
      </div>

      <div className="job-details">
        <h1 className="job-title">{job?.title}</h1>
        <p className="job-description">{job?.description}</p>
      </div>

      <div className="job-tags">
        <span className="tag blue">{job?.position} Positions</span>
        <span className="tag red">{job?.jobType}</span>
        <span className="tag purple">{job?.salary} LPA</span>
      </div>

      <div className="job-buttons">
        <button className="details-btn" onClick={() => navigate(`/description/${job?._id}`)}>
          Details
        </button>
        <button className="save-btn">Save For Later</button>
      </div>
    </div>
  );
};

export default Job;
