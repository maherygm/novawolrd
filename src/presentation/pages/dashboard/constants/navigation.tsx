// Importation des images
import HomeIcon from "@/presentation/assets/image/icons/Glassmorph/home.png";
import UserIcon from "@/presentation/assets/image/icons/Glassmorph/gender-neutral-user.png";
import BoxIcon from "@/presentation/assets/image/icons/Glassmorph/dropbox.png";
import DispatchIcon from "@/presentation/assets/image/icons/Glassmorph/online-payment-with-a-credit-card.png";
import {
    FileBox,
    House,
    UserRoundCog,
    UserRoundPen,
    SquareMenu,
    ShieldAlert,
    ChartNetwork,
} from "lucide-react";

export const menus = [
    {
        group: "Menus Principaux",
        items: [
            {
                title: "Tableau de bord",
                link: "/dashboard/home",
                iconImg: HomeIcon,
                icon: <House />,
                roles: ["admin", "super_admin", "visitor"],
            },
            {
                title: "Cas de propagation",
                link: "/dashboard/health/center",
                iconImg: UserIcon,
                icon: <UserRoundCog />,
                roles: ["super_admin", "admin", "visitor"],
            },
            {
                title: "Suivi & Decision",
                link: "/dashboard/decision",
                iconImg: UserIcon,
                icon: <ChartNetwork />,
                roles: ["super_admin", "admin", "visitor"],
            },
            {
                title: "Infection",
                link: "/dashboard/infection",
                iconImg: UserIcon,
                icon: <ShieldAlert />,
                roles: ["super_admin", "admin", "visitor"],
            },
        ],
    },
    {
        group: "Paramètres",
        items: [
            // {
            // 	title: 'Matériels',
            // 	link: '/dashboard/material',
            // 	iconImg: DispatchIcon,
            // 	icon: <SquareMenu />,
            // 	roles: ['super_admin'],
            // },
            {
                title: "Profile",
                link: "Profile",
                iconImg: DispatchIcon,
                icon: <UserRoundPen />,
                roles: ["admin", "visitor", "bbo", "super_admin"],
            },
        ],
    },
];
