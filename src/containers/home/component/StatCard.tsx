import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
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

    return (
        <Card>
            <CardHeader>
                <CardTitle>Calories</CardTitle>
                <CardDescription>Today&#39;s calories intake</CardDescription>
            </CardHeader>
            <CardContent>
                <div>
                    <p className="text-4xl font-bold">
                        {kcal}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default StatCard;
