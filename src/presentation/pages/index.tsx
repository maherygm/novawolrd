import React from "react";
import { Outlet } from "react-router-dom";


const AuthLayout = () => {
    return (
        <div className="main-content overflow-y-auto sm:h-full sm:w-full">
            <Outlet />
        </div>
    );
};

export default AuthLayout;

