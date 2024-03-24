import { React,useState } from "react";
import './Navbar.css';

function NavBar({onTabChange}) {
  const tabs=['Home','About','Statistics','Contact'];
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div>
      <nav className=" bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 py-4">
        <div className="flex flex-wrap items-center justify-between mx-auto px-4">
          <div className="bg-logo">
            <img alt="Logo" src="logo.png" className="h-8 w-auto bg-logo" />
          </div>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="text-white bg-blue-700 hover:border-yellow-500 border-b-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Get started
            </button>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col px-4 md:p-0 mt-4 font-medium border text-white border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
             {tabs.map((tab,index)=>(
                            <li>
                            <a
                              href="#"
                              className={`tab block py-2 px-3 text-gray-600 rounded hover:border-yellow-500 hover:border-b-2 md:hover:bg-transparent md:hover:text-blue-700 md:p-0  ${index === activeTab ? 'active' : ''}`}
                              aria-current="page"
                              onClick={()=>{setActiveTab(index);onTabChange(index)}}
                            >
                              {tab}
                            </a>
                          </li>
             ))} 
              {/* <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white rounded md:bg-transparent md:p-0 border-yellow-500 border-b-2 "
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-600 rounded hover:border-yellow-500 hover:border-b-2 md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-600 rounded hover:border-yellow-500 hover:border-b-2  md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-600 rounded hover:border-yellow-500 hover:border-b-2  md:hover:bg-transparent md:hover:text-blue-700 md:p-0"
                >
                  Contact
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
