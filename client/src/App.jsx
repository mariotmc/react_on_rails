import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import AppRoutes from "./components/AppRoutes";

function App() {
  return (
    <Router>
      <h1>Blog</h1>
      <Navbar />
      <AppRoutes />
    </Router>
  );
}

export default App;
