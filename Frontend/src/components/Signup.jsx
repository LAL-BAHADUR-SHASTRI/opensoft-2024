import React, { useRef, useState } from "react";
// import Toast from "";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Toast from "./Toast";

function SignUp() {
  
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const confirmPasswordRef = useRef("");
  const navigate = useNavigate();
   
  const handleSubmit = async () => {
    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      tier :0
    };
    // Toast.success("Sign In Successful");
     try {
    const response = await fetch(`${import.meta.env.VITE_BHOST}/user/sign_up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json" // Specify content type
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Success:', data.token);
       localStorage.setItem("accessToken", data.token);
        
       Toast.success('Signup Successful');

       navigate("/");
      window.location.reload();
  } catch (error) {
    console.error('Error:', error);
    Toast.error('Error!');
  }
  
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-signin backdrop-blur-md">
      <div className="my-8 w-1/3 max-w-sm p-4 bg-black rounded-lg opacity-85 shadow sm:p-6 md:p-8 backdrop-blur-lg">
        <div className="flex flex-col  gap-4 px-4">
          <div className=" mx-auto py-4">
            <img className="w-24"  src="logo.svg" />
          </div>
          <div
            className="text-left flex flex-col gap-6 "
            >
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-white">
                Email
              </label>
              <div className=" relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-secondary "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 16">
                    <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                    <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                  </svg>
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  ref={emailRef}
                  className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="createpass"
                className="block mb-1 text-sm font-medium text-white">
                Create Password
              </label>
              <div className=" relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-secondary "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 485.017 485.017"
                    fill="currentColor">
                    <path
                      d="M361.205,68.899c-14.663,0-28.447,5.71-38.816,16.078c-21.402,21.403-21.402,56.228,0,77.631
		c10.368,10.368,24.153,16.078,38.815,16.078s28.447-5.71,38.816-16.078c21.402-21.403,21.402-56.228,0-77.631
		C389.652,74.609,375.867,68.899,361.205,68.899z M378.807,141.394c-4.702,4.702-10.953,7.292-17.603,7.292
		s-12.901-2.59-17.603-7.291c-9.706-9.706-9.706-25.499,0-35.205c4.702-4.702,10.953-7.291,17.603-7.291s12.9,2.589,17.603,7.291
		C388.513,115.896,388.513,131.688,378.807,141.394z"
                    />
                    <path
                      d="M441.961,43.036C414.21,15.284,377.311,0,338.064,0c-39.248,0-76.146,15.284-103.897,43.036
		c-42.226,42.226-54.491,105.179-32.065,159.698L0.254,404.584l-0.165,80.268l144.562,0.165v-55.722h55.705l0-55.705h55.705v-64.492
		l26.212-26.212c17.615,7.203,36.698,10.976,55.799,10.976c39.244,0,76.14-15.282,103.889-43.032
		C499.25,193.541,499.25,100.325,441.961,43.036z M420.748,229.617c-22.083,22.083-51.445,34.245-82.676,34.245
		c-18.133,0-36.237-4.265-52.353-12.333l-9.672-4.842l-49.986,49.985v46.918h-55.705l0,55.705h-55.705v55.688l-84.5-0.096
		l0.078-37.85L238.311,208.95l-4.842-9.672c-22.572-45.087-13.767-99.351,21.911-135.029C277.466,42.163,306.83,30,338.064,30
		c31.234,0,60.598,12.163,82.684,34.249C466.34,109.841,466.34,184.025,420.748,229.617z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  name="createpass"
                  id="createpass"
                  placeholder="••••••••"
                  ref={passwordRef}
                  className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ps-10"
                  required
                />
              </div>
            </div>
            <div className="mb-1">
              <label
                htmlFor="confirmpass"
                className="block mb-1 text-sm font-medium text-white">
                Confirm Password
              </label>
              <div className=" relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-secondary "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 485.017 485.017"
                    fill="currentColor">
                    <path
                      d="M361.205,68.899c-14.663,0-28.447,5.71-38.816,16.078c-21.402,21.403-21.402,56.228,0,77.631
		c10.368,10.368,24.153,16.078,38.815,16.078s28.447-5.71,38.816-16.078c21.402-21.403,21.402-56.228,0-77.631
		C389.652,74.609,375.867,68.899,361.205,68.899z M378.807,141.394c-4.702,4.702-10.953,7.292-17.603,7.292
		s-12.901-2.59-17.603-7.291c-9.706-9.706-9.706-25.499,0-35.205c4.702-4.702,10.953-7.291,17.603-7.291s12.9,2.589,17.603,7.291
		C388.513,115.896,388.513,131.688,378.807,141.394z"
                    />
                    <path
                      d="M441.961,43.036C414.21,15.284,377.311,0,338.064,0c-39.248,0-76.146,15.284-103.897,43.036
		c-42.226,42.226-54.491,105.179-32.065,159.698L0.254,404.584l-0.165,80.268l144.562,0.165v-55.722h55.705l0-55.705h55.705v-64.492
		l26.212-26.212c17.615,7.203,36.698,10.976,55.799,10.976c39.244,0,76.14-15.282,103.889-43.032
		C499.25,193.541,499.25,100.325,441.961,43.036z M420.748,229.617c-22.083,22.083-51.445,34.245-82.676,34.245
		c-18.133,0-36.237-4.265-52.353-12.333l-9.672-4.842l-49.986,49.985v46.918h-55.705l0,55.705h-55.705v55.688l-84.5-0.096
		l0.078-37.85L238.311,208.95l-4.842-9.672c-22.572-45.087-13.767-99.351,21.911-135.029C277.466,42.163,306.83,30,338.064,30
		c31.234,0,60.598,12.163,82.684,34.249C466.34,109.841,466.34,184.025,420.748,229.617z"
                    />
                  </svg>
                </div>
                <input
                  type="password"
                  name="confirmpass"
                  id="confirmpass"
                  placeholder="••••••••"
                  ref={confirmPasswordRef}
                  className="border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                  required
                />
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-secondary text-secondary-foreground focus:ring-2 focus:outline-none focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              Sign Up
            </button>
          </div>
          <div className="text-xs font-medium text-white flex justify-center">
            Already have an account?{" "}
            <a href="#" className="text-g-700 hover:underline">
              <span className="text-secondary mx-2">
                <a href="/signin">SignIn</a>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
