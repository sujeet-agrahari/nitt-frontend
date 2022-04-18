import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import "./style/dark.scss";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { courseInputs, userInputs } from "./formSource";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import Student from "./pages/student/Student";
import Course from "./pages/course/Course";
import AddNewCourse from "./pages/course/AddNewCourse";
import AddNewStudent from "./pages/student/AddNewStudent";
import Fees from "./pages/fees/Fees";


function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? (children) : <Navigate to="/login" />
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<RequireAuth><Home /></RequireAuth>} />
            <Route path="login" element={<Login />} />
            <Route path="students">
              <Route index element={<RequireAuth><Student /></RequireAuth>} />
              <Route path=":userId" element={<Single />} />
              <Route path="new" element={<RequireAuth><AddNewStudent inputs={userInputs}></AddNewStudent></RequireAuth>} />
            </Route>
            <Route path="courses">
              <Route index element={<RequireAuth><Course /></RequireAuth>} />
              <Route path=":courseId" element={<RequireAuth><Single /></RequireAuth>} />
              <Route path="new" element={<RequireAuth><AddNewCourse inputs={userInputs} title="Add New Course" /></RequireAuth>} />
            </Route>
            <Route path="fees" element={<RequireAuth><Fees /></RequireAuth>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
