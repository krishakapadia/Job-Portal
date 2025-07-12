// src/components/admin/PostJob.jsx
import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

import './PostJob.css'; // 👈 CSS file

const PostJob = () => {
  const [input, setInput] = useState({
    title: '',
    description: '',
    requirements: '',
    salary: '',
    location: '',
    jobType: '',
    experience: '',
    position: 0,
    companyId: '',
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find(
      (company) => company.name.toLowerCase() === value
    );
    setInput({ ...input, companyId: selectedCompany._id });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/jobs');
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="post-job-wrapper">
        <form onSubmit={submitHandler} className="post-job-form">
          <div className="form-grid">
            {[
              { name: 'title', label: 'Title' },
              { name: 'description', label: 'Description' },
              { name: 'requirements', label: 'Requirements' },
              { name: 'salary', label: 'Salary' },
              { name: 'location', label: 'Location' },
              { name: 'jobType', label: 'Job Type' },
              { name: 'experience', label: 'Experience Level' },
              { name: 'position', label: 'No of Position', type: 'number' },
            ].map((field) => (
              <div key={field.name}>
                <Label>{field.label}</Label>
                <Input
                  type={field.type || 'text'}
                  name={field.name}
                  value={input[field.name]}
                  onChange={changeEventHandler}
                  className="custom-input"
                />
              </div>
            ))}

            {companies.length > 0 && (
              <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="select-trigger">
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {companies.map((company) => (
                      <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>

          {loading ? (
            <Button className="submit-btn" disabled>
              <Loader2 className="loader" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="submit-btn">
              Post New Job
            </Button>
          )}

          {companies.length === 0 && (
            <p className="warning-text">
              *Please register a company first, before posting a job.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default PostJob;
