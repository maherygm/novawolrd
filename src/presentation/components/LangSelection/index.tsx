import React from "react";
import { useTranslation } from "react-i18next";
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
} from "@heroui/dropdown";
import { ChevronDown } from "lucide-react";
import { Button } from "@heroui/button";
import useConfetti from "@/presentation/hooks/useConfetti";

const flagUrls: Record<string, string> = {
    mg: "https://flagcdn.com/w40/mg.png",
    fr: "https://flagcdn.com/w40/fr.png",
    en: "https://flagcdn.com/w40/us.png",
};

const LangSelection: React.FC = () => {
    const { i18n } = useTranslation();
    const [currentLang, setCurrentLang] = React.useState(localStorage.getItem("i18nextLng") || "fr");
    const { explodeConfetti } = useConfetti();

    const handleLanguageChange = (lang: string) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("i18nextLng", lang);
        setCurrentLang(lang);
        
        // 💥 Explosion confetti
        explodeConfetti();
        
        // Force page refresh
        window.location.reload();
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button
                    variant={"light"}
                    size="sm"
                    className="flex ml-2 rounded-full items-center gap-1"
                >
                    <img
                        src={flagUrls[currentLang]}
                        alt="Selected Language Flag"
                        className="w-4 h-4"
                    />
                    <span className="text-sm font-medium">
                        {currentLang.toUpperCase()}
                    </span>
                    <ChevronDown size={16} />
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Language Selection">
                {Object.entries(flagUrls).map(([lang, url]) => (
                    <DropdownItem
                        key={lang}
                        textValue={lang.toUpperCase()}
                        onPress={() => handleLanguageChange(lang)}
                    >
                        <div className="flex items-center gap-2">
                            <img
                                src={url}
                                alt={`${lang} Flag`}
                                className="w-4 h-4"
                            />
                            {lang.toUpperCase()}
                        </div>
                    </DropdownItem>
                ))}
            </DropdownMenu>
        </Dropdown>
    );
};

export default LangSelection;
