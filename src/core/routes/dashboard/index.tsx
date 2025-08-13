import { lazyRetry } from "@/core/utils/componentLoader";
import React, { FC, lazy } from "react";
import { Route, Routes } from "react-router-dom";

// Importation du page
const DashboardLayout = lazy(() => import("@/presentation/pages/dashboard"));

// Importation des panels avec un wrapper
const DashboardHome = lazy(() =>
    lazyRetry(
        () => import("@/presentation/pages/dashboard/panels/home"),
        "home"
    )
);

const DashboardHealth = lazy(() =>
    lazyRetry(
        () => import("@/presentation/pages/dashboard/panels/healthCenter"),
        "healthCenter"
    )
);

const DashboardMateriel = lazy(() =>
    lazyRetry(
        () => import("@/presentation/pages/dashboard/panels/materials"),
        "materials"
    )
);
const DashboardDecision = lazy(() =>
    lazyRetry(
        () => import("@/presentation/pages/dashboard/panels/Decision"),
        "materials"
    )
);
const DashboardInfection = lazy(() =>
    lazyRetry(
        () => import("@/presentation/pages/dashboard/panels/Infection"),
        "materials"
    )
);

// Importation des pages de redirection
const DashboardNotFound = lazy(() =>
    lazyRetry(
        () => import("@/presentation/pages/redirect/notFound/notFound"),
        "notfound"
    )
);

/**
 *
 * @desc: Configuration des routes pour le dashboard
 */
const DashboardRoutes: FC = () => {
    return (
        <Routes>
            <Route path="" element={<DashboardLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="home" element={<DashboardHome />} />
                <Route path="health/center" element={<DashboardHealth />} />
                <Route path="material" element={<DashboardMateriel />} />
                <Route path="decision" element={<DashboardDecision />} />
                <Route path="infection" element={<DashboardInfection />} />
            </Route>

            {/* Page de redirection */}
            <Route path="*" element={<DashboardNotFound />} />
        </Routes>
    );
};

export default DashboardRoutes;
