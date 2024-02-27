import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import List from './list.js'
import Challenge from './challenge.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/challenge/:uuid" element={<Challenge />} />
      </Routes>
    </BrowserRouter>
);
