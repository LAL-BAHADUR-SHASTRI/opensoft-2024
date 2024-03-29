import React, {useState} from "react";
function SignUp() {
    const [formData, setFormData] = useState({ email: "", createpass: "",confirmpass:"" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const HandleSubmit=()=>{
    console.log(formData);
  }


    return (
      <div className="flex items-center justify-center min-h-screen bg-signin backdrop-blur-lg object-contain">
        <div className="my-8 w-full max-w-lg p-4   rounded-lg shadow-lg shadow-blue-900 sm:p-6 md:p-8 backdrop-blur-lg">
          <form className="space-y-8 m-6" action="#">
            <div className="flex justify-center">
              <img alt="Logo" src="logo.png" className="h-8 w-auto bg-logo" />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="backdrop-blur-lg bg-transparent border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="XYZ@gmail.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white"
              >
                Create Password
              </label>
              <input
                type="password"
                name="createpass"
                id="createpass"
                placeholder="••••••••"
                value={formData.createpass}
                onChange={handleInputChange}
                className="backdrop-blur-lg bg-transparent border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-white"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmpass"
                id="confirmpass"
                placeholder="••••••••"
                value={formData.confirmpass}
                onChange={handleInputChange}
                className="backdrop-blur-lg border bg-transparent border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <button
              type="submit"
              className="w-full text-black bg-gradient-to-r from-gold to-yellow-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={HandleSubmit}
            >
              Sign Up
            </button>
            {/* <div className="flex items-center justify-center dark:bg-gray-800">
              <button className="bg-blue-700 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
                <img
                  className="w-8 h-8 bg-white border rounded-sm py-1 px-1"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  loading="lazy"
                  alt="google logo"
                ></img>
                <span className=" px-2 py-1 text-white">Login with Google</span>
              </button>
            </div> */}
            <div className="text-sm font-medium text-white flex justify-center">
              Already have an account?{" "}
              <a
                href="#"
                className="text-g-700 hover:underline"
              >
                <span className="text-gold">Signin</span>
              </a>
            </div>
          </form>
        </div>
      </div>
    );
  }
  
  export default SignUp;