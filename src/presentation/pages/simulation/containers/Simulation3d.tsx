"use client";

import { useState, useEffect } from "react";
import { Slider } from "@heroui/slider";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import regression from "regression";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollShadow } from "@heroui/scroll-shadow";
import { Spinner } from "@heroui/react";

interface Person {
    id: number;
    x: number;
    y: number;
    infected: boolean;
    dead: boolean;
    recovered: boolean;
    daysInfected: number;
    newInfection: boolean;
}

interface SIRParams {
    beta: number;
    gamma: number;
    mortalityRate: number;
}

export default function EpidemicSimulation() {
    const [population, setPopulation] = useState(50);
    const [infectedCount, setInfectedCount] = useState(5);
    const [infectionRate, setInfectionRate] = useState(0.2);
    const [simulationDays, setSimulationDays] = useState(10);
    const [people, setPeople] = useState<Person[]>([]);
    const [running, setRunning] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [showResults, setShowResults] = useState(false);
    const [finalInfected, setFinalInfected] = useState(0);
    const [hospitalCapacity, setHospitalCapacity] = useState(20);
    const [maskUsage, setMaskUsage] = useState(50);
    const [graphData, setGraphData] = useState<
        { day: number; infected: number; deaths: number; recovered: number }[]
    >([]);
    const [movementOffset, setMovementOffset] = useState(0);
    const [stats, setStats] = useState({
        infected: 0,
        deaths: 0,
        recovered: 0,
    });

    useEffect(() => initializePeople(), [population, infectedCount]);

    useEffect(() => {
        let animationFrame: number;
        if (running) {
            const animate = () => {
                setMovementOffset(Date.now());
                animationFrame = requestAnimationFrame(animate);
            };
            animate();
        }
        return () => cancelAnimationFrame(animationFrame);
    }, [running]);

    useEffect(() => {
        if (running) {
            const interval = setInterval(() => {
                setStats({
                    infected: people.filter((p) => p.infected).length,
                    deaths: people.filter((p) => p.dead).length,
                    recovered: people.filter((p) => p.recovered).length,
                });
            }, 200);
            return () => clearInterval(interval);
        }
    }, [running, people]);

    const initializePeople = () => {
        const newPeople = Array.from({ length: population }, (_, i) => ({
            id: i,
            x: Math.random() * 400,
            y: Math.random() * 400,
            infected: i < infectedCount,
            dead: false,
            recovered: false,
            daysInfected: 0,
            newInfection: false,
        }));
        setPeople(newPeople);
    };

    const calculateDynamicParams = (): SIRParams => {
        const baseBeta = infectionRate * (1 - maskUsage / 200);
        const baseGamma = 0.1 + hospitalCapacity / 200;
        const mortality = 0.05 * (1 - hospitalCapacity / 150);

        return {
            beta: Math.min(baseBeta, 0.9),
            gamma: Math.min(baseGamma, 0.3),
            mortalityRate: Math.max(mortality, 0.01),
        };
    };

    const sirModel = (
        currentInfected: number,
        currentRecovered: number,
        params: SIRParams
    ) => {
        const N = population;
        const S = N - currentInfected - currentRecovered;
        const dS = (-params.beta * S * currentInfected) / N;
        const dR = params.gamma * currentInfected;
        const dI = -dS - dR;

        return {
            newInfected: Math.max(0, currentInfected + Math.floor(dI)),
            newRecovered: currentRecovered + Math.floor(dR),
            deaths: Math.floor(currentInfected * params.mortalityRate),
        };
    };

    const predictFuture = (data: number[]) => {
        const points = data.map((value, index) => [index, value]);
        const result = regression.linear(points, { precision: 3 });
        return Array.from({ length: 3 }, (_, i) =>
            Math.max(0, Math.floor(result.predict(data.length + i)[1]))
        );
    };

    const runSimulation = () => {
        setRunning(true);
        setCountdown(5);
        setShowResults(false);

        let days = 5;
        let currentInfected = infectedCount;
        let currentRecovered = 0;
        let totalDeaths = 0;
        const params = calculateDynamicParams();

        const history: {
            day: number;
            infected: number;
            deaths: number;
            recovered: number;
        }[] = [];

        const timer = setInterval(() => {
            const { newInfected, newRecovered, deaths } = sirModel(
                currentInfected,
                currentRecovered,
                params
            );

            totalDeaths += deaths;
            currentRecovered = newRecovered;
            currentInfected = newInfected;

            setPeople((prev) =>
                prev.map((p) => {
                    if (p.dead) return p;

                    const isNewInfection =
                        !p.infected && Math.random() < params.beta;
                    const shouldDie =
                        p.infected && Math.random() < params.mortalityRate;
                    const shouldRecover =
                        p.infected && Math.random() < params.gamma;

                    return {
                        ...p,
                        infected:
                            isNewInfection ||
                            (p.infected && !shouldDie && !shouldRecover),
                        dead: shouldDie,
                        recovered: shouldRecover,
                        daysInfected: p.infected
                            ? p.daysInfected + 1
                            : p.daysInfected,
                        newInfection: isNewInfection,
                    };
                })
            );

            history.push({
                day: simulationDays - days + 1,
                infected: currentInfected,
                deaths: totalDeaths,
                recovered: currentRecovered,
            });

            setCountdown(--days);

            if (days <= 0) {
                clearInterval(timer);

                const infectedData = history.map((d) => d.infected);
                const predicted = predictFuture(infectedData);

                const predictionData = predicted.map((value, i) => ({
                    day: history.length + i + 1,
                    infected: value,
                    deaths: Math.floor(totalDeaths * (1 + i * 0.1)),
                    recovered: Math.floor(currentRecovered * (1 + i * 0.2)),
                }));

                setGraphData([...history, ...predictionData]);
                setFinalInfected(currentInfected);
                setShowResults(true);
                setRunning(false);
            }
        }, 1000);
    };

    // const SpinnerLoad = () => (
    //   <div className="flex fixed top-[50px] flex-col items-center gap-4">
    //     <p className="text-lg font-semibold">Simulation en cours...  {countdown}s</p>
    //   </div>
    // );

    const FloatingCounter = () => (
        <div className="fixed right-6 top-6 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-xl z-50">
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-red-500 font-bold">Infectés</div>
                <div className="text-right">{stats.infected}</div>
                <div className="text-black font-bold">Décès</div>
                <div className="text-right">{stats.deaths}</div>
                <div className="text-green-500 font-bold">Guéris</div>
                <div className="text-right">{stats.recovered}</div>
                <div className="col-span-2 border-t mt-2 pt-2 text-center">
                    Temps restant: {countdown}s
                </div>
            </div>
        </div>
    );

    return (
        <div className="bg-card-background bg-slate-200 ">
            <div className="flex bg-solution bg-cover flex-col items-center justify-center min-h-screen p-6">
                <Link className="absolute top-2 left-10" to="/landing">
                    <Button isIconOnly color="secondary">
                        <ArrowLeft />
                    </Button>
                </Link>

                <h1 className="text-4xl md:text-4xl font-bold font-syne bg-gradient-to-r from-red-500 to-blue-700 text-transparent bg-clip-text mb-8">
                    Simulation de propagation
                </h1>

                <AnimatePresence>
                    {running && <FloatingCounter />}
                </AnimatePresence>

                <div className="w-full  max-w-6xl">
                    {!showResults ? (
                        <div className="flex flex-col md:flex-row gap-6">
                            <ScrollShadow className="w-full h-[80vh] overflow-y-auto md:w-1/3 space-y-6">
                                <Card className="p-4 bg-opacity-45 backdrop-blur-md border-1 border-slate-50">
                                    <CardHeader className="text-lg font-semibold">
                                        Paramètres de base
                                    </CardHeader>
                                    <CardBody className="space-y-4">
                                        <Slider
                                            label="Population"
                                            value={population}
                                            onChange={setPopulation}
                                            min={10}
                                            max={200}
                                        />
                                        <Slider
                                            label="Infectés initiaux"
                                            value={infectedCount}
                                            onChange={setInfectedCount}
                                            min={1}
                                            max={population}
                                        />
                                        <Slider
                                            label="Taux d'infection"
                                            value={infectionRate}
                                            onChange={setInfectionRate}
                                            min={0.1}
                                            max={1}
                                            step={0.1}
                                        />
                                        <Slider
                                            label="Jours de simulation"
                                            value={simulationDays}
                                            onChange={setSimulationDays}
                                            min={5}
                                            max={50}
                                        />
                                    </CardBody>
                                </Card>

                                <Card className="p-4 bg-opacity-45 backdrop-blur-md border-1 border-slate-50">
                                    <CardHeader className="text-lg font-semibold">
                                        Paramètres avancés
                                    </CardHeader>
                                    <CardBody className="space-y-4">
                                        <Slider
                                            label="Capacité hospitalière (%)"
                                            value={hospitalCapacity}
                                            onChange={setHospitalCapacity}
                                            min={5}
                                            max={100}
                                            step={5}
                                        />
                                        <Slider
                                            label="Port de masque (%)"
                                            value={maskUsage}
                                            onChange={setMaskUsage}
                                            min={0}
                                            max={100}
                                            step={5}
                                        />
                                    </CardBody>
                                </Card>

                                <Button
                                    onClick={runSimulation}
                                    isLoading={running}
                                    disabled={running}
                                    color={"secondary"}
                                    className="w-full h-12 text-lg"
                                >
                                    {running
                                        ? `Simulation en cours...  ${countdown}s`
                                        : "Démarrer la simulation"}
                                </Button>
                            </ScrollShadow>

                            <div className="w-full md:w-2/3">
                                {/* {running && <SpinnerLoad />} */}

                                <Card className="h-[80vh] bg-opacity-45 backdrop-blur-md border-1 border-slate-50">
                                    <div className="relative w-full flex mx-32 mt-5 h-full p-4">
                                        <AnimatePresence>
                                            {people.map((person) => {
                                                const xOffset =
                                                    Math.sin(
                                                        movementOffset / 500 +
                                                            person.id
                                                    ) * 15;
                                                const yOffset =
                                                    Math.cos(
                                                        movementOffset / 500 +
                                                            person.id
                                                    ) * 15;

                                                return (
                                                    <motion.div
                                                        key={person.id}
                                                        className={`absolute w-3 h-3 rounded-full ${
                                                            person.dead
                                                                ? "bg-black"
                                                                : person.recovered
                                                                ? "bg-green-500"
                                                                : person.infected
                                                                ? "bg-red-500"
                                                                : "bg-blue-500"
                                                        }`}
                                                        animate={{
                                                            x:
                                                                person.x +
                                                                xOffset,
                                                            y:
                                                                person.y +
                                                                yOffset,
                                                            scale: person.newInfection
                                                                ? [1, 1.8, 1]
                                                                : 1,
                                                        }}
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 30,
                                                            damping: 8,
                                                            scale: {
                                                                duration: 0.3,
                                                            },
                                                        }}
                                                    >
                                                        {person.infected && (
                                                            <motion.div
                                                                className="absolute inset-0 border-2 border-red-400 rounded-full"
                                                                animate={{
                                                                    scale: [
                                                                        1, 2.5,
                                                                    ],
                                                                    opacity: [
                                                                        0.4, 0,
                                                                    ],
                                                                }}
                                                                transition={{
                                                                    repeat: Infinity,
                                                                    duration: 1.5,
                                                                }}
                                                            />
                                                        )}
                                                    </motion.div>
                                                );
                                            })}
                                        </AnimatePresence>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    ) : (
                        <Card className="p-6 bg-opacity-45 backdrop-blur-md border-1 border-slate-50">
                            <CardHeader className="text-2xl font-bold text-center">
                                Résultats finaux
                            </CardHeader>
                            <CardBody>
                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    <div className="text-center">
                                        <div className="text-red-500 text-2xl font-bold">
                                            {stats.infected}
                                        </div>
                                        <div className="text-sm">Infectés</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-green-500 text-2xl font-bold">
                                            {stats.recovered}
                                        </div>
                                        <div className="text-sm">Guéris</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-black text-2xl font-bold">
                                            {stats.deaths}
                                        </div>
                                        <div className="text-sm">Décès</div>
                                    </div>
                                </div>

                                <>
                                    <ResponsiveContainer
                                        width="100%"
                                        height={300}
                                    >
                                        <LineChart data={graphData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="day" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line
                                                type="monotone"
                                                dataKey="infected"
                                                stroke="#ef4444"
                                                name="Infectés"
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="recovered"
                                                stroke="#22c55e"
                                                name="Guéris"
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="deaths"
                                                stroke="#000"
                                                name="Décès"
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>

                                    <div className="mt-6 flex justify-center">
                                        <Button
                                            onClick={() =>
                                                setShowResults(false)
                                            }
                                            className="px-8 py-3"
                                        >
                                            Nouvelle simulation
                                        </Button>
                                    </div>
                                </>
                            </CardBody>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
