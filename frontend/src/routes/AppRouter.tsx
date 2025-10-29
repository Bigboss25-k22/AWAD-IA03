import { BrowserRouter, Routes, Route } from "react-router-dom";
// Use explicit file extensions to avoid module resolution / HMR ambiguity
import Home from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";
import Register from "../pages/Register.tsx";
import Navbar from "../components/layout/Navbar";
import { RequireGuest } from "./guards";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <RequireGuest>
              <Login />
            </RequireGuest>
          }
        />
        <Route
          path="/register"
          element={
            <RequireGuest>
              <Register />
            </RequireGuest>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
