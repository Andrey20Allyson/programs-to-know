import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddTec from "../pages/AddTec";
import Home from "../pages/Home";

export interface RouterProps { }

export default function AppRouter(props: RouterProps) {
  return (
    <BrowserRouter>
      <AppRoutes/>
    </BrowserRouter>
  );
}

export interface RoutesProps { }

export function AppRoutes(props: RoutesProps) {
  return (
    <Routes>
      <Route Component={Home} path='/'/>
      <Route Component={AddTec} path='/add-tec'/>
    </Routes>
  );
}