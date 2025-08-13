import { lazyRetry } from "@/core/utils/componentLoader";
import { FC, lazy } from "react";
import { Route, Routes } from "react-router-dom";

// Importation du page
const MeetRoutes = lazy(() => import('@/presentation/pages/meet'));

// Importation des pages de redirection
const MeetNotFound = lazy(() =>
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
            <Route path="" element={<MeetRoutes />} />

            {/* Page de redirection */}
            <Route path="*" element={<MeetNotFound />} />
        </Routes>
    );
};

export default LandingRoutes;