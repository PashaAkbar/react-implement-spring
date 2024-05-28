import React, {useState} from 'react';
import axios from 'axios';
import {Navigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {login} from '../redux/authSlice';

const SignUp = () => {
  const dispatch = useDispatch(); // Initialize useDispatch hook
  const [name, setName] = useState(''); // Add name state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToProtectedRoute, setRedirectToProtectedRoute] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8005/auth/signup',
        {email, password, fullName: name},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const responseData = response.data;
      console.log('Account created:', responseData);
      setRedirectToProtectedRoute(true);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  if (redirectToProtectedRoute) {
    return <Navigate to="/signin" />;
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col gap-2 w-1/3 h-[50vh] justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 p-4">
        <div className="mx-auto text-4xl text-white ">Sign Up</div>
        <div className="flex items-center justify-center mx-0">
          <form
            className="flex flex-col w-full h-full px-8"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col px-4">
              <label className="text-white">Name</label>
              <input
                className="ml-2 p-1 rounded-md"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col px-4">
              <label className="text-white">Email</label>
              <input
                className="ml-2 p-1 rounded-md"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col px-4">
              <label className="text-white">Password</label>
              <input
                className="ml-2 p-1 rounded-md"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <button
                type="submit"
                className="bg-blue-500 text-white rounded-md p-1 w-24 mx-auto my-4"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
