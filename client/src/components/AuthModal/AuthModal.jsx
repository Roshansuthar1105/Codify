import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  // Effect to handle the mounting and unmounting animations
  useEffect(() => {
    if (isOpen) {
      // When isOpen becomes true, set show to true after a tick to trigger the transition
      const timer = setTimeout(() => setShow(true), 10);
      return () => clearTimeout(timer);
    } else {
      // When isOpen becomes false, set show to false to trigger the fade-out
      setShow(false);
    }
  }, [isOpen]);

  // Don't render the modal if it's not supposed to be open and the animation is done
  if (!isOpen && !show) {
    return null;
  }

  const handleClose = () => {
    // Set show to false to start the animation
    setShow(false);
    // Call the parent's onClose after the animation duration
    const timer = setTimeout(onClose, 300);
    return () => clearTimeout(timer);
  };

  // Prevents the modal from closing when its content is clicked
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  const handleLogin = () => {
    navigate('/login');
    handleClose();
  };

  const handleSignUp = () => {
    navigate('/signup');
    handleClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-out ${show ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
    >
      <div
        className={`relative w-11/12 max-w-md p-8 text-center bg-white rounded-xl shadow-lg transition-all duration-300 ease-out dark:bg-gray-800 ${show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        onClick={handleModalContentClick}
      >
        <button
          className="absolute top-2.5 right-4 bg-transparent border-none text-3xl cursor-pointer text-gray-400 transition-colors hover:text-red-500"
          onClick={handleClose}
        >
          ×
        </button>
        <h2 className="mt-0 text-2xl font-bold text-gray-800 dark:text-white">Unlock Your Learning Journey!</h2>
        <p className="my-6 text-base leading-relaxed text-gray-600 dark:text-gray-300">
          Please log in or create an account to continue watching this video.
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="px-6 py-3 text-base font-bold text-white bg-blue-500 border-none rounded-lg cursor-pointer transition-all duration-200 ease-in-out hover:bg-blue-600 hover:-translate-y-0.5 hover:shadow-lg"
            onClick={handleLogin}
          >
            Log In
          </button>
          <button
            className="px-6 py-3 text-base font-bold text-gray-800 bg-gray-200 border-none rounded-lg cursor-pointer transition-all duration-200 ease-in-out hover:bg-gray-300 hover:-translate-y-0.5 hover:shadow-lg dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
