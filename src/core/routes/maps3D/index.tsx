import { lazyRetry } from "@/core/utils/componentLoader";
import { FC, lazy } from "react";
import { Route, Routes } from "react-router-dom";

// Importation du page
const Maps3DLayout = lazy(() => import("@/presentation/pages/maps3D"));

// Importation du page
const MAPS = lazy(() => import("@/presentation/pages/maps3D/layouts/maps"));


const LandingNotFound = lazy(() =>
    lazyRetry(
        () => import("@/presentation/pages/redirect/notFound/notFound"),
        "notfound"
    )
);
/**
 *
 * @desc: Configuration des routes pour le dashboard
 */
const Maps3DRoutes: FC = () => {
    return (
        <Routes>
            <Route path="" element={<Maps3DLayout />}>
                <Route index element={<MAPS />} />
               
                {/*  <Route path="explore" element={<Exploration />} /> */}
            </Route>

            {/* Page de redirection */}
            <Route path="*" element={<LandingNotFound />} />
        </Routes>
    );
};

export default Maps3DRoutes;
