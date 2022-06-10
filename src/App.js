import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfirmProvider } from 'material-ui-confirm';
<<<<<<< HEAD
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

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 3000,
  offset: '100px',
  containerStyle: { zIndex: 9999999999999, marginBottom: '50px' },
  transition: transitions.FADE,
};
=======
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Single from './pages/single/Single';
import './style/dark.scss';
import { userInputs } from './formSource';
import { AuthContext } from './context/AuthContext';
import Student from './pages/student/Student';
import Course from './pages/course/Course';
import AddNewCourse from './pages/course/AddNewCourse';
import AddNewStudent from './pages/student/AddNewStudent';
import Fees from './pages/fees/Fees';
import SingleStudent from './pages/student/SingleStudent';
import ThemeProvider from './theme';
import Dashboard from './pages/Dashboard/Dashboard';
import NotFound from './pages/not-found/NotFound';
>>>>>>> master

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => (currentUser ? children : <Navigate to="/login" />);

  return (
<<<<<<< HEAD
    <ConfirmProvider>
      <AlertProvider template={ErrorTemplate} {...options}>
=======
    <ThemeProvider>
      <ConfirmProvider>
>>>>>>> master
        <BrowserRouter>
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route path="login" element={<Login />} />
              <Route path="students">
                <Route
                  index
                  element={
                    <RequireAuth>
                      <Student />
                    </RequireAuth>
                  }
                />
<<<<<<< HEAD
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
=======
                <Route path=":studentId" element={<SingleStudent />} />
                <Route
                  path="new"
                  element={
                    <RequireAuth>
                      <AddNewStudent inputs={userInputs} />
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
                <Route
                  path=":courseId"
                  element={
                    <RequireAuth>
                      <Single />
                    </RequireAuth>
                  }
                />
                <Route
                  path="new"
                  element={
                    <RequireAuth>
                      <AddNewCourse inputs={userInputs} title="Add New Course" />
>>>>>>> master
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
<<<<<<< HEAD
      </AlertProvider>
    </ConfirmProvider>
=======
      </ConfirmProvider>
    </ThemeProvider>
>>>>>>> master
  );
}

export default App;
