import React, { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

// Importation des routes de redirection
import Loader from "@/presentation/pages/redirect/loader/loaderPage";

// Importation des utils
import { getInitialDarkModePreference } from "@/core/utils/theme";

// importation des composants
import ConnectionStatus from "@/presentation/components/connectionStatus";

// Page globale
const Layout = lazy(() => import("@/presentation/pages"));

// Route principal par section de page
const AuthRoutes = lazy(() => import("./Auth"));
const DashboardRoutes = lazy(() => import("./dashboard"));
const RedirectionRoutes = lazy(() => import("./redirect"));
const AssistanceRoutes = lazy(() => import("./assistanceIA"));
const LandingRoutes = lazy(() => import("./landing"));
const SimulationRoutes = lazy(() => import("./simulation"));
const ConsultationRoutes = lazy(() => import("./consultation"));
const Maps3DRoutes = lazy(() => import("./maps3D"));
const MeetRoutes = lazy(() => import("./meet"));
const DiseaseRoutes = lazy(() => import("./disease"));

// Importaion des pages de redirection
const NotFound = lazy(
    () => import("@/presentation/pages/redirect/notFound/notFound")
);

/**
 *
 * @desc: Configuration global des routes
 */
const RoutesConfig = () => {
    getInitialDarkModePreference();

    return (
        <BrowserRouter>
            <Suspense fallback={<Loader />}>
                <Toaster
                    position="top-center"
                    expand={false}
                    richColors
                    closeButton
                />

                {/* Constant components */}
                <ConnectionStatus />
                <Routes>
                    {/* Rediriger de '/' vers '/auth' */}
                    <Route
                        path="/"
                        element={<Navigate to="/landing" replace />}
                    />

                    <Route path="/" element={<Layout />}>
                        {/* Sous-routes pour Auth */}
                        <Route path="auth/*" element={<AuthRoutes />} />

                        {/* Sous-routes pour Dashboard */}
                        <Route
                            path="dashboard/*"
                            element={<DashboardRoutes />}
                        />

                        <Route
                            path="assitance/ai"
                            element={<AssistanceRoutes />}
                        />

                        {/* Sous-routes pour les pages de maps 3D */}
                        <Route path="maps3D/*" element={<Maps3DRoutes />} />

                        <Route path="landing/*" element={<LandingRoutes />} />

                        <Route
                            path="simulation/*"
                            element={<SimulationRoutes />}
                        />

                        <Route
                            path="consultation/*"
                            element={<ConsultationRoutes />}
                        />

                        <Route path="meet/*" element={<MeetRoutes />} />

                        <Route path="disease/*" element={<DiseaseRoutes />} />

                        {/* Sous-routes pour les redirections */}
                        <Route
                            path="redirect/*"
                            element={<RedirectionRoutes />}
                        />

                        {/* Routes des pages introuvable*/}
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
};

export default RoutesConfig;
