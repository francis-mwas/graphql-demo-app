import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import ExpensePage from './pages/ExpensePage';
import NotFound from './pages/NotFound';
import Header from './components/ui/Header';
import { GET_AUTHENTICATED_USERS } from './graphql/queries/user.queries';
import { useQuery } from '@apollo/client';
import { Toaster } from 'react-hot-toast';

function App() {
  const { loading, data, error } = useQuery(GET_AUTHENTICATED_USERS);
  console.log('loading: ', loading);
  console.log('The data: ', data);
  console.log('The errors: ', error);

  return (
    <>
      {data?.authUser && <Header />}
      <Routes>
        <Route
          path="/"
          element={data?.authUser ? <HomePage /> : <Navigate to="login" />}
        />
        <Route
          path="/login"
          element={!data?.authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!data?.authUser ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/expense/:id"
          element={data?.authUser ? <ExpensePage /> : <Navigate to="/" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}
export default App;
