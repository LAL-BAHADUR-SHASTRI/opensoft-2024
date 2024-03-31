import React from 'react';

const ErrorPage = ({text}) => {
  return (
    <div className="loading-container text-center" style={{
    backgroundColor: "rgba(0, 0, 0, 0.8)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "96vh",
    }}>
        <div className='animate-bounce'>
      <span className="mt-10 loading-text text-pink-300 font-semibold text-xl">
        {text}  
      </span>
      </div>
    </div>
  );
};
export default ErrorPage;