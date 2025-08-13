import { cn } from "@/core/utils/tmerge";
import {
    BatteryChargingIcon,
    BatteryFullIcon,
    BatteryIcon,
    BatteryLowIcon,
    BatteryMediumIcon,
    BatteryWarningIcon,
    InfinityIcon,
} from "lucide-react";

type BatteryInfoProps = {
    level: number | null;
    isCharging: boolean | null;
    chargingTime: number | null;
    dischargingTime: number | null;
    className?: string;
};

export const BatteryIndicator = ({
    level,
    isCharging,
    chargingTime,
    dischargingTime,
    className,
}: BatteryInfoProps) => {
    const getBatteryIcon = (
        level: number | null,
        isCharging: boolean | null
    ) => {
        if (level === null) {
            return <BatteryIcon className="size-5 text-emerald-600" />;
        }
        if (isCharging) {
            return <BatteryChargingIcon className="size-5 text-blue-500" />;
        }
        if (level >= 90) {
            return <BatteryFullIcon className="size-5 text-emerald-500" />;
        }
        if (level >= 50) {
            return <BatteryMediumIcon className="size-5 text-lime-500" />;
        }
        if (level >= 20) {
            return <BatteryLowIcon className="size-5 text-orange-500" />;
        }
        return <BatteryWarningIcon className="size-5 text-red-500" />;
    };

    const getTextColor = (level: number | null) => {
        if (level === null) {
            return "text-orange-500";
        }
        if (level >= 50) {
            return "text-emerald-500";
        }
        if (level >= 20) {
            return "text-yellow-500";
        }
        return "text-red-500";
    };

    const formatTime = (time: number | null) => {
        if (time === null) {
            return "";
        }
        if (!Number.isFinite(time)) {
            return <InfinityIcon className="inline size-3" />;
        }
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        if (hours > 23) {
            return ">1d";
        }
        return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    };

    return (
        <div
            className={cn(
                "inline-flex items-center space-x-2 rounded-2xl   px-3 py-1 shadow-2xs transition-all duration-300  dark:bg-neutral-500/20",
                className
            )}
        >
            {getBatteryIcon(level, isCharging)}
            <div className="flex flex-row">
                <span className={`font-medium text-sm ${getTextColor(level)}`}>
                    {level
                        ? `${Math.round(level)}%` /* Round the battery level */
                        : "Unavailable"}
                </span>
                <span className="flex items-center text-neutral-500 text-xs">
                    {isCharging ? (
                        <>
                            <span className="mr-1">⚡</span>
                            {formatTime(chargingTime)}
                        </>
                    ) : (
                        formatTime(dischargingTime)
                    )}
                </span>
            </div>
        </div>
    );
};
