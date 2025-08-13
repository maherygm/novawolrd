import { lazyRetry } from "@/core/utils/componentLoader";
import { FC, lazy } from "react";
import { Route, Routes } from "react-router-dom";

// Importation du page
const AssistanceRoutes = lazy(() => import('@/presentation/pages/AssisatnceIA'));

// Importation des pages de redirection
const AssistanceNotFound = lazy(() =>
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
            <Route path="" element={<AssistanceRoutes />} />

            {/* Page de redirection */}
            <Route path="*" element={<AssistanceNotFound />} />
        </Routes>
    );
};

export default LandingRoutes;