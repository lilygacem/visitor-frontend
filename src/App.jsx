import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import VisitorInfo from "./pages/VisitorInfo";
import ServiceList from "./pages/ServiceList";
import Visites from "./pages/Visites";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      {isAuthenticated && <Navbar setIsAuthenticated={setIsAuthenticated} />}
      <Routes>
        <Route
          path="/"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/Dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/visiteurs"
          element={isAuthenticated ? <VisitorInfo /> : <Navigate to="/" />}
        />
        <Route
          path="/services"
          element={isAuthenticated ? <ServiceList /> : <Navigate to="/" />}
        />

        <Route
          path="/visites"
          element={isAuthenticated ? <Visites /> : <Navigate to="/" />}
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
