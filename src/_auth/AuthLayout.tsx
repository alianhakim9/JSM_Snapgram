import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <React.Fragment>
      {isAuthenticated ? (
        <Navigate to={"/"} />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>
          <img
            src="/assets/images/side-img.svg"
            alt="Logo"
            className="hidden md:block h-screen w-1/2 object-cover bg-repeat"
          />
        </>
      )}
    </React.Fragment>
  );
};
