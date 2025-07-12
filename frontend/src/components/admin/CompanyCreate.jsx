// src/components/admin/CompanyCreate.jsx
import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

import './CompanyCreate.css'; // 👈 Custom styles

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company));
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="company-create-container">
        <div className="company-create-header">
          <h1 className="company-create-title">Your Company Name</h1>
          <p className="company-create-subtext">
            What would you like to give your company name? You can change this later.
          </p>
        </div>

        <Label>Company Name</Label>
        <Input
          type="text"
          className="company-name-input"
          placeholder="JobHunt, Microsoft etc."
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <div className="company-create-actions">
          <Button variant="outline" onClick={() => navigate('/admin/companies')}>
            Cancel
          </Button>
          <Button onClick={registerNewCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
