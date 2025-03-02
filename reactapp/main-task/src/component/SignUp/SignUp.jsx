import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import {UserContext} from '../../UserContext';
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { toastMessage } from "../../ToastMessage";
import { SIGNUP_MUTATION } from "./api/SignUpAPI";
import { useMutation } from "@apollo/client";
const SignUp = () => {
  // using the mutation hook 
  const [signUp , {loading , data , error}] = useMutation(SIGNUP_MUTATION);

  const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const validateEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const validateEmailForTestCase = (email) => {                         // validation for email
    if (/[A-Z]/.test(email)) {
      return "Email should not contain uppercase letters";
    }
    if (/\.\./.test(email)) {
      return "Email should not contain consecutive dots (..)";
    }
    if (/@@/.test(email)) {
      return "Email should not contain consecutive @ symbols (@@)";
    }
    const [localPart] = email.split('@');
    if(!/^[A-Za-z]/.test(localPart))
    {
      return "Email must start with letter";
    }
    if (/^\d+$/.test(localPart)) {
      return "Email local part cannot be entirely numbers";
    }
    const [, domain] = email.split('@');

    if (/^\d+$/.test(domain.split('.')[0])) {
      return "Email domain cannot be entirely numbers";
    }

    
    return true;
  };

  const showPassword = () =>{                                         // password eye button 
    const dvbtn = document.getElementById('dont-visible-btn');
    dvbtn.style.display = "none";
    const vbtn = document.getElementById('visible-btn');
    vbtn.style.display = "block";
    const pass = document.getElementById('password');
    pass.type = "text";
  }
  const notShowPassword = () => {                                   
    const vbtn = document.getElementById('visible-btn');
    vbtn.style.display = "none";
    const dvbtn = document.getElementById('dont-visible-btn');
    dvbtn.style.display = "block";
    const pass = document.getElementById('password');
    pass.type = "password";
  }

  const navigate = useNavigate();                             
  const {addUser} = useContext(UserContext);                       // getting function of add user from user context
  const goToLogInPage = () =>{
    navigate('/LogIn');
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

   const alertForSignUp = () => {                                 // toast for success , timing 4 second
    toastMessage("Sign Up Successfully!","success");
     setTimeout(() => {
       goToLogInPage();
     }, 2000);
   };
  

   const onSubmit = (data) => {
    console.log("Form data:", data); // Log form data
    signUp({
      variables: {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
      },
    })
      .then((response) => {
        console.log("Mutation response:", response); // Log the response
        toastMessage("Sign Up Successfully!", "success");
        setTimeout(() => {
          navigate('/LogIn');
        }, 2000);
      })
      .catch((err) => {
        console.error("Error signing up:", err); // Log the error
        toastMessage("Failed to sign up. Please try again.", "error");
      });
  };


  // const onSubmit = (data) => {                                    // onsubmit of hook form
  //   console.log(data);
  //   console.log(`the name is ${data.name}`);
  //   addUser(data);
  //   alertForSignUp();
  //   // goToLogInPage();
  // };
  return (
    <>
    <div className="form-container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="heading">Sign Up</h2>
        <div className="aligns">

        <div className="form-group">
          <div className="labels">
          <label htmlFor="name">Name</label>
          </div>
          <input type="text" id="name" placeholder="Enter the name" {...register("name", { required: "Name is required", minLength: { value: 3, message: "Name must be at least 3 characters", },  })}/>
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div className="form-group">
          <div className="labels">
          <label htmlFor="email">Email</label>
          </div>
          <input type="text" id="email" placeholder="Enter the email" {...register("email", { required: "Email is required", pattern: { value: validateEmail , message: "Invalid email address", }, validate: validateEmailForTestCase})} />
          
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div className="form-group" style={{marginBottom:'-12px'}}>
          <div className="labels"> 
          <label htmlFor="password">Password</label>
          </div>
          <input
            type="password"
            id="password" placeholder="Enter the password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
              pattern: {value: validatePassword , message:"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"},
            })}
          />
          <span className='eye-btn'>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16" onClick={showPassword} id='dont-visible-btn'>
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16" style={{display:'none'}} onClick={notShowPassword} id='visible-btn'>
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
              </svg>
          </span>
          {errors.password && <p className="error">{errors.password.message}</p>}
        </div>

        <div className="form-group">
          <div className="labels">
          <label htmlFor="phone">Phone Number</label>
          </div>
          <input
            type="tel"
            id="phone" placeholder="Enter the phone number"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Invalid phone number (10 digits required)",
              },
            })}
          />
          {errors.phone && <p className="error">{errors.phone.message}</p>}
        </div>
            <div className="btn-div">
                <button className="btn" type="submit">Sign Up</button>
            </div>
      </div>
      <p>Have an account <button className="lastsignin" onClick={goToLogInPage} style={{cursor:'pointer'}} >Sign In ?</button></p>
      </form>
    </div>
    </>
  );
};

export default SignUp;