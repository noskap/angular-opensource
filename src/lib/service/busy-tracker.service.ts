import {EventEmitter, Injectable, OnDestroy} from '@angular/core';
import {from, Subscription, timer} from 'rxjs';
import {isPromise} from '../util/isPromise';

export interface TrackerOptions {
    minDuration: number;
    delay: number;
    busyList: Array<Promise<any> | Subscription>;
}

@Injectable({
    providedIn: 'root'
})
export class BusyTrackerService implements OnDestroy {

    private isDelayProcessing = false;
    private isDurationProcessing = false;
    private isBusiesProcessing = false;
    private busyQueue: Array<Subscription> = [];
    private __isActive = false;

    onStartBusy: EventEmitter<any> = new EventEmitter();
    onStopBusy: EventEmitter<any> = new EventEmitter();

    get isActive(): boolean {
        return this.__isActive;
    }

    set isActive(val: boolean) {
        if (this.__isActive === false && val === true && this.onStartBusy) {
            this.onStartBusy.emit();
        }
        if (this.__isActive === true && val === false && this.onStopBusy) {
            this.isBusiesProcessing = false;
            this.onStopBusy.emit();
        }
        this.__isActive = val;
    }

    get busyList() {
        return this.busyQueue;
    }

    constructor() {
    }

    load(options: TrackerOptions) {
        this.loadBusyQueue(options.busyList);
        this.startLoading(options);
    }

    private updateActiveStatus() {
        this.isActive = this.isBusiesProcessing &&
            !this.isDelayProcessing &&
            (this.isDurationProcessing || this.busyQueue.length > 0);
    }

    private startLoading(options: TrackerOptions) {
        if (!this.isBusiesProcessing && this.busyList.length > 0) {
            this.isBusiesProcessing = true;
            this.isDelayProcessing = true;
            this.updateActiveStatus();
            timer(options.delay).subscribe(() => {
                this.isDelayProcessing = false;
                this.isDurationProcessing = true;
                this.updateActiveStatus();
                timer(options.minDuration).subscribe(() => {
                    this.isDurationProcessing = false;
                    this.updateActiveStatus();
                });
            });
        }
    }

    private loadBusyQueue(busies: Array<Promise<any> | Subscription>) {
        busies.filter((busy) => {
            return busy && !busy.hasOwnProperty('__loaded_mark_by_ng_busy');
        }).forEach((busy: Promise<any> | Subscription) => {
            Object.defineProperty(busy, '__loaded_mark_by_ng_busy', {
                value: true, configurable: false, enumerable: false, writable: false
            });
            let cur_busy;
            if (isPromise(busy)) {
                cur_busy = from(busy).subscribe();
            } else {
                cur_busy = busy;
            }
            this.appendToQueue(cur_busy);
        });
    }

    private appendToQueue(busy: Subscription) {
        if (busy) {
            this.busyQueue.push(busy);
            busy.add(() => {
                this.busyQueue = this.busyQueue.filter((cur: Subscription) => !cur.closed);
                this.updateActiveStatus();
            });
        }
    }

    ngOnDestroy(): void {
    }
}
