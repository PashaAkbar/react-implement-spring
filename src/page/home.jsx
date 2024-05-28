import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {logout} from '../redux/authSlice';
import axios from 'axios';

const Home = () => {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch(); // Initialize useDispatch hook

  useEffect(() => {
    // Function to fetch user data
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token not found in localStorage');
        }

        const response = await axios.get('http://localhost:8005/users/me', {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);

        setUserData(response.data.fullName);
      } catch (error) {
        if (error.response.status === 401) {
          dispatch(logout());
          alert('Session Expired! Please login again.');
        }
        console.error('Failed to fetch user data:', error.response);
        // Log error response for debugging
        if (error.response) {
          console.error('Error response:', error.response.data);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/signin';
  };

  return (
    <div className="w-full h-screen  justify-center items-center bg-gradient-to-r from-cyan-500 to-blue-500">
      {/* <h2>User Information</h2> */}
      <div className="flex w-full justify-end p-3 absolute">
        <button
          className="bg-white px-6 py-3 rounded-xl hover:text-blue-700 hover:bg-slate-200"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
      {userData ? (
        <div className="flex flex-col gap-3 text-white justify-center items-center h-full">
          <div className="p-8 pt-2">
            <div className="flex flex-col text-center justify-center">
              <h2 className="text-4xl capitalize">Hi, {userData} !</h2>
              <h2 className="text-4xl">Nice to See You Back</h2>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Home;
