import React from "react";
import { Outlet } from "react-router-dom";

const simulation = () => {
    return (
        <div className="w-full h-screen transition bg-abstract-background dark:bg-gray-900">
            <Outlet />
        </div>
    );
};

export default simulation;
