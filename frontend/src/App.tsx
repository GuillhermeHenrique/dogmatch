import { Outlet } from "react-router-dom";

import "./App.css";

// components
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Message from "./components/layout/Message";

function App() {
  return (
    <>
      <Navbar />
      <Message />
      <div className="container">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
