import { lazyRetry } from "@/core/utils/componentLoader";
import { FC, lazy } from "react";
import { Route, Routes } from "react-router-dom";

// Importation du page
const ConsultationRoutes = lazy(() => import('@/presentation/pages/consultation'));

// Importation des pages de redirection
const ConsultationNotFound = lazy(() =>
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
            <Route path="" element={<ConsultationRoutes />} />

            {/* Page de redirection */}
            <Route path="*" element={<ConsultationNotFound />} />
        </Routes>
    );
};

export default LandingRoutes;