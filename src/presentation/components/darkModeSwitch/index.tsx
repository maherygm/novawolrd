import React, { useEffect, useState } from "react";
import { Switch } from "@heroui/switch";
import useConfetti from "@/presentation/hooks/useConfetti";
import { getInitialDarkModePreference } from "@/core/utils/theme";
import { Sun, Moon } from "lucide-react";

/**
 *
 * @desc: Composant de Switch pour le mode Dark avec explosion confetti
 */
const DarkModeSwitch = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
    const { explodeConfetti } = useConfetti();

    useEffect(() => {
        const darkModePreference = getInitialDarkModePreference();
        setIsDarkMode(darkModePreference);
    }, []);

    const handleDarkModeToggle = () => {
        setIsDarkMode((prev) => {
            const newMode = !prev;
            if (newMode) {
                document.documentElement.classList.add("dark");
                localStorage.setItem("abm-mytick-theme", "dark");
            } else {
                document.documentElement.classList.remove("dark");
                localStorage.setItem("abm-mytick-theme", "light");
            }

            // 💥 Explosion confetti
            explodeConfetti();

            return newMode;
        });
    };

    return (
        <Switch
            size="sm"
            defaultSelected={
                localStorage.getItem("abm-mytick-theme") === "dark"
            }
            startContent={<Sun />}
            endContent={<Moon />}
            onChange={handleDarkModeToggle}
            className="font-poppins font-normal text-slate-700"
            color={isDarkMode ? "primary" : "secondary"}
        >
            Mode sombre
        </Switch>
    );
};

export default DarkModeSwitch;
