import React from "react";
import AppRouter from "./router";
import { Providers } from "./Providers";

export default function App() {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
}