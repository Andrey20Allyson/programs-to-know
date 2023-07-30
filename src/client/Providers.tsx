import React, { PropsWithChildren } from "react";
import { TecViewModalProvider } from "./components/TecViewModal";

export function Providers(props: PropsWithChildren) {
  return (
    <TecViewModalProvider>
      {props.children}
    </TecViewModalProvider>
  );
}