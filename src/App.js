import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfirmProvider } from 'material-ui-confirm';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import Login from './pages/login/Login';
import { AuthContext } from './context/AuthContext';
import Student from './pages/student/Student';
import Course from './pages/course/Course';
import AddNewStudent from './pages/student/AddNewStudent';
import Fees from './pages/fees/Fees';
import SingleStudent from './pages/student/SingleStudent';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/not-found/NotFound';
import ErrorTemplate from './components/error/ErrorTemplate';
import Home from './pages/home/Home';

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 3000,
  offset: '100px',
  containerStyle: { zIndex: 9999999999999, marginBottom: '50px' },
  transition: transitions.FADE,
};

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => (currentUser ? children : <Navigate to="/login" />);

  return (
    <ConfirmProvider>
      <AlertProvider template={ErrorTemplate} {...options}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="/dashboard">
              <Route
                index
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />

              <Route path="students">
                <Route
                  index
                  element={
                    <RequireAuth>
                      <Student />
                    </RequireAuth>
                  }
                />
                <Route
                  path=":studentId"
                  element={
                    <RequireAuth>
                      <SingleStudent />
                    </RequireAuth>
                  }
                />
                <Route
                  path="new"
                  element={
                    <RequireAuth>
                      <AddNewStudent />
                    </RequireAuth>
                  }
                />
              </Route>
              <Route path="courses">
                <Route
                  index
                  element={
                    <RequireAuth>
                      <Course />
                    </RequireAuth>
                  }
                />
              </Route>
              <Route
                path="fees"
                element={
                  <RequireAuth>
                    <Fees />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AlertProvider>
    </ConfirmProvider>
  );
}

export default App;
