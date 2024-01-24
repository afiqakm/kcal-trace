import type { StateCreator } from "zustand";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

import { traceSlice } from "./trace";
import { type ITraceSlice } from "./trace/types";

export type BoundState = ITraceSlice;

export type BoundStateCreator<SliceState> = StateCreator<
    BoundState,
    [],
    [],
    SliceState
>;

export const useBoundStore = create<BoundState>()(
    devtools(
        persist(
            (...a) => ({
                ...traceSlice(...a),
            }),
            {
                name: "zustand",
                skipHydration: true,
            }
        )
    )
);

// Rehydration Issues - https://github.com/pmndrs/zustand/issues/938
