// src/components/shared/Navbar.jsx
import React from 'react';
import './Navbar.css';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Job<span className="highlight">Portal</span></h1>
        <div className="navbar-right">
          <ul className="navbar-links">
            {user && user.role === 'recruiter' ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
                <li><Link to="/browse">Browse</Link></li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="navbar-auth">
              <Link to="/login"><Button variant="outline">Login</Button></Link>
              <Link to="/signup"><Button className="signup-btn">Signup</Button></Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="avatar">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="popover">
                <div className="popover-header">
                  <Avatar className="avatar">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                  </Avatar>
                  <div>
                    <h4 className="user-name">{user?.fullname}</h4>
                    <p className="user-bio">{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className="popover-actions">
                  {user?.role === 'student' && (
                    <div className="popover-item">
                      <User2 />
                      <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                    </div>
                  )}
                  <div className="popover-item">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">Logout</Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
