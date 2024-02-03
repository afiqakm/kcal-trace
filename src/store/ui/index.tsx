
import type { BoundStateCreator } from "..";
import { type IUiSlice } from "./types";

export const uiSlice: BoundStateCreator<IUiSlice> = (
    set
) => ({

    isCreateTraceDrawerOpen: false,
    setIsCreateTraceDrawerOpen: (value: boolean) => {
        set({ isCreateTraceDrawerOpen: value });
    },
});
