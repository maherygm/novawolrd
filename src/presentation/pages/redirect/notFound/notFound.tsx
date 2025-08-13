import React from "react";
import Lottie from "lottie-react";
import NotFoundAnimation from "./sub-Assets/notFound.json";
import { Link } from "react-router-dom";

// Importation des composants
import { Button } from "@heroui/button";

const notFound = () => {
    return (
        <div className="swipeFadeDown bg-point-background  h-screen w-screen dark:bg-slate-950">
            <div className="bg-gradient-background flex h-screen  flex-col items-center justify-center bg-cover">
                <Lottie
                    animationData={NotFoundAnimation}
                    loop={true}
                    style={{
                        width: "200px",
                        height: "200px",
                        marginBottom: "-50px",
                    }}
                />
                <h1 className="mb-2 mt-2 bg-gradient-to-r from-red-500 to-blue-700 bg-clip-text text-transparent font-syne text-[80px] font-bold text-slate-800 md:text-[180px] xl:-mt-5 xl:text-[130px]">
                    Erreur 404
                </h1>
                <h3 className="-mt-8 mb-6 font-bold text-slate-600 xl:text-xl">
                    - Page introuvable -
                </h3>
                <p className="mb-8 w-2/3 text-center font-Poppins md:text-[12px] xl:text-[14px]">
                    Désolé, la page que vous recherchez semble indisponible.
                    Peut-être avez-vous suivi un lien incorrect ou la page a été
                    déplacée. Retournez à la page d&apos;accueil pour continuer
                    votre navigation.
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
    );
};

export default notFound;
