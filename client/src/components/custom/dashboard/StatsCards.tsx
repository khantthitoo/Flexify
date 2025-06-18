"use client";
// import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

// import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";

interface StatsType {
    total_income: number;
    active_members: number;
    total_trainers: number;
    growth_rate: number;
}

export function StatsCards() {
    const [stats, setStats] = useState<StatsType | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get('/stats/');
                setStats(response.data);
            } catch (err: any) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, [])

    if (!stats) return <div>Loading...</div>

    return (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total Income</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {stats.total_income} Ks
                    </CardTitle>
                    <CardAction>

                    </CardAction>
                </CardHeader>
            </Card>

            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Active Members</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {stats.active_members}
                    </CardTitle>
                    <CardAction>
                    </CardAction>
                </CardHeader>
            </Card>

            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total Trainers</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {stats.total_trainers}
                    </CardTitle>
                    <CardAction>
                    </CardAction>
                </CardHeader>
            </Card>

            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Growth Rate</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {stats.growth_rate === 0 ? "N/A" : stats.growth_rate + " %"}
                    </CardTitle>
                    <CardAction>
                    </CardAction>
                </CardHeader>
            </Card>
        </div>
    );
}
