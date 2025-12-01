// src/App.tsx
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/app.Routes";
import { ToastContainer } from "react-toastify";

const App = () => (
  <BrowserRouter>
    <AppRoutes />
    <ToastContainer />
  </BrowserRouter>
);

export default App;
