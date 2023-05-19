import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Index from "../pages/Index";
import One2one from "../pages/One2one";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/hw5">
      <Route index element={<Index />} />
      <Route path="Chat" element={<One2one />} />
    </Route>
  )
)

export default Router;
