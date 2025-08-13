import React, { useEffect, useState } from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@heroui/table";

import RobotHello from "@/presentation/assets/image/illustrations/bot.png";
import { Activity, Album, SquareActivity } from "lucide-react";
import { Avatar } from "@heroui/avatar";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { Chip } from "@heroui/chip";
import { Link } from "react-router-dom";
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    Tooltip,
    CartesianGrid,
} from "recharts";
import { ArrowUp } from "lucide-react";

// Generate fake COVID data
const RealTimeCovidChart = () => {
    const generateFakeData = () => {
        const data = [];
        const today = new Date();
        for (let i = 13; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            data.push({
                date: date.toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "short",
                }),
                infections: Math.floor(Math.random() * 1000) + 100,
            });
        }
        return data;
    };

    const [data] = useState(generateFakeData());

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10 }}
                    interval={Math.ceil(data.length / 7)}
                />
                <YAxis hide />
                <Tooltip
                    contentStyle={{
                        backgroundColor: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                />
                <Line
                    type="monotone"
                    dataKey="infections"
                    stroke="#ff6b6b"
                    strokeWidth={1.5}
                    dot={false}
                    animationDuration={300}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

// Generate fake health news
const HealthNewsFeed = () => {
    const fakeNews = [
        {
            title: "Nouvelle découverte dans le traitement du COVID-19",
            url: "#",
            imageUrl: "https://picsum.photos/200/100?random=1",
            date: "15/03/2024",
            source: "Santé Magazine"
        },
        {
            title: "Épidémie de grippe : les précautions à prendre",
            url: "#",
            imageUrl: "https://picsum.photos/200/100?random=2",
            date: "14/03/2024",
            source: "Le Quotidien Santé"
        },
        {
            title: "Progrès majeur dans la recherche sur les virus",
            url: "#",
            imageUrl: "https://picsum.photos/200/100?random=3",
            date: "13/03/2024",
            source: "Science Daily"
        },
        {
            title: "Les nouveaux défis de la santé publique",
            url: "#",
            imageUrl: "https://picsum.photos/200/100?random=4",
            date: "12/03/2024",
            source: "Médecine Info"
        }
    ];

    return (
        <>
            {fakeNews.map((article, index) => (
                <NewsCard
                    key={index}
                    {...article}
                />
            ))}
        </>
    );
};

// Generate fake epidemic notifications
const MadagascarEpidemicNotifications = () => {
    const fakeNotifications = [
        {
            epidemic: "COVID-19",
            region: "Antananarivo",
            areaCovered: "Province",
            status: "yellow",
            notificationDate: "15/03/2024"
        },
        {
            epidemic: "Grippe H1N1",
            region: "Toamasina",
            areaCovered: "Province",
            status: "red",
            notificationDate: "15/03/2024"
        },
        {
            epidemic: "Dengue",
            region: "Mahajanga",
            areaCovered: "Province",
            status: "green",
            notificationDate: "14/03/2024"
        }
    ];

    return (
        <>
            {fakeNotifications.map((notification, index) => (
                <NotificationCard
                    key={index}
                    {...notification}
                />
            ))}
        </>
    );
};

// Components remain the same
const NotificationCard = ({
    epidemic,
    region,
    areaCovered,
    status,
    notificationDate,
}) => {
    const statusColor = {
        red: "bg-red-100 border-red-500",
        yellow: "bg-yellow-100 border-yellow-500",
        green: "bg-green-100 border-green-500",
    }[status];

    return (
        <div
            className={`p-3 rounded-lg border-l-4 ${statusColor} shadow-sm hover:shadow-md transition-shadow`}
        >
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold">{epidemic}</h3>
                    <p className="text-sm text-gray-600">
                        {region} ({areaCovered})
                    </p>
                </div>
                <span
                    className={`text-xs px-2 py-1 rounded-full ${statusColor.replace(
                        "100",
                        "500"
                    )} text-white`}
                >
                    {status.toUpperCase()}
                </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
                Mise à jour : {notificationDate}
            </p>
        </div>
    );
};

const NewsCard = ({ imageUrl, title, date, source, url }) => (
    <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="min-w-[200px] h-[190px] bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 block"
    >
        <div className="relative h-full">
            <img
                src={imageUrl}
                alt={title}
                className="w-full h-[100px] object-cover rounded-t-lg"
                onError={(e) => {
                    e.currentTarget.src = "/placeholder-health.jpg";
                }}
            />
            <div className="p-2">
                <p className="text-xs text-gray-500 mb-1">
                    {source} • {date}
                </p>
                <h3 className="text-sm font-medium line-clamp-2">{title}</h3>
            </div>
        </div>
    </a>
);

const StatusBadge = ({ status }) => {
    let color = "default";
    if (status === "Décès") color = "danger";
    if (status === "Infecté") color = "warning";
    if (status === "Guéri") color = "success";

    return <Chip color={color}>{status}</Chip>;
};

const UserList = [
    { id: 1, name: "Jean Rakoto", status: "Décès" },
    { id: 2, name: "Marie Rasoa", status: "Infecté" },
    { id: 3, name: "Paul Rabe", status: "Guéri" },
    { id: 4, name: "Soa Niry", status: "Guéri" },
    { id: 5, name: "Tahina Be", status: "Guéri" },
    { id: 6, name: "Mamy Kely", status: "Infecté" },
];

const epidemicsData = [
    {
        id: 1,
        name: "Grippe",
        cases: Math.floor(Math.random() * 15000) + 10000,
        deaths: Math.floor(Math.random() * 300) + 100,
        transmissionRate: "Modéré",
    },
    {
        id: 2,
        name: "COVID-19",
        cases: Math.floor(Math.random() * 600000) + 400000,
        deaths: Math.floor(Math.random() * 20000) + 10000,
        transmissionRate: "Élevé",
    },
    {
        id: 3,
        name: "Dengue",
        cases: Math.floor(Math.random() * 5000) + 2000,
        deaths: Math.floor(Math.random() * 500) + 100,
        transmissionRate: "Modéré",
    },
];

const data = Array.from({ length: 6 }, () => ({
    name: "",
    hours: Math.floor(Math.random() * 20) + 5,
}));

// Rest of the component remains the same
const homePanel = () => {
    return (
        <div className="h-full flex sm:flex-row flex-col">
            <div className="left-side w-full pr-5">
                <div className="welcome-banner swipeFadeUp h-[170px] p-4 px-8 bg-gradient-to-r from-red-500 to-blue-700 rounded-2xl flex overflow-hidden">
                    <div className="w-full">
                        <h1 className="font-bold text-xl text-white">
                            Re-bonjour, Edouardo Stevano
                        </h1>
                        <p className="text-[14px] text-white ">
                            Face aux défis sanitaires, Sentinel est votre allié
                            pour anticiper, surveiller et gérer efficacement les
                            épidémies. Grâce à des outils innovants et une
                            analyse en temps réel, notre plateforme vous aide à
                            prendre des décisions rapides et éclairées pour
                            protéger les populations.
                        </p>
                    </div>
                </div>

                <div className="resume swipeFadeUp">
                    <div className="Activity  my-3 flex gap-2">
                        <div className="w-[60%] h-[230px] p-4 overflow-hidden bg-white bg-opacity-65 backdrop-blur-sm rounded-2xl">
                            <div className="flex p-2 justify-between">
                                <h1 className="font-syne font-bold">
                                    Dernier cas enregistrés :
                                </h1>
                                <SquareActivity />
                            </div>

                            <ScrollShadow className="flex w-full px-4 gap-3 flex-wrap">
                                {UserList.map((user) => (
                                    <div
                                        key={user.id}
                                        className="flex items-center space-x-2 mb-2"
                                    >
                                        <Avatar
                                            src={`https://i.pravatar.cc/150?img=${user.id}`}
                                        />
                                        <div className="flex flex-col">
                                            <span className="truncate w-[80px]">
                                                {user.name}
                                            </span>
                                            <StatusBadge status={user.status} />
                                        </div>
                                    </div>
                                ))}
                            </ScrollShadow>
                        </div>

                        <div className="w-[40%] h-[230px] bg-white bg-opacity-85 rounded-2xl">
                            <div className="flex flex-col p-4 justify-between h-full">
                                <div className="flex p-4 justify-between items-center mb-2">
                                    <h1 className="font-semibold text-lg">
                                        Activité Mondiale
                                    </h1>
                                    <Album />
                                </div>

                                <div className="h-[200px]">
                                    <RealTimeCovidChart />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="resume swipeFadeUp ">
                    <div className="Activity my-3 flex gap-2">
                        <div className="w-[43%] resumed h-[280px] bg-white bg-opacity-65 backdrop-blur-sm rounded-2xl">
                            <div className="flex  rounded-2xl p-2 justify-between">
                                <h1>Resumé: </h1>
                            </div>

                            <div className="w-[60%] flex-auto mx-auto">
                                <div className="flex justify-between items-center">
                                    <h2 className="text-lg font-semibold">
                                        Activity
                                    </h2>
                                    <div className="flex items-center text-green-500 text-sm font-semibold">
                                        <ArrowUp size={14} /> 24%
                                    </div>
                                </div>
                                <div className="mt-2 h-28">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <BarChart data={data}>
                                            <XAxis hide={true} />
                                            <YAxis
                                                hide={true}
                                                domain={[0, 20]}
                                            />
                                            <Bar
                                                dataKey="hours"
                                                fill="#ff4b8b"
                                                radius={[5, 5, 0, 0]}
                                            />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        <div className="w-[70%] h-[280px] bg-white bg-opacity-65 backdrop-blur-sm rounded-2xl">
                            <div className="flex flex-col p-6 justify-between">
                                <div className="flex justify-between">
                                    <h1>Statistiques : </h1>
                                    <Activity />
                                </div>

                                <div>
                                    <Table
                                        aria-label="Tableau d'activité des épidémies"
                                        shadow="sm"
                                    >
                                        <TableHeader>
                                            <TableColumn>Maladie</TableColumn>
                                            <TableColumn>Cas</TableColumn>
                                            <TableColumn>Décès</TableColumn>
                                            <TableColumn>
                                                Taux de Transmission
                                            </TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            {epidemicsData.map((epidemic) => (
                                                <TableRow key={epidemic.id}>
                                                    <TableCell>
                                                        {epidemic.name}
                                                    </TableCell>
                                                    <TableCell>
                                                        {epidemic.cases.toLocaleString()}
                                                    </TableCell>
                                                    <TableCell>
                                                        {epidemic.deaths.toLocaleString()}
                                                    </TableCell>
                                                    <TableCell>
                                                        {
                                                            epidemic.transmissionRate
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="right-side swipeFadeDown w-[500px]">
                <div className="notif">
                    <div className="Head p-6">
                        <h1 className="text-md font-bold font-poppins">
                            Actualités Santé :{" "}
                        </h1>

                        <ScrollShadow
                            hideScrollBar
                            orientation="horizontal"
                            className="flex overflow-x-auto gap-3 max-w-[330px] h-[200px] py-3 flex-nowrap"
                        >
                            <HealthNewsFeed />
                        </ScrollShadow>
                    </div>

                    <div className="Head mt-2">
                        <h1 className="text-md font-bold font-poppins">
                            Notifications :{" "}
                        </h1>

                        <ScrollShadow
                            hideScrollBar
                            className="flex h-[360px] overflow-x-auto gap-2 py-3 flex-col"
                        >
                            <MadagascarEpidemicNotifications />
                        </ScrollShadow>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default homePanel;
