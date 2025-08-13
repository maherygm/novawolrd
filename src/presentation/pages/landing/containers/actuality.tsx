import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

interface NewsItem {
    id: string;
    title: string;
    description: string;
    source: string;
    publishedAt: string;
    url: string;
    imageUrl?: string;
}

const Actuality: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [epidemicNews, setEpidemicNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef<IntersectionObserver>();
    const loadingRef = useRef<HTMLDivElement>(null);

    const ITEMS_PER_PAGE = 10;

    // Rest of the component logic remains the same until the return statement

    const lastElementRef = useCallback(
        (node: HTMLDivElement) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const [generalResponse, epidemicResponse] = await Promise.all([
                    axios.get("https://newsapi.org/v2/everything", {
                        params: {
                            q: "(environment OR climate OR disaster OR health)",
                            language: "fr",
                            sortBy: "publishedAt",
                            apiKey: "1cd9a9e586de41968b1d9ebe89ef9a17",
                            page: 1,
                            pageSize: 100,
                        },
                    }),
                    axios.get("https://newsapi.org/v2/everything", {
                        params: {
                            q: "pandémie OR épidémie OR éclosion",
                            language: "fr",
                            sortBy: "publishedAt",
                            apiKey: "1cd9a9e586de41968b1d9ebe89ef9a17",
                        },
                    }),
                ]);

                if (
                    generalResponse.data.articles &&
                    epidemicResponse.data.articles
                ) {
                    const formatArticles = (articles: any[]) =>
                        articles
                            .map((article: any, index: number) => ({
                                id: index.toString(),
                                title: article.title,
                                description: article.description,
                                source: article.source.name,
                                publishedAt: article.publishedAt,
                                url: article.url,
                                imageUrl: article.urlToImage,
                            }))
                            .filter(
                                (article: NewsItem) =>
                                    article.description && article.imageUrl
                            );

                    const formattedNews = formatArticles(
                        generalResponse.data.articles
                    );
                    setNews(formattedNews);
                    setHasMore(formattedNews.length > ITEMS_PER_PAGE);
                    setEpidemicNews(
                        formatArticles(epidemicResponse.data.articles)
                    );
                } else {
                    setError("Format de données invalide");
                }
            } catch (err) {
                setError("Échec du chargement des actualités");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    if (loading && page === 1) {
        return (
            <div className="h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen flex items-center justify-center text-red-500">
                <p className="text-lg">{error}</p>
            </div>
        );
    }

    const featuredNews = news.slice(0, 4);
    const displayedNews = news.slice(4, 4 + page * ITEMS_PER_PAGE);

    const cardStyle =
        "bg-white/30 backdrop-blur-2xl  border rounded-2xl text-slate-800 overflow-hidden shadow-2xl hover:transform hover:scale-105 transition-all duration-300";
    const buttonStyle =
        "w-full block text-center bg-gradient-to-r from-purple-500/80 to-blue-500/80 backdrop-blur-lg text-white px-4 py-2 rounded-lg hover:from-purple-600/90 hover:to-blue-600/90 transition-all duration-300 transform hover:-translate-y-1";

    return (
        <div className="bg-backglass3-background">
            <div className="min-h-screen p-[100px] bg-line-background backdrop-blur-lg">
                <div className="mb-12">
                    <div className="flex flex-start gap-4 mb-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-purple-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 2v4M8 2v4M3 10h18"
                            />
                        </svg>
                        <h2 className="text-4xl font-syne font-bold text-slate-900 tracking-wider">
                            Actualités Mondiales
                        </h2>
                    </div>
                    <p className="text-[14px] text-slate-900 max-w-2xl">
                        Restez informé des dernières actualités mondiales
                        concernant l'environnement, le climat, et les enjeux
                        sanitaires majeurs qui façonnent notre monde
                        d'aujourd'hui.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-3/4">
                        <div className="relative rounded-4xl overflow-hidden">
                            {/* Left shadow overlay */}
                            <div className="absolute    left-0 top-0 bottom-0 w-32 z-10  pointer-events-none"></div>

                            <Swiper
                                effect={"coverflow"}
                                grabCursor={true}
                                centeredSlides={true}
                                slidesPerView={"auto"}
                                coverflowEffect={{
                                    rotate: 50,
                                    stretch: 0,
                                    depth: 100,
                                    modifier: 1,
                                    slideShadows: true,
                                }}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }}
                                pagination={true}
                                modules={[
                                    EffectCoverflow,
                                    Pagination,
                                    Autoplay,
                                ]}
                                className="w-full mb-12"
                            >
                                {featuredNews.map((item) => (
                                    <SwiperSlide
                                        key={item.id}
                                        className="w-[300px] sm:w-[350px] md:w-[400px]"
                                    >
                                        <div
                                            className={`${cardStyle} m-4 backdrop-blur-2xl`}
                                        >
                                            {item.imageUrl && (
                                                <img
                                                    src={item.imageUrl}
                                                    alt={item.title}
                                                    className="w-full h-56 object-cover"
                                                    loading="lazy"
                                                />
                                            )}
                                            <div className="p-6">
                                                <h3 className="text-xl font-semibold mb-3 text-slate-800 line-clamp-2">
                                                    {item.title}
                                                </h3>
                                                <p className="text-slate-600 text-[12px] mb-4 line-clamp-3">
                                                    {item.description}
                                                </p>
                                                <div className="flex justify-between items-center text-sm text-slate-600 mb-4">
                                                    <span className="font-medium">
                                                        {item.source}
                                                    </span>
                                                    <span>
                                                        {new Date(
                                                            item.publishedAt
                                                        ).toLocaleDateString(
                                                            "fr-FR"
                                                        )}
                                                    </span>
                                                </div>
                                                <a
                                                    href={item.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={buttonStyle}
                                                >
                                                    Lire Plus
                                                </a>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            {/* Right shadow overlay */}
                            <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-white/50 to-transparent pointer-events-none"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {displayedNews.map((item, index) => (
                                <div
                                    key={item.id}
                                    ref={
                                        index === displayedNews.length - 1
                                            ? lastElementRef
                                            : null
                                    }
                                    className={cardStyle}
                                >
                                    {item.imageUrl && (
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-full h-48 object-cover"
                                            loading="lazy"
                                        />
                                    )}
                                    <div className="p-4">
                                        <h3 className="text-lg font-semibold mb-2 text-slate-800 line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-600 mb-3 text-sm line-clamp-2">
                                            {item.description}
                                        </p>
                                        <div className="flex justify-between items-center text-xs text-slate-600 mb-3">
                                            <span className="font-medium">
                                                {item.source}
                                            </span>
                                            <span>
                                                {new Date(
                                                    item.publishedAt
                                                ).toLocaleDateString("fr-FR")}
                                            </span>
                                        </div>
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={buttonStyle}
                                        >
                                            Lire Plus
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {loading && page > 1 && (
                            <div
                                ref={loadingRef}
                                className="flex justify-center my-4"
                            >
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
                            </div>
                        )}
                    </div>

                    <div className="lg:w-1/4">
                        <h3 className="text-2xl font-bold mb-6 text-slate-800">
                            Actualités Épidémiques
                        </h3>
                        <div className="space-y-4">
                            {epidemicNews.slice(0, 5).map((item) => (
                                <div key={item.id} className={cardStyle}>
                                    {item.imageUrl && (
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-full h-40 object-cover"
                                            loading="lazy"
                                        />
                                    )}
                                    <div className="p-4">
                                        <h4 className="text-md font-semibold mb-2 text-slate-800 line-clamp-2">
                                            {item.title}
                                        </h4>
                                        <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                                            {item.description}
                                        </p>
                                        <div className="flex justify-between items-center text-xs text-slate-400 mb-3">
                                            <span className="font-medium">
                                                {item.source}
                                            </span>
                                            <span>
                                                {new Date(
                                                    item.publishedAt
                                                ).toLocaleDateString("fr-FR")}
                                            </span>
                                        </div>
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={buttonStyle}
                                        >
                                            Lire Plus
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Actuality;
