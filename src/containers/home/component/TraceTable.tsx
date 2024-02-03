import { type Category } from "@prisma/client";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import CategoryBadge from "~/components/custom/CategoryBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { useBoundStore } from "~/store";
import { api } from "~/utils/api";


const TraceTable = () => {
    const { data: userData } = useSession();
    const { data, refetch } = api.trace.getAllTrace.useQuery({
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

    const renderCategory = (category: Category) => {
        return <CategoryBadge category={category} />
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="md:text-center font-bold">Meals</TableHead>
                    <TableHead className="text-center font-bold">Category</TableHead>
                    <TableHead className="md:text-center font-bold">Kcal</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell className="md:text-center">
                            {item.meal}
                        </TableCell>
                        <TableCell className="text-center">
                            {renderCategory(item.category)}
                        </TableCell>
                        <TableCell className="md:text-center font-bold">
                            {item.kcal}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default TraceTable;
