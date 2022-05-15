import { IIdleTimer } from "react-idle-timer";
export declare const useArenaScreensaver: ({ arenaSlug, timeout, timeBetween, }: {
    arenaSlug: string;
    timeout?: number | undefined;
    timeBetween?: number | undefined;
}) => IIdleTimer;
