import { lazyRetry } from "@/core/utils/componentLoader";
import { FC, lazy } from "react";
import { Route, Routes } from "react-router-dom";

// Importation des panels avec un wrapper
const DiseaseList = lazy(() =>
    lazyRetry(() => import("@/presentation/pages/Disease"), "Disease")
);

// Importation des pages de redirection
const DiseaseNotFound = lazy(() =>
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
            <Route path="" element={<DiseaseList />} />

            {/* Page de redirection */}
            {/* <Route path="*" element={<DiseaseNotFound />} /> */}
        </Routes>
    );
};

export default LandingRoutes;
