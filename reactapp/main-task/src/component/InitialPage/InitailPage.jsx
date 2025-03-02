import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../tringapps-copy-2.png';
import './InitailPage.css';
const InitailPage = () => {
    const navigate = useNavigate();            
    const handleSignIn = () => {      //navigating to login page
        navigate('/LogIn');
    }
    const handleSignUp = ()=>{        //navigating to signup page
        navigate('/SignUp');
    }
  return (
    <>
      <header>
        <div className="header">
          <img src={logo} className='logo' alt="logo" />
          <div className='header-buttons'>
          <button onClick={handleSignIn} className='signin-btn'>Sign In</button>  {/* calling signin function */}
          <button onClick={handleSignUp} className='signin-btn'>Sign Up</button> {/* calling signup function */}
          </div>
        </div>
        <div className='main'>Welcome to the Tringapps</div>
      </header>
    </>
  );
};

export default InitailPage;