import React, { useState } from "react";
import { Link } from "react-router-dom";
import { t } from "@/core/config/translation/i18nHelper";
import { Tilt } from "react-tilt";

// Imporatation des utils
import { getCopyrightText } from "@/core/config/copyright";

// Importation des composants
import DarkModeSwitch from "@/presentation/components/darkModeSwitch";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

// Importation des icones
import { ArrowDownLeft, Eye, EyeOff } from "lucide-react";
import Star1 from "@/presentation/assets/image/illustrations/star1.webp";
import Star2 from "@/presentation/assets/image/illustrations/star2.webp";

// Importation des resources
import LangSelection from "@/presentation/components/LangSelection";

/**
 * @desc: Interface du Panel d'inscription
 */
const SignUp: React.FC = () => {
    // State management
    const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
    const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
        useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    // Event handlers
    const toggleVisibilityPassword = (): void =>
        setIsVisiblePassword(!isVisiblePassword);

    const toggleVisibilityConfirmPassword = (): void =>
        setIsVisibleConfirmPassword(!isVisibleConfirmPassword);

    const handleSignUp = async (): Promise<void> => {
        console.log("Sign Up");
    };

    const handleKeyDown = (e: React.KeyboardEvent): void => {
        if (e.key === "Enter") {
            handleSignUp();
        }
    }

    return (
        <div
            className="sign-up bg-backglass3-background bg-cover flex h-screen flex-row bg-transparent"
            onKeyDown={handleKeyDown}
        >
            <div className="sign-up-right flex w-full h-screen flex-col justify-between px-9 py-4">
                {/* Header Section */}
                <div className="sign-right-top fadeIn flex w-full justify-between">
                    <div className="sign-top-left flex items-center font-poppins">
                        <span className="bg-light-custom-primary rounded-xl h-10 w-10 text-center text-white flex justify-center items-center m-auto flex-col">
                            <img
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADvElEQVR4nO2Yy28PURTHhyYlulLxiFdtGpFYqB0NaRcEISwRj40/gBKRSBBvideCBaGRSESUSEq8VuKtqcQrUdZaCaFVb8pHTp2J4/bO7zftzCwG32Q2c2fO+X7vPefcc28Q/MdfCmA2cEKf2UGeACyjJ5YGeQHQ4hHQEuQFQLtHQHuQFwDnPQIag7wAqAK6DPlvwKQgTwD2GwF7Yv7TPysyIyQEgHfAHZnhYkSAauCHPtWFyAEDgJO6Uo+BiWkLEPIWz4GBzjfjgLXALeCTJwc+69g6oML5d73z7dW0BXR6CM01xOt19uLiK3AMGKM2njjjT9MWIGHjYrdsThpWLiSBW4FmfdqcpA7xFtjieb8yi6oihCw+ehxfAJYAgz02BuvYxYhVeQecAmalSt4QGChhIxXFQ/4+MK0XtqYDDxwb+zIh7nEuYWMhszaoD3bKgAbH1vJsWP92Os6JeSHfL4G9fsBpJ4xGpsv6T4f1TtgMSsFmGfDQ2K1Ph61/9m2pnG7GFgBvgCtAqfNfKbBLK5EUgp2eb2qM3e/A6CwErLXVxhk7Z8YmO2NC2MVOj/1LZnx1FgJuGwdLnLH5wGvgsmd23fIraC1SHG4mOUk9BTq0Ja4yvU1YOrt8db6AzbgCyjV8wmTuLg6yW0snC5TEOcO66NKucmoh50Xs+kJoR8S3L8w3wuesNoOCJkn4Qo7k8B2F0IiguZcCSlVEa1QSh9C2oxBWBFkKAIbHWu7o/5uTCPCFkJTNvcAU864t4n/pc77EWu5oDi+MnznAGZMXd4va1ErQoofyxvAYGCeJPckaPVt+30MM2fcmiUcnWdVYZVTHnxcTAGxXctuK3CXdSEQ2QsAa4+BikRDyLrfpozqLbGR1WQioiGol4iaxzLyK2Oq8r3XybmzqAtTREePoQV8SNaKZe2TsHkqHrd/ZWKedbki5ne4ERqXLuqfThU6yNvSxZMrMW/Le4pA6tGd55jiWfr6mFzZqnbBBq1hVlsSHARuBV93ueopAD+yyl5RH1PllTrUJYUuwNJNHgXlpES8BNjuXVS/1lmFxxLXKdz3A3NOnzWxSODG/SG89fDiedv0PscGMS7t7uA8XW4fsyStiRQUzkgqwpy20pRgaUaHqgOvABw8ReXcNWBXeyFlo2PiQ7HQmBhyDm2L+N0YPRh0+wp7v52W1AiUaRo0qJlZTBczsLQngeOo5kGCDsr19U9wNj1/C6xLPfBIAEzyhMD7IC4BKj4DKIE8ADhryB4I8gl8rka+Z/49/DT8B+kvOttHs3JIAAAAASUVORK5CYII="
                                alt="virus"
                            />
                        </span>
                        <p className="ml-2 flex flex-col text-[18px]">
                            <span className="first-letter text-center font-Poppins font-extrabold text-slate-800">
                                {process.env.REACT_APP_PROJECT_NAME}
                            </span>
                            <span className="text-[10px]">by Supernova</span>
                        </p>
                    </div>

                    <div className="left-header flex gap-2 items-center">
                        <LangSelection />
                        <DarkModeSwitch />
                        <Link to={"/"}>
                            <Button
                                className="ml-4"
                                size="sm"
                                variant="light"
                                color="secondary"
                            >
                                Retour
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Main Content Section */}
                <div className="sign-middle flex w-full items-center justify-around">
                    {/* Left Decorative Section */}
                    <div className="hidden w-[30%] flex-col items-center justify-around lg:flex">
                        <div className="fadeIn flex gap-6">
                            <div className="sign-image2 floating-element-vertical absolute top-[14vh] left-[6vw] h-[40%] w-[30%] rounded-3xl -rotate-12  bg-secondary-600  transition hover:-translate-y-7 outline outline-offset-2 outline-lime-500"></div>
                            <img
                                src={Star1}
                                className="relative right-[4vw] -bottom-[25vh] -top-18 w-[30%] h-[30%]"
                                alt="star 1"
                            />
                            <img
                                src={Star2}
                                className="relative left-[21vw] -top-[200px] w-16 h-16"
                                alt="star 1"
                            />
                            <div className="sign-image3 hover:scale-110 absolute left-[31vw] top-[8vh] backdrop-blur-md mt-[130px] h-[170px] w-[170px] rounded-full bg-slate-300 bg-opacity-45 transition">
                                <svg
                                    className="absolute turnInfinite w-[170px] h-[170px]"
                                    viewBox="0 0 200 200"
                                >
                                    <defs>
                                        <path
                                            id="circlePath"
                                            d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                                        />
                                    </defs>
                                    <text
                                        fill="black"
                                        fontSize="14"
                                        fontWeight="bold"
                                    >
                                        <textPath
                                            xlinkHref="#circlePath"
                                            className="flex justify-between"
                                            startOffset="50%"
                                            textAnchor="middle"
                                        >
                                            Your Circular Text Here - Your
                                            Circular Text - Your CircularText
                                        </textPath>
                                    </text>
                                </svg>
                                <ArrowDownLeft className="absolute top-7 left-8 text-black w-[100px] h-[100px]" />
                            </div>

                            <div className="sign-image absolute bottom-[17vh] left-[25vw] mt-[130px] h-[40%] w-[28%] rounded-3xl rotate-12  bg-success-600  transition hover:-translate-y-4 outline outline-offset-2 outline-sky-500 floating-element-vertical-right"></div>
                        </div>
                    </div>

                    {/* Sign Up Form Section */}
                    <div className="sign-form swipeFadeUp  flex flex-col justify-center w-[90%] lg:w-[40%] rounded-2xl ">
                        <div className="sign-up-title mx-auto  min-w-[400px] mb-2  text-left font-poppins">
                            <h1 className="mt-1 w-full font-syne bg-gradient-to-r from-red-500 to-blue-700 bg-clip-text text-6xl font-bold text-slate-800 text-transparent dark:text-slate-200 md:text-[46px]">
                                Inscription
                            </h1>
                            <p className="mt-4 font-poppins text-xs font-semibold text-slate-500 dark:text-slate-400">
                                Un service plus rapide, une attente mieux
                                organisée.
                            </p>
                        </div>

                        <div className="form mx-auto mb-6 flex w-full max-w-[400px]  flex-col flex-wrap items-end font-poppins sm:flex-nowrap md:mb-0">
                            <Input
                                key={"outside"}
                                size={"md"}
                                isClearable
                                type="text"
                                radius={"md"}
                                value={username}
                                label="Nom d'utilisateur"
                                labelPlacement={"outside"}
                                color={"secondary"}
                                description={"Entrez votre nom d'utilisateur"}
                                isInvalid={false}
                                onChange={(e) => setUsername(e.target.value)}
                                classNames={{
                                    input: [
                                        "border-none",
                                        "focus:outline-none",
                                        "focus:border-none",
                                        "bg-black",
                                    ],
                                }}
                            />

                            <Input
                                key={"outside"}
                                size={"md"}
                                isClearable
                                type="email"
                                radius={"md"}
                                value={email}
                                label="Email"
                                labelPlacement={"outside"}
                                color={"secondary"}
                                description={"Entrez votre adresse email"}
                                isInvalid={false}
                                onChange={(e) => setEmail(e.target.value)}
                                classNames={{
                                    input: [
                                        "border-none",
                                        "focus:outline-none",
                                        "focus:border-none",
                                        "bg-black",
                                    ],
                                }}
                            />

                            <Input
                                key={"outside"}
                                size={"md"}
                                radius={"md"}
                                type={isVisiblePassword ? "text" : "password"}
                                label="Mot de passe"
                                labelPlacement={"outside"}
                                description={"Entrez votre mot de passe"}
                                isInvalid={false}
                                value={password}
                                color={"secondary"}
                                onChange={(e) => setPassword(e.target.value)}
                                classNames={{
                                    input: [
                                        "border-none",
                                        "focus:outline-none",
                                        "focus:border-none",
                                    ],
                                }}
                                endContent={
                                    <button
                                        className="focus:outline-none"
                                        type="button"
                                        onClick={toggleVisibilityPassword}
                                    >
                                        {isVisiblePassword ? (
                                            <Eye className="pointer-events-none text-2xl text-default-400" />
                                        ) : (
                                            <EyeOff className="pointer-events-none text-2xl text-default-400" />
                                        )}
                                    </button>
                                }
                            />

                            <Input
                                key={"outside"}
                                size={"md"}
                                radius={"md"}
                                type={
                                    isVisibleConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                label="Confirmer le mot de passe"
                                labelPlacement={"outside"}
                                description={"Confirmez votre mot de passe"}
                                isInvalid={false}
                                value={confirmPassword}
                                color={"secondary"}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                classNames={{
                                    input: [
                                        "border-none",
                                        "focus:outline-none",
                                        "focus:border-none",
                                    ],
                                }}
                                endContent={
                                    <button
                                        className="focus:outline-none"
                                        type="button"
                                        onClick={
                                            toggleVisibilityConfirmPassword
                                        }
                                    >
                                        {isVisibleConfirmPassword ? (
                                            <Eye className="pointer-events-none text-2xl text-default-400" />
                                        ) : (
                                            <EyeOff className="pointer-events-none text-2xl text-default-400" />
                                        )}
                                    </button>
                                }
                            />

                            <div className="mt-4 flex w-full items-center justify-between">
                                <Link
                                    to="/auth"
                                    className="text-[13px] text-slate-500 hover:text-slate-700"
                                >
                                    Déjà un compte ? Connectez-vous
                                </Link>
                            </div>

                            <Button
                                className="mt-4 w-full"
                                color="primary"
                                variant="shadow"
                                onClick={handleSignUp}
                            >
                                S'inscrire
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="sign-right-bottom fadeIn flex w-full items-center justify-between text-xs text-slate-500">
                    <p>{getCopyrightText()}</p>
                    <div className="flex gap-4">
                        <Link to="/" className="hover:text-slate-700">
                            Conditions d'utilisation
                        </Link>
                        <Link to="/" className="hover:text-slate-700">
                            Politique de confidentialité
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
