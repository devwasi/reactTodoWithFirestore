import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import TodoMain from "./screens/TodoMain";
import SignUp from "./screens/SignUp";
import AuthRoute from "./routes/authRoutes";
import ProtectedRoutes from "./routes/protectedRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const App = () => {
  return <>
  <Routes>
    <Route element={<AuthRoute />}>
    <Route index element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    </Route>
    <Route element={<ProtectedRoutes />}>
    <Route path="/todo" element={<TodoMain />} />
    </Route>
      
  </Routes>

  <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />
  </>
};

export default App;
