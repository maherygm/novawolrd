import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import "@/core/config/translation/i18n";
import "@/presentation/styles/index.scss";
import "@/presentation/styles/animation.scss";

// Importation des configuration
import RoutesConfig from "@/core/routes";

import "/node_modules/flag-icons/css/flag-icons.min.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <HeroUIProvider>
            <RoutesConfig />
        </HeroUIProvider>
    </StrictMode>
);
