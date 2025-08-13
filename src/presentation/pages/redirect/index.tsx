import React from "react";
import { Outlet } from "react-router-dom";

/**
 *
 * @desc: Interface du Page de redirection
 */
const RedirectionRoutes = () => {
    return (
        <div className="h-screen w-screen bg-white dark:bg-slate-950">
            <Outlet />
        </div>
    );
};

export default RedirectionRoutes;
