import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./config/firebase";
import { Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import TodoMain from "./screens/TodoMain";
import SignUp from "./screens/SignUp";
import AuthRoute from "./routes/authRoutes";
import ProtectedRoutes from "./routes/protectedRoute";

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
  </>
};

export default App;
