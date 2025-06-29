// src/components/Layout.jsx
import React from "react";
import Header from "./Header";          // se quiser manter
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Header />                        {/* opcional */}
      {/*  AQUI é onde as rotas filhas aparecem  */}
      <Outlet />
    </>
  );
}

export default Layout;
