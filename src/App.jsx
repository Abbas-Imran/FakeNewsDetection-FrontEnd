import "./App.css";
import React, { useContext } from "react";
import Home from "./Components/Home";
import { AuthContext } from "./Components/store/auth-context";
import Login from "./Components/Auth/Login";
import Signup from "./Components/Auth/Signup";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const AuthCtx = useContext(AuthContext);
  console.log("login", AuthCtx.isLoggedIn);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            AuthCtx.isLoggedIn ? (
              <Navigate to="/Home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/Home"
          element={
            AuthCtx.isLoggedIn ? <Home /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/login"
          element={
            !AuthCtx.isLoggedIn ? <Login /> : <Navigate to="/Home" replace />
          }
        />
        <Route
          path="/Signup"
          element={
            !AuthCtx.isLoggedIn ? <Signup /> : <Navigate to="/Home" replace />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
