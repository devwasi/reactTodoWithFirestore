import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./config/firebase";
import { Route, Routes } from "react-router-dom";
import Login from "./screens/Login";
import TodoMain from "./screens/TodoMain";
import SignUp from "./screens/SignUp";

const App = () => {
  return <>
  <Routes>
    <Route index element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/todo" element={<TodoMain />} />
  </Routes>
  </>
};

export default App;
