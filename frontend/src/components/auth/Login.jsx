// src/components/auth/Login.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

import './Login.css'; // 👈 Include custom CSS

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate('/');
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <form onSubmit={submitHandler} className="login-form">
          <h1 className="login-title">Login</h1>

          <div className="form-group">
            <Label>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              placeholder="patel@gmail.com"
            />
          </div>

          <div className="form-group">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              placeholder="*******"
            />
          </div>

          <RadioGroup className="radio-group">
            <div className="radio-option">
              <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role === 'student'}
                onChange={changeEventHandler}
              />
              <Label>Student</Label>
            </div>
            <div className="radio-option">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === 'recruiter'}
                onChange={changeEventHandler}
              />
              <Label>Recruiter</Label>
            </div>
          </RadioGroup>

          {loading ? (
            <Button className="submit-btn" disabled>
              <Loader2 className="spinner" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="submit-btn">
              Login
            </Button>
          )}

          <span className="signup-text">
            Don't have an account? <Link to="/signup">Signup</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
