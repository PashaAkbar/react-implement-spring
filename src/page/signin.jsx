import React, {useState} from 'react';
import axios from 'axios';
import {Navigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {login} from '../redux/authSlice';
import {Link} from 'react-router-dom';

const SignIn = () => {
  const dispatch = useDispatch(); // Initialize useDispatch hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToProtectedRoute, setRedirectToProtectedRoute] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8005/auth/login',
        {email, password},
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      const responseData = response.data;
      dispatch(login());
      localStorage.setItem('token', responseData.token);
      setRedirectToProtectedRoute(true);
      alert('Login successful!');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  if (redirectToProtectedRoute) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col gap-2 w-full mx-96 h-[50vh] justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 p-4">
        <div className="mx-auto text-4xl text-white ">Sign in</div>
        <div className="flex items-center justify-center mx-0">
          <form
            className="flex flex-col w-full h-full px-8"
            onSubmit={handleSubmit}
          >
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
                Sign in
              </button>
            </div>
            <div className="flex flex-row gap-2">
              <p>Create New Account </p>{' '}
              <Link className="text-white" to={'/signup'}>
                sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
