import { lazyRetry } from "@/core/utils/componentLoader";
import { FC, lazy } from "react";
import { Route, Routes } from "react-router-dom";

// Importation du page
const SimulationLayout = lazy(() => import("@/presentation/pages/simulation"));

// Importation des panels avec un wrapper
const SimulationViewer = lazy(() =>
    lazyRetry(
        () =>
            import(
                "@/presentation/pages/simulation/containers/simulationViewer"
            ),
        "team"
    )
);

const Simulation3D = lazy(() =>
    lazyRetry(
        () => import("@/presentation/pages/simulation/containers/Simulation3d"),
        "team"
    )
);

// Importation des pages de redirection
const SimulationNotFound = lazy(() =>
    lazyRetry(
        () => import("@/presentation/pages/redirect/notFound/notFound"),
        "notfound"
    )
);

/**
 *
 * @desc: Configuration des routes pour le dashboard
 */
const LandingRoutes: FC = () => {
    return (
        <Routes>
            <Route path="" element={<SimulationLayout />}>
                <Route index element={<SimulationViewer />} />
                <Route path="propagation" element={<Simulation3D />} />
                {/*  <Route path="explore" element={<Exploration />} /> */}
            </Route>

            {/* Page de redirection */}
            <Route path="*" element={<SimulationNotFound />} />
        </Routes>
    );
};

export default LandingRoutes;
