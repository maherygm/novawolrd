import { lazyRetry } from "@/core/utils/componentLoader";
import BlobContains from "@/presentation/components/blob";
import { FC, lazy } from "react";
import { Route, Routes } from "react-router-dom";

// Importation du page
const LandingLayout = lazy(() => import("@/presentation/pages/landing"));
const Urbanism = lazy(() => import("@/presentation/pages/urbanism"));

// Importation des panels avec un wrapper
const LandingTest = lazy(() =>
    lazyRetry(
        () => import("@/presentation/pages/landing/containers/test"),
        "home"
    )
);

// Importation des panels avec un wrapper
const LandingTeam = lazy(() =>
    lazyRetry(
        () =>
            import("@/presentation/pages/landing/containers/teamPresentation"),
        "team"
    )
);

const LandingActuality = lazy(() =>
    lazyRetry(
        () => import("@/presentation/pages/landing/containers/actuality"),
        "team"
    )
);

// Importation des pages de redirection
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
const LandingRoutes: FC = () => {
    return (
        <Routes>
            <Route path="" element={<LandingLayout />}>
                <Route index element={<LandingTest />} />
                <Route path="team" element={<LandingTeam />} />
                <Route path="actuality" element={<LandingActuality />} />
                <Route path="urbanism" element={<Urbanism />} />
                <Route path="assistant" element={<BlobContains />} />
            </Route>

            {/* Page de redirection */}
            <Route path="*" element={<LandingNotFound />} />
        </Routes>
    );
};

export default LandingRoutes;
