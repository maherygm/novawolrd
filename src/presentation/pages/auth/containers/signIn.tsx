import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { t } from "@/core/config/translation/i18nHelper";

// Imporatation des utils
import { getCopyrightText } from "@/core/config/copyright";

// Importation des composants
import DarkModeSwitch from "@/presentation/components/darkModeSwitch";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";

// Importation des icones
import { ArrowDownLeft, Eye, EyeOff } from "lucide-react";
import Star1 from "@/presentation/assets/image/illustrations/star1.webp";
import Star2 from "@/presentation/assets/image/illustrations/star2.webp";
import Bell from "@/presentation/assets/image/illustrations/bell.png";

// Importation des resources
import { getAuthData } from "@/core/utils/authUtils";
import LangSelection from "@/presentation/components/LangSelection";

/**
 * @desc: Interface du Panel de connexion
 */
const SignIn: React.FC = () => {
    // State management
    const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
    const [session, setSession] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    // Load saved auth data on mount
    useEffect(() => {
        const authData = getAuthData();
        if (authData.session && authData.password) {
            setSession(authData.session);
            setPassword(authData.password);
        }
    }, [session, password]);

    // Event handlers
    const toggleVisibilityPassword = (): void =>
        setIsVisiblePassword(!isVisiblePassword);

    const handleLogin = async (): Promise<void> => {
        console.log("Login");
    };

    const handleKeyDown = (e: React.KeyboardEvent): void => {
        if (e.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <div
            className="sign-in bg-backglass3-background  bg-cover flex h-screen flex-row bg-transparent"
            onKeyDown={handleKeyDown}
        >
            <div className="sign-in-right   flex w-full h-screen flex-col justify-between px-9 py-4">
                {/* Header Section */}
                <div className="sign-right-top fadeIn flex w-full justify-between">
                    <div className="sign-top-left flex items-center font-poppins">
                        <span className="bg-lime-600 rounded-xl h-10 w-10 text-center text-white flex justify-center items-center m-auto flex-col">
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
                            <div className="sign-image2 floating-element-vertical absolute top-[14vh] left-[10vw] h-[40%] w-[20%] rounded-2xl -rotate-12 rounded-b-[100%] bg-secondary-600 shadow-xl shadow-slate-300 dark:shadow-slate-800 transition hover:-translate-y-7 outline outline-offset-2 outline-yellow-300"></div>
                            <div className="sign-image3 hover:scale-110 border-opacity-15 absolute left-[20vw] bottom-[20vh] backdrop-blur-sm mt-[130px] h-[180px] border-1 border-slate-900 w-[180px] rounded-full bg-slate-300 bg-opacity-25 shadow-large shadow-slate-300 dark:shadow-slate-700 transition">
                                <svg
                                    className="absolute turnInfinite w-[180px] h-[180px]"
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
                                <ArrowDownLeft className="absolute border-1 border-slate-900 top-[20%] left-[20%] border-opacity-15 rounded-full text-black w-[110px] h-[110px]" />
                            </div>
                            <img
                                src={Star1}
                                className="relative left-[15vw] -bottom-[35vh] -top-18 w-[40%] h-[40%]"
                                alt="star 1"
                            />
                        </div>
                    </div>

                    {/* Login Form Section */}
                    <div className="sign-form swipeFadeUp mx-auto w-[90%] lg:w-[35%] p-6 rounded-2xl">
                        <div className="sign-in-title mx-auto mb-4 text-center font-poppins">
                            <h2 className="font-poppins text-xl font-semibold text-slate-700 dark:text-slate-200">
                                {t("current.welcome")}
                            </h2>
                            <h1 className="mt-1 w-full bg-gradient-to-r from-red-600 to-blue-500 bg-clip-text font-syne text-6xl font-bold text-slate-800 text-transparent dark:text-slate-200 md:text-[76px]">
                                {process.env.REACT_APP_PROJECT_NAME ||
                                    "Sirius.io"}
                            </h1>
                            <p className="mt-4 font-poppins text-xs font-semibold text-slate-500 dark:text-slate-400">
                                Un service plus rapide, une attente mieux
                                organisée.
                            </p>
                        </div>

                        <div className="form  mb-6 flex w-full max-w-[400px] m-auto flex-col flex-wrap items-end font-poppins sm:flex-nowrap md:mb-0">
                            <Input
                                key={"outside"}
                                size={"md"}
                                isClearable
                                type="text"
                                radius={"md"}
                                defaultValue={session}
                                label="session"
                                labelPlacement={"outside"}
                                // color={"default"}
                                description={"Entrer votre session"}
                                isInvalid={false}
                                errorMessage="Erreur de mot de passe"
                                onChange={(e) => setSession(e.target.value)}
                                classNames={{
                                    input: [
                                        "border-none",
                                        "focus-visible:outline-none",
                                        "focus-visible:border-none",
                                        "bg-red-500", // Added red background
                                    ],
                                }}
                            />

                            <Input
                                key={"outside"}
                                size={"md"}
                                radius={"md"}
                                label="Mot de passe"
                                labelPlacement={"outside"}
                                description={"Entrer votre mot de passe"}
                                isInvalid={false}
                                defaultValue={password}
                                // color={"secondary"}
                                errorMessage="Erreur mot de passe"
                                onChange={(e) => setPassword(e.target.value)}
                                classNames={{
                                    input: [
                                        "backgroundColor:bg-lime-500",
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
                                        aria-label="toggle password visibility"
                                    >
                                        {isVisiblePassword ? (
                                            <Eye className="pointer-events-none text-2xl text-default-400" />
                                        ) : (
                                            <EyeOff className="pointer-events-none text-2xl text-default-400" />
                                        )}
                                    </button>
                                }
                                type={isVisiblePassword ? "text" : "password"}
                            />

                            <div className="form-options bg-red mt-4 flex w-full items-center justify-between">
                                <Checkbox
                                    defaultChecked={
                                        localStorage.getItem("userSession")
                                            ? true
                                            : false
                                    }
                                    size="sm"
                                    defaultSelected={true}
                                    color="primary"
                                    className="text-[10px]"
                                    isSelected={rememberMe}
                                    onValueChange={() =>
                                        setRememberMe(!rememberMe)
                                    }
                                >
                                    <span className="font-poppins text-[11px] opacity-60">
                                        se souvenir de moi
                                    </span>
                                </Checkbox>

                                <Link
                                    className="font-poppins text-[11px] opacity-60"
                                    to={"/forgot-password"}
                                >
                                    mot de passe oublié?
                                </Link>
                            </div>

                            <Link
                                to={"/dashboard"}
                                className="w-full text-center mt-4 text-[13px] text-slate-800 dark:text-slate-200 font-poppins"
                            >
                                <Button
                                    color="primary"
                                    variant="shadow"
                                    className="mt-10 w-full  text-white"
                                    onClick={() => handleLogin()}
                                >
                                    se connecter
                                </Button>
                            </Link>
                            <Link
                                to={"/auth/signup"}
                                className="w-full text-center mt-4 text-[13px] text-slate-800 dark:text-slate-200 font-poppins"
                            >
                                Vous n'avez pas de compte ?
                            </Link>
                        </div>
                    </div>

                    {/* Right Decorative Section */}
                    <div className="hidden w-[30%] flex-col items-center justify-around lg:flex">
                        <div className="fadeIn flex gap-6">
                            <div className="sign-image absolute bottom-[17vh] right-[10vw] mt-[130px] h-[40%] w-[18%] rounded-2xl rotate-12 rounded-ss-[100%] bg-success-600 shadow-xl  shadow-slate-300 dark:shadow-slate-800 transition hover:-translate-y-4 outline outline-offset-2 outline-teal-400 floating-element-vertical-right"></div>
                            <img
                                src={Star2}
                                className="relative left-[3vw] -top-20 w-16 h-16"
                                alt="star 1"
                            />
                            <img
                                src={Bell}
                                className="relative right-[10vw] top-[-200px] w-[29%]"
                                alt="Bell"
                            />
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="fadeIn flex flex-col items-center md:flex-row md:justify-between">
                    <div className="flex items-start font-poppins text-[12px] text-slate-900">
                        <span className="mr-[7px] mt-2 opacity-80 dark:text-slate-100">
                            Made with love{" "}
                            <span className="text-lime-700">❤</span> by
                            Supernova Team
                        </span>
                    </div>
                    <p
                        className={
                            "float-right mt-4 text-center font-Poppins text-[11px] font-normal opacity-80"
                        }
                        dangerouslySetInnerHTML={{ __html: getCopyrightText() }}
                    />
                </div>
            </div>
        </div>
    );
};

export default SignIn;
