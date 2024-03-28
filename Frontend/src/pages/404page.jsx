import React from 'react';

const ErrorPage = ({text}) => {
  return (
    <div className="loading-container text-center" style={{
    backgroundColor: "rgba(0, 0, 0, 0.8)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "96vh",
    }}>
      <span className="loading-text text-pink-300 font-semibold text-xl">
        {text}  
      </span>
    </div>
  );
};
export default ErrorPage;