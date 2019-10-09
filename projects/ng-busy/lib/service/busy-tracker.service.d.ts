import { EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
export interface TrackerOptions {
    minDuration: number;
    delay: number;
    busyList: Array<Promise<any> | Subscription>;
}
export declare class BusyTrackerService implements OnDestroy {
    private isDelayProcessing;
    private isDurationProcessing;
    private isBusiesProcessing;
    private busyQueue;
    private __isActive;
    onStartBusy: EventEmitter<any>;
    onStopBusy: EventEmitter<any>;
    isActive: boolean;
    readonly busyList: Subscription[];
    constructor();
    load(options: TrackerOptions): void;
    private updateActiveStatus;
    private startLoading;
    private loadBusyQueue;
    private appendToQueue;
    ngOnDestroy(): void;
}
