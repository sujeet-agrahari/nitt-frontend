import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import "./style/dark.scss";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { courseInputs, userInputs } from "./formSource";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";


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
              <Route index element={<RequireAuth><List /></RequireAuth>} />
              <Route path=":userId" element={<Single />} />
              <Route path="new" element={<RequireAuth><New inputs={userInputs} title="Add New Student" /></RequireAuth>} />
            </Route>
            <Route path="courses">
              <Route index element={<RequireAuth><List /></RequireAuth>} />
              <Route path=":courseId" element={<RequireAuth><Single /></RequireAuth>} />
              <Route path="new" element={<RequireAuth><New inputs={courseInputs} title="Add New Course" /></RequireAuth>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
