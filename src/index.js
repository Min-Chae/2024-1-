import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import List from './list.js'
import Challenge from './challenge.js'
import Register from './register.js'
import Login from './login.js'
import Navbar from './navbar.js'
import Rank from './rank.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/challenge/:uuid" element={<Challenge />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/rank" element={<Rank />} />
      </Routes>
    </BrowserRouter>
);
