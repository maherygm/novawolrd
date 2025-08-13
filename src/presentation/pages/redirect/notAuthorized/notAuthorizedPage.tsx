import React from "react";
import NotFound from "../../../assets/image/gif/NoInternet.png";
import { Link } from "react-router-dom";

// Importation des composants
import { Button } from "@heroui/button";

/**
 *
 * @desc: Page de rediction pour les routes non autorisées
 */
const UnauthorizedPage = () => {
    return (
        <div className="bg-point-background swipeFadeDown h-screen w-screen">
            <div className="bg-gradient-background flex h-screen flex-col items-center justify-center bg-cover">
                <div className="flex w-5/6 items-center">
                    <img src={NotFound} alt="Not found" />

                    <div>
                        <h1 className="font-syne font-bold text-[70px] bg-gradient-to-r from-red-500 to-blue-700 bg-clip-text text-transparent">
                            403 - Non Autorisé
                        </h1>
                        <p className="mb-10 font-Poppins">
                            Vous n&lsquo;avez pas les permissions nécessaires
                            pour accéder à cette page.
                        </p>
                        <Link to={"/"}>
                            <Button
                                color="primary"
                                className="font-Poppins text-sm outline outline-2 outline-offset-2 outline-slate-400 hover:scale-105"
                            >
                                Retour à l&lsquo;accueil
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnauthorizedPage;
