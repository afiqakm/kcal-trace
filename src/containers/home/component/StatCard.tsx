import { EditIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { Button } from "~/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "~/components/ui/card";
import { useBoundStore } from "~/store";
import { api } from "~/utils/api";

const StatCard = () => {
    const { data: userData } = useSession();
    const { data: user } = api.user.getUserData.useQuery({
        userId: userData?.user.id ?? "",
    })
    const { data, refetch } = api.trace.getTodayTrace.useQuery({
        userId: userData?.user.id ?? "",
    });
    const {
        action,
        error,
    } = useBoundStore();

    useEffect(() => {
        if (!action.createTrace) {
            void refetch();
        }
    }, [action.createTrace])

    const kcal = data?.reduce((acc, item) => acc + Number(item.kcal), 0)

    const renderKcal = (kcal: number) => {
        if (user) {
            const warningLimit = user.kcalLimit - 500;
            if (kcal > 0) {
                return (
                    <p className="text-4xl font-bold text-green-500">
                        {kcal}
                    </p>
                )
            }
            if (kcal < warningLimit && kcal > 0) {
                return (
                    <p className="text-4xl font-bold text-yellow-500">
                        {kcal}
                    </p>
                )
            }
            if (kcal > user.kcalLimit) {
                return (
                    <p className="text-4xl font-bold text-red-500">
                        {kcal}
                    </p>
                )
            }
            return (
                <p className="text-4xl font-bold">
                    {kcal}
                </p>
            )
        }
        return null
    }
    return (
        <Card>
            <CardHeader className="relative">
                <CardTitle>Calories</CardTitle>
                <CardDescription>Today&#39;s calories intake</CardDescription>
                <Button variant="ghost" size='icon' className="absolute right-4 top-2">
                    <EditIcon size={20} />
                </Button>
            </CardHeader>
            <CardContent>
                <div className="flex gap-3 items-center justify-center">
                    <p className="text-4xl font-bold">
                        {renderKcal(kcal ?? 0)}
                    </p>
                    <p className="text-4xl text-slate-400">
                        /
                    </p>
                    <p className="text-4xl text-slate-400 font-bold">
                        {user ? user.kcalLimit : 0}
                    </p>

                </div>
            </CardContent>
        </Card>
    );
};

export default StatCard;
