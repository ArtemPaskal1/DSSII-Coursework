import React, { useState } from 'react';
import authService from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      await authService.register(username, password, confirmPassword);
      const response = await authService.login(username, password);
      login(response.token);
      navigate('/');
    } catch (err) {
      console.error('Registration failed', err);
      setError('Ошибка регистрации или логина');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Create Account</h2>

        {error && <div className="mb-4 text-red-600 font-medium text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-1">Username</label>
            <input
              id="username"
              type="text"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-1">Password</label>
            <input
              id="password"
              type="password"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-gray-700 font-semibold mb-1">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-400"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition-all duration-200"
          >
            Register
          </button>
        </form>

        <p className="mt-5 text-center text-gray-600">
          Already have an account? <span
            className="text-green-500 cursor-pointer hover:underline"
            onClick={() => navigate('/login')}
          >Login</span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
