import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Index from "../pages/Index";
import Multiplayer from "../pages/Multiplayer";
import One2one from "../pages/One2one";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/hw5">
      <Route index element={<Index />} />
      <Route path="One" element={<One2one />} />
      <Route path="One/:id" element={<One2one />} />
      <Route path=":id" element={<Multiplayer />} />
    </Route>
  )
)

export default Router;
