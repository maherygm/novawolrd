import React, { ReactNode, useState } from "react";
import clsx from "clsx";
import { Link, NavLink } from "react-router-dom";
// import { toast } from 'sonner';

// Importation des utils

// Importation des images
import { Menu, LogOut } from "lucide-react";

// Importation des composants
import { Tooltip } from "@heroui/tooltip";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import DarkModeSwitch from "@/presentation/components/darkModeSwitch";

// Context
interface MenuItem {
    title: string;
    link: string;
    roles: string[];
    iconImg: string;
    icon: ReactNode;
}

interface MenuGroup {
    group: string;
    items: MenuItem[];
}

interface SidebarProps {
    menuGroups: MenuGroup[];
}

/**
 *
 * @desc: Composant barre de menu
 */
const Sidebar: React.FC<SidebarProps> = ({ menuGroups }) => {
    // Initialisation des variables

    // Tutorial config

    const [isCollapsed, setIsCollapsed] = useState(false);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div
            id="sidebar"
            className={clsx(
                "sidebar delay-400 flex h-auto flex-row items-center justify-around overflow-y-auto overflow-x-hidden rounded-t-3xl sm!bg-slate-900 px-10 font-syne shadow-2xl ease-in-out sm:h-full sm:flex-col sm:items-start sm:justify-between sm:rounded-none  sm:px-4 sm:py-5 sm:shadow-none",
                isCollapsed
                    ? "w-30 swipeRight m-2 backdrop-blur-md transition-all duration-500 ease-in-out  dark:bg-slate-900 sm:h-[95.99%] sm:rounded-xl sm:border-none sm:bg-slate-950 sm:shadow-xl sm:transition"
                    : "swipeRight m-2 transition-all duration-500 ease-in-out dark:bg-slate-900  sm:h-[95%] sm:w-[280px] sm:rounded-xl sm:bg-slate-950  sm:shadow-xl sm:transition"
            )}
        >
            <Modal
                backdrop={"blur"}
                placement={"top"}
                classNames={{
                    body: "py-2",
                }}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
            >
                <ModalContent className="font-syne">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">
                                Deconnexion
                            </ModalHeader>
                            <ModalBody>
                                <p className="text-justify">
                                    Êtes-vous absolument certain vouloir vous
                                    déconnecter? veuillez cliquer sur "Se
                                    deconnecter" pour confirmer.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={onClose}
                                >
                                    Annuler
                                </Button>
                                <Link to={"/auth"}>
                                    <Button color="danger">
                                        Se deconnecter
                                    </Button>
                                </Link>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

            <button
                onClick={toggleCollapse}
                className={clsx(
                    "fadeIn fadeIn absolute z-10  hidden rounded-lg bg-slate-700 text-white p-[3px] shadow-lg transition delay-300 duration-250 hover:scale-125 dark:bg-slate-700 sm:mb-4 sm:block ",
                    isCollapsed
                        ? "delay-400 left-[23px] top-6 ease-in-out"
                        : "delay-400 left-[195px] top-7 ease-in-out"
                )}
            >
                {isCollapsed ? (
                    <Menu size={25} strokeWidth={1.6} opacity={0.4} />
                ) : (
                    <Menu size={25} strokeWidth={1.6} opacity={0.4} />
                )}
            </button>

            <div className={`top-sidebar ${!isCollapsed ? "w-full" : ""}`}>
                <div
                    className={`logo hidden items-center sm:flex ${
                        isCollapsed ? "sm:mt-14" : "mt-0"
                    }`}
                >
                    <span className="bg-violet-700 rounded-xl h-10 w-10 text-center text-white flex justify-center items-center flex-col">
                        <img
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADvElEQVR4nO2Yy28PURTHhyYlulLxiFdtGpFYqB0NaRcEISwRj40/gBKRSBBvideCBaGRSESUSEq8VuKtqcQrUdZaCaFVb8pHTp2J4/bO7zftzCwG32Q2c2fO+X7vPefcc28Q/MdfCmA2cEKf2UGeACyjJ5YGeQHQ4hHQEuQFQLtHQHuQFwDnPQIag7wAqAK6DPlvwKQgTwD2GwF7Yv7TPysyIyQEgHfAHZnhYkSAauCHPtWFyAEDgJO6Uo+BiWkLEPIWz4GBzjfjgLXALeCTJwc+69g6oML5d73z7dW0BXR6CM01xOt19uLiK3AMGKM2njjjT9MWIGHjYrdsThpWLiSBW4FmfdqcpA7xFtjieb8yi6oihCw+ehxfAJYAgz02BuvYxYhVeQecAmalSt4QGChhIxXFQ/4+MK0XtqYDDxwb+zIh7nEuYWMhszaoD3bKgAbH1vJsWP92Os6JeSHfL4G9fsBpJ4xGpsv6T4f1TtgMSsFmGfDQ2K1Ph61/9m2pnG7GFgBvgCtAqfNfKbBLK5EUgp2eb2qM3e/A6CwErLXVxhk7Z8YmO2NC2MVOj/1LZnx1FgJuGwdLnLH5wGvgsmd23fIraC1SHG4mOUk9BTq0Ja4yvU1YOrt8db6AzbgCyjV8wmTuLg6yW0snC5TEOcO66NKucmoh50Xs+kJoR8S3L8w3wuesNoOCJkn4Qo7k8B2F0IiguZcCSlVEa1QSh9C2oxBWBFkKAIbHWu7o/5uTCPCFkJTNvcAU864t4n/pc77EWu5oDi+MnznAGZMXd4va1ErQoofyxvAYGCeJPckaPVt+30MM2fcmiUcnWdVYZVTHnxcTAGxXctuK3CXdSEQ2QsAa4+BikRDyLrfpozqLbGR1WQioiGol4iaxzLyK2Oq8r3XybmzqAtTREePoQV8SNaKZe2TsHkqHrd/ZWKedbki5ne4ERqXLuqfThU6yNvSxZMrMW/Le4pA6tGd55jiWfr6mFzZqnbBBq1hVlsSHARuBV93ueopAD+yyl5RH1PllTrUJYUuwNJNHgXlpES8BNjuXVS/1lmFxxLXKdz3A3NOnzWxSODG/SG89fDiedv0PscGMS7t7uA8XW4fsyStiRQUzkgqwpy20pRgaUaHqgOvABw8ReXcNWBXeyFlo2PiQ7HQmBhyDm2L+N0YPRh0+wp7v52W1AiUaRo0qJlZTBczsLQngeOo5kGCDsr19U9wNj1/C6xLPfBIAEzyhMD7IC4BKj4DKIE8ADhryB4I8gl8rka+Z/49/DT8B+kvOttHs3JIAAAAASUVORK5CYII="
                            className="w-7 h-7"
                            alt="virus"
                        />
                    </span>
                    <h2
                        className={`${
                            isCollapsed ? "hidden" : "block"
                        } text-white ml-2 mt-4 flex flex-col font-syne text-2xl font-bold`}
                    >
                        <span className="-mt-3 text-[18px] font-bold">
                            NovaWorld
                        </span>
                        <span className="-mt-4 text-[10px]">By Supernova</span>
                    </h2>
                </div>

                <div
                    id="menu-btn"
                    className={`flex text-slate-100 flex-row py-2 sm:mt-7 sm:flex-col sm:justify-around`}
                >
                    {menuGroups.map((group, groupIndex) => {
                        return (
                            <div
                                className="flex text-slate-200 w-full flex-row justify-around sm:flex-col sm:justify-center"
                                key={groupIndex}
                            >
                                {/* Afficher le nom du groupe */}
                                <h3 className="mb-3 hidden font-Poppins text-[14px] font-semibold sm:flex">
                                    {!isCollapsed && group.group}
                                </h3>
                                {group.items
                                    .filter((menu) => Array.isArray(menu.roles))
                                    .map((menu, index) => (
                                        <Tooltip
                                            isDisabled={!isCollapsed}
                                            content={menu.title}
                                            key={"right"}
                                            offset={5}
                                            className="font-syne"
                                            placement={"right"}
                                            color="secondary"
                                        >
                                            <div
                                                key={index}
                                                className="flex text-slate-100  flex-row font-Poppins transition hover:duration-300 sm:flex-col"
                                            >
                                                <NavLink
                                                    to={menu.link}
                                                    className="menu-btn flex items-center rounded-xl p-2 text-slate-100 text-sm font-medium opacity-70 transition hover:bg-light-custom-primary hover:text-slate-100 hover:opacity-100 hover:duration-200 active:bg-primary-600 dark:text-slate-300 sm:mb-2 sm:text-slate-800"
                                                >
                                                    {menu.icon && (
                                                        <span className="menuIcon text-slate-100 mr-2">
                                                            {menu.icon}
                                                        </span>
                                                    )}
                                                    <span className="hidden text-slate-100 sm:block">
                                                        {!isCollapsed &&
                                                            menu.title}
                                                    </span>
                                                </NavLink>
                                            </div>
                                        </Tooltip>
                                    ))}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="bottom-sidebar sm:w-full">
                {!isCollapsed && (
                    <div className="mt-2 text-slate-100 hidden sm:flex">
                        {/* <DarkModeSwitch /> */}
                    </div>
                )}

                <div className="flex cursor-pointer flex-row font-Poppins transition hover:duration-300 sm:flex-col">
                    <div
                        onClick={onOpen}
                        className={`flex items-center transition ${
                            isCollapsed && "justify-center"
                        } rounded-xl p-2 text-sm font-medium hover:bg-red-600 active:bg-primary-600 dark:bg-slate-700 dark:text-slate-100 sm:mb-2 sm:mt-5 sm:bg-violet-700 text-white`}
                    >
                        <LogOut
                            size={"25px"}
                            opacity={0.7}
                            className={!isCollapsed ? "mr-2" : "mr-0"}
                        />

                        <span className="hidden sm:block">
                            {!isCollapsed && "Deconnexion"}
                        </span>
                    </div>
                </div>
                {!isCollapsed && (
                    <small className="hidden text-slate-100 w-full text-center sm:block">
                        Sentinel V.0.0.1
                    </small>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
