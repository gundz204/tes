import React from "react";
import AppRoutes from "./routes";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <AppRoutes />
      <ScrollToTop />
      <ToastContainer />
    </>
  );
}

export default App;
