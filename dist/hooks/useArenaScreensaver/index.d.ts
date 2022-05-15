import { IIdleTimer } from "react-idle-timer";
export declare const useArenaScreensaver: ({ arenaSlug, timeout, timeBetween, backgroundOpacity, }: {
    arenaSlug: string;
    timeout?: number | undefined;
    timeBetween?: number | undefined;
    backgroundOpacity?: number | undefined;
}) => IIdleTimer;
