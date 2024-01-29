import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
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

    return (
        <Table>
            <TableHeader>
                <TableRow className="text-center">
                    <TableHead>Meals</TableHead>
                    <TableHead className="text-center">Kcal</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>
                            {item.meal}
                        </TableCell>
                        <TableCell className="text-center font-bold">
                            {item.kcal}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default TraceTable;
