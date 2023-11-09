import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Admin from '../Admin/Admin';
import App from '../../App';

const PagesRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/admin" element={<Admin/>} />
    </Routes>
  );
};

export default PagesRouter;