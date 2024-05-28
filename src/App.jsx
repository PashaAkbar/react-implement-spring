import {Route, Routes, Navigate} from 'react-router-dom';
import SignIn from './page/signin';
import Home from './page/home';
import SignUp from './page/signup';
import AllAgenda from './page/allAgenda';
import {useSelector} from 'react-redux';
import {selectAuth} from './redux/authSlice';
import EditAgenda from './page/editAgenda';
import AddAgenda from './page/addAgenda';

const PrivateRoute = ({element}) => {
  const isAuthenticated = useSelector(selectAuth);
  const authToken = getAuthTokenFromCookie();
  const isLogin = localStorage.getItem('isLogin');
  // Check if the user is authenticated and the authentication token is available
  if (isLogin) {
    return element;
  } else {
    // Redirect to sign-in page if not authenticated or token is missing
    return <Navigate to="/signin" />;
  }
};
function getAuthTokenFromCookie() {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.split('=').map((c) => c.trim());
    console.log('name', name);
    if (name === 'Authentification') {
      // Adjust the cookie name if needed
      return value;
    }
  }
  return null;
}

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      <Route
        path="/allAgenda"
        element={<PrivateRoute element={<AllAgenda />} />}
      />
      <Route
        path="/allAgenda/editAgenda/:id"
        element={<PrivateRoute element={<EditAgenda />} />}
      />
      <Route
        path="/allAgenda/addAgenda"
        element={<PrivateRoute element={<AddAgenda />} />}
      />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default App;
