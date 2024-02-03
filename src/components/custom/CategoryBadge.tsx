import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { Badge } from "../ui/badge";
import { Category } from "@prisma/client";

type Props = {
    category: Category;
};
const CategoryBadge = (props: Props) => {
    const { category } = props;

    const badgeColor = (category: Category) => {
        switch (category) {
            case Category.Breakfast:
                return "bg-amber-700";
            case Category.Lunch:
                return "bg-lime-700";
            case Category.Dinner:
                return "bg-sky-700";
            case Category.Snack:
                return "bg-rose-700";
            case Category.Meal:
                return "bg-fuchsia-700";
            case Category.Drink:
                return "bg-violet-700";
            case Category.Other:
                return "bg-slate-700";
            default:
                return "bg-slate-700";
        }
    }

    return (
        <Badge className={badgeColor(category)}>
            {category}
        </Badge>
    );
};

export default CategoryBadge;
