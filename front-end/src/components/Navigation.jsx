import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavigationBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      {}
      <div className="container mx-auto flex items-center justify-between">
        {}
        <div className="text-white font-bold text-xl">
          Notes Manager
        </div>

        {}
        {!user ? (
            <div className="hidden md:flex space-x-4">
                <Link to="/login">
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                        Login
                    </button>
                </Link>
                <Link to="/register">
                    <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
                        Register
                    </button>
                </Link>
            </div>
          ) : (
            <div className="hidden md:flex space-x-4">
              <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.reload();
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              >
                Logout
              </button>
            </div>
          )
        }
        {}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
              {!user ? (
                <div>
                    <Link to="/login">
                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                            Login
                        </button>
                    </Link>
                    <Link to="/register">
                        <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
                            Register
                        </button>
                    </Link>
                </div>
              ) : (
                <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
                >
                  Logout
                </button>
              )
            }
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;
