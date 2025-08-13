import { useTranslation } from "react-i18next";
import i18next from "i18next";

// Use i18next.t instead of useTranslation hook to avoid React hook rules violation
export const t = (key: string): string => {
    return i18next.t(key);
};
