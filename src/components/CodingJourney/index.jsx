import React, { useState, useEffect } from 'react';
import SectionWrapper from '../SectionWrapper';
import { codingJourney } from '../../portfolio';

import StatsCard from './StatsCard';
import Heatmap from './Heatmap';
import DonutChart from './Charts/DonutChart';
import LineChart from './Charts/LineChart';

import { Trophy, CheckCircle, Crosshair, TrendingUp, ExternalLink, RefreshCw, AlertTriangle, CalendarDays } from 'lucide-react';

const CodingJourneyController = () => {
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    // We get username from portfolio setting
    const username = codingJourney.username;
    const apiUrl = `https://leetcode-stats-api.herokuapp.com/${username}`;

    const fetchStats = async () => {
        setIsLoading(true);
        setIsError(false);
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error("Failed to fetch");
            const data = await response.json();

            if (data.status === "error") {
                throw new Error(data.message || "User not found or API error");
            }

            let contestHistory = [];
            let currentRating = "N/A";

            try {
                // Secondary GraphQL fetch for real contest rating points
                const graphQlUrl = 'https://leetcode.com/graphql';
                const proxyUrl = 'https://corsproxy.io/?' + encodeURIComponent(graphQlUrl);

                const query = `
                    query userContestRankingHistory($username: String!) {
                        userContestRankingHistory(username: $username) {
                            attended
                            rating
                            contest {
                                title
                                startTime
                            }
                        }
                    }
                `;

                const graphqlRes = await fetch(proxyUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query, variables: { username } })
                });

                if (graphqlRes.ok) {
                    const gqlData = await graphqlRes.json();
                    const history = gqlData?.data?.userContestRankingHistory;

                    if (history && history.length > 0) {
                        // Filter attended contests
                        const attended = history.filter(c => c.attended);
                        contestHistory = attended.map(c => ({
                            title: c.contest.title,
                            date: new Date(c.contest.startTime * 1000).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
                            rating: Math.round(c.rating),
                            timestamp: c.contest.startTime
                        })).sort((a, b) => a.timestamp - b.timestamp); // Sort by time ascending

                        if (attended.length > 0) {
                            currentRating = Math.round(attended[attended.length - 1].rating);
                        }
                    }
                }
            } catch (graphqlErr) {
                console.warn("Unable to fetch contest history via GraphQL proxy", graphqlErr);
            }

            setStats({ ...data, contestHistory, currentRating });
        } catch (error) {
            console.error("Error fetching LeetCode stats:", error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    // SKELETON LOADER
    if (isLoading) {
        return (
            <SectionWrapper id="coding-journey">
                <div className="container animate-pulse">
                    <div className="mb-12">
                        <div className="h-8 bg-zinc-800 rounded w-48 mb-4"></div>
                        <div className="h-4 bg-zinc-800/50 rounded w-64"></div>
                    </div>
                    {/* Stats Skeletons */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                        {[1, 2, 3, 4].map(idx => (
                            <div key={idx} className="h-28 bg-white/5 rounded-2xl border border-white/5"></div>
                        ))}
                    </div>
                    {/* Heatmap Skeleton */}
                    <div className="h-48 bg-white/5 rounded-2xl mb-8 border border-white/5"></div>
                    {/* Charts Skeletons */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="h-72 bg-white/5 rounded-2xl border border-white/5"></div>
                        <div className="h-72 bg-white/5 rounded-2xl border border-white/5"></div>
                    </div>
                </div>
            </SectionWrapper>
        );
    }

    // ERROR STATE
    if (isError || !stats) {
        return (
            <SectionWrapper id="coding-journey">
                <div className="container">
                    <div className="glass-panel p-10 text-center flex flex-col items-center justify-center gap-4">
                        <AlertTriangle className="w-12 h-12 text-rose-500 mb-2" />
                        <h3 className="text-xl font-bold text-white">Dashboard Integration Offline</h3>
                        <p className="text-zinc-400">We couldn't reach the LeetCode API to fetch {username}'s live statistics.</p>
                        <button
                            onClick={fetchStats}
                            className="mt-4 btn btn-outline flex items-center gap-2 px-6"
                        >
                            <RefreshCw className="w-4 h-4" /> Try Again
                        </button>
                    </div>
                </div>
            </SectionWrapper>
        );
    }

    const activeDays = Object.keys(stats?.submissionCalendar || {}).length;

    // SUCCESS RENDER
    return (
        <SectionWrapper id="coding-journey">
            <div className="container">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <h2 className="headline-2 text-white mb-2 pb-2">Coding Journey</h2>
                        <a
                            href={`https://leetcode.com/u/${username}/`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 group hover:text-sky-400 transition-colors"
                        >
                            <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                                LeetCode
                            </span>
                            <span className="text-zinc-300 font-medium tracking-wider uppercase flex items-center gap-2">
                                {username}
                                <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                            </span>
                        </a>
                        <p className="text-zinc-400 mt-2 text-sm flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            Live data synchronized just now.
                        </p>
                    </div>
                </div>

                {/* Dynamic Stats Row */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
                    <StatsCard
                        label="Total Solved"
                        value={stats.totalSolved}
                        icon={<Trophy className="w-6 h-6 text-amber-400" />}
                        colorClass="text-amber-400"
                    />
                    <StatsCard
                        label="Active Days"
                        value={activeDays}
                        icon={<CalendarDays className="w-6 h-6 text-emerald-400" />}
                        colorClass="text-white"
                    />
                    <StatsCard
                        label="Global Rank"
                        value={`~${(stats.ranking / 1000).toFixed(1)}k`}
                        icon={<TrendingUp className="w-6 h-6 text-sky-400" />}
                        colorClass="text-white"
                    />
                    <StatsCard
                        label="Contest Rating"
                        value={stats.currentRating}
                        icon={<Crosshair className={`w-6 h-6 ${stats.currentRating !== "N/A" ? "text-amber-400" : "text-zinc-600"}`} />}
                        colorClass={stats.currentRating !== "N/A" ? "text-white" : "text-zinc-500"}
                    />
                </div>

                {/* Heatmap Layout */}
                <Heatmap submissionCalendar={stats.submissionCalendar} />

                {/* Dynamic Recharts Visualizations */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <DonutChart
                        easy={stats.easySolved}
                        medium={stats.mediumSolved}
                        hard={stats.hardSolved}
                    />
                    <LineChart contestHistory={stats.contestHistory} />
                </div>

            </div>
        </SectionWrapper>
    );
};

export default CodingJourneyController;
